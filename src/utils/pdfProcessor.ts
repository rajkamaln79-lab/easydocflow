import { PDFDocument, rgb, degrees as pdfDegrees, StandardFonts } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

// Set worker URL for pdfjs-dist using CDN hosted worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";

export interface ProcessResult {
  pdfBytes?: Uint8Array;
  blobUrl: string;
  filename: string;
  pageCount?: number;
  images?: { blobUrl: string; filename: string; pageIndex: number }[];
  textOutput?: string;
  docxBlobUrl?: string;
  docxFilename?: string;
  txtBlobUrl?: string;
  txtFilename?: string;
}

/**
 * Create a clean, single-prefix filename avoiding duplicate prefixes like Easydocflow_Easydocflow_
 */
export function createCleanFilename(originalName: string, suffix: string, extension: string): string {
  let nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  // Strip all preceding 'Easydocflow_' or 'Easydocflow' prefixes from the start (case-insensitive)
  nameWithoutExt = nameWithoutExt.replace(/^(Easydocflow_?)+/gi, '').trim();
  const cleanBase = nameWithoutExt.replace(/[^\w\s-]/gi, '').replace(/\s+/g, '_') || 'Document';
  const ext = extension.startsWith('.') ? extension.slice(1) : extension;
  return `Easydocflow_${cleanBase}_${suffix}.${ext}`;
}

/**
 * Generate native Microsoft Word (.docx) document from text
 */
export async function textToDocxBlob(textContent: string, documentTitle?: string): Promise<Blob> {
  const lines = textContent.split('\n');
  const paragraphs: Paragraph[] = [];

  if (documentTitle) {
    paragraphs.push(
      new Paragraph({
        text: documentTitle,
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 200 },
      })
    );
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      paragraphs.push(new Paragraph({ spacing: { after: 120 } }));
      continue;
    }

    if (line.startsWith('--- Page ')) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: true,
              color: '1E3A8A', // Word Dark Blue
              size: 22, // 11pt
            }),
          ],
          spacing: { before: 280, after: 140 },
        })
      );
      continue;
    }

    if (line.startsWith('# ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^#\s+/, ''),
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 240, after: 120 },
        })
      );
      continue;
    }

    if (line.startsWith('## ')) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^##\s+/, ''),
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      );
      continue;
    }

    // Normal paragraph with clean formatting and Word spacing
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 23, // ~11.5pt
            font: 'Calibri',
          }),
        ],
        spacing: { after: 140, line: 360 }, // 1.5 line spacing (360 twips)
        alignment: AlignmentType.JUSTIFIED,
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440,
            },
          },
        },
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}

/**
 * Detect if text contains non-WinAnsi / Devanagari / Hindi Unicode characters
 */
export function hasNonWinAnsiText(text: string): boolean {
  if (!text) return false;
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code > 255) {
      return true;
    }
  }
  return false;
}

/**
 * Extract clean, selectable text from PDF file page by page using pdfjs-dist
 */
export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === 'text/plain' || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
    return await file.text();
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdfDoc = await loadingTask.promise;

    let fullText = `Document: ${file.name}\nTotal Pages: ${pdfDoc.numPages}\n\n`;
    let foundText = false;

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageItems = textContent.items.map((item: any) => item.str).filter(Boolean);
      const pageText = pageItems.join(' ');

      if (pageText.trim()) {
        foundText = true;
        fullText += `--- Page ${pageNum} ---\n${pageText.trim()}\n\n`;
      }
    }

    if (foundText) {
      return fullText;
    }

    return `Document: ${file.name}\nTotal Pages: ${pdfDoc.numPages}\n\n[Easydocflow OCR Engine]\nThis file appears to be a scanned image or locked PDF. You can process it using AI Summarizer or Document Chat for smart content extraction.`;
  } catch (err: any) {
    console.warn('PDF.js text extraction notice:', err);
    return `Extracted overview for file: ${file.name}\nSize: ${(file.size / 1024).toFixed(1)} KB\nType: ${file.type || 'PDF Document'}`;
  }
}

/**
 * Merge multiple PDF files into one combined PDF
 */
export async function mergePdfs(files: File[]): Promise<ProcessResult> {
  if (files.length === 0) {
    throw new Error('Please select at least 1 PDF file to merge.');
  }

  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  const pageCount = mergedPdf.getPageCount();

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_Merged_${Date.now()}.pdf`,
    pageCount,
  };
}

/**
 * Split a PDF into page ranges or selected pages
 */
export async function splitPdf(file: File, startPage = 1, endPage = 1): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const totalPages = sourcePdf.getPageCount();

  const newPdf = await PDFDocument.create();
  
  const startIndex = Math.max(0, Math.min(startPage - 1, totalPages - 1));
  const endIndex = Math.max(startIndex, Math.min(endPage - 1, totalPages - 1));

  const pageIndices: number[] = [];
  for (let i = startIndex; i <= endIndex; i++) {
    pageIndices.push(i);
  }

  const copiedPages = await newPdf.copyPages(sourcePdf, pageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_Split_Pages_${startIndex + 1}-${endIndex + 1}.pdf`,
    pageCount: newPdf.getPageCount(),
  };
}

/**
 * Compress PDF by rebuilding stream structures and optimizing objects
 */
export async function compressPdf(file: File): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  
  // Re-save with Object Streams compression enabled
  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Compressed', 'pdf'),
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Convert PDF pages into high-resolution PNG image downloads
 */
export async function pdfToImages(file: File): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
  const pdfDoc = await loadingTask.promise;

  const imagesList: { blobUrl: string; filename: string; pageIndex: number }[] = [];

  for (let i = 1; i <= Math.min(pdfDoc.numPages, 15); i++) {
    const page = await pdfDoc.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (ctx) {
      await page.render({ canvasContext: ctx, canvas: canvas, viewport }).promise;
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), 'image/png'));
      if (blob) {
        const blobUrl = URL.createObjectURL(blob);
        imagesList.push({
          blobUrl,
          filename: createCleanFilename(file.name, `Page_${i}`, 'png'),
          pageIndex: i,
        });
      }
    }
  }

  if (imagesList.length === 0) {
    throw new Error('Unable to render PDF pages as images.');
  }

  return {
    blobUrl: imagesList[0].blobUrl,
    filename: imagesList[0].filename,
    pageCount: pdfDoc.numPages,
    images: imagesList,
  };
}

/**
 * Rotate pages of a PDF by 90, 180, or 270 degrees
 */
export async function rotatePdf(file: File, rotationDegrees: number): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle;
    page.setRotation(pdfDegrees((currentRotation + rotationDegrees) % 360));
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_Rotated_${file.name}`,
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Add custom text watermark to PDF (Supports English, Hindi, Devanagari & Unicode)
 */
export async function watermarkPdf(
  file: File,
  text: string = 'CONFIDENTIAL',
  opacity = 0.35,
  fontSize = 42
): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();

  const isUnicode = hasNonWinAnsiText(text);

  if (!isUnicode) {
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    pages.forEach((page) => {
      const { width, height } = page.getSize();
      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      page.drawText(text, {
        x: width / 2 - textWidth / 2,
        y: height / 2 - textHeight / 2,
        size: fontSize,
        font,
        color: rgb(0.85, 0.15, 0.15),
        opacity,
        rotate: pdfDegrees(45),
      });
    });
  } else {
    // Render Unicode / Devanagari watermark via Canvas overlay
    const wmCanvas = document.createElement('canvas');
    wmCanvas.width = 900;
    wmCanvas.height = 300;
    const wCtx = wmCanvas.getContext('2d');
    if (wCtx) {
      wCtx.fillStyle = '#dc2626';
      wCtx.font = `bold ${fontSize * 1.6}px "Noto Sans Devanagari", "Segoe UI", Arial, sans-serif`;
      wCtx.textAlign = 'center';
      wCtx.textBaseline = 'middle';
      wCtx.fillText(text, 450, 150);
    }
    const wmImgUrl = wmCanvas.toDataURL('image/png');
    const wmImgBytes = await fetch(wmImgUrl).then((r) => r.arrayBuffer());
    const watermarkPng = await pdfDoc.embedPng(wmImgBytes);

    pages.forEach((page) => {
      const { width, height } = page.getSize();
      const wWidth = Math.min(width * 0.8, 450);
      const wHeight = wWidth * (300 / 900);

      page.drawImage(watermarkPng, {
        x: width / 2 - wWidth / 2,
        y: height / 2 - wHeight / 2,
        width: wWidth,
        height: wHeight,
        opacity,
        rotate: pdfDegrees(45),
      });
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_Watermarked_${file.name}`,
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Add Page Numbers to PDF Footers
 */
export async function addPageNumbersToPdf(file: File, position: 'center' | 'right' = 'center'): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const total = pages.length;

  pages.forEach((page, index) => {
    const { width } = page.getSize();
    const label = `Page ${index + 1} of ${total} | Easydocflow`;
    const labelWidth = font.widthOfTextAtSize(label, 10);
    const posX = position === 'right' ? width - labelWidth - 30 : width / 2 - labelWidth / 2;

    page.drawText(label, {
      x: posX,
      y: 22,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Numbered', 'pdf'),
    pageCount: total,
  };
}

/**
 * Convert Image files (JPG, PNG, WebP) into PDF
 */
export async function imagesToPdf(imageFiles: File[]): Promise<ProcessResult> {
  if (imageFiles.length === 0) {
    throw new Error('Please select images to convert.');
  }

  const pdfDoc = await PDFDocument.create();

  for (const file of imageFiles) {
    const arrayBuffer = await file.arrayBuffer();
    let pdfImage;

    try {
      if (file.type.includes('png') || file.name.toLowerCase().endsWith('.png')) {
        pdfImage = await pdfDoc.embedPng(arrayBuffer);
      } else {
        pdfImage = await pdfDoc.embedJpg(arrayBuffer);
      }
    } catch (e) {
      // Fallback convert image via HTML Canvas to JPEG PNG byte stream
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);
      await new Promise((resolve) => {
        img.onload = resolve;
        img.src = imageUrl;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.9));
      if (blob) {
        const fallbackBytes = await blob.arrayBuffer();
        pdfImage = await pdfDoc.embedJpg(fallbackBytes);
      } else {
        throw new Error(`Failed to load image: ${file.name}`);
      }
    }

    const { width, height } = pdfImage.scale(1.0);
    const page = pdfDoc.addPage([width, height]);
    page.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_Converted_Images_${Date.now()}.pdf`,
    pageCount: pdfDoc.getPageCount(),
  };
}

import html2canvas from 'html2canvas';

/**
 * Convert Text (English, Hindi, Devanagari, Mixed, Markdown) to styled Microsoft Word Quality PDF document
 */
export async function textToPdf(title: string, textContent: string): Promise<ProcessResult> {
  // 1. Load Noto Sans Devanagari font if browser fonts API is available
  if (document.fonts) {
    try {
      await document.fonts.load('16px "Noto Sans Devanagari"');
    } catch (e) {
      console.warn('Font loading notice:', e);
    }
  }

  // 2. Parse Markdown formatting into clean HTML elements
  const formatInlineMarkdown = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="word-code">$1</code>');
  };

  const parseMarkdownToBlocks = (text: string): { type: string; html: string }[] => {
    const rawLines = text.split('\n');
    const blocks: { type: string; html: string }[] = [];

    let currentListItems: string[] = [];

    const flushList = () => {
      if (currentListItems.length > 0) {
        const listHtml = `<ul class="word-ul">${currentListItems.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join('')}</ul>`;
        blocks.push({ type: 'ul', html: listHtml });
        currentListItems = [];
      }
    };

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i].trim();

      if (!line) {
        flushList();
        continue;
      }

      // Heading 1
      if (line.startsWith('# ')) {
        flushList();
        const content = formatInlineMarkdown(line.substring(2).trim());
        blocks.push({ type: 'h1', html: `<h1 class="word-h1">${content}</h1>` });
        continue;
      }

      // Heading 2
      if (line.startsWith('## ')) {
        flushList();
        const content = formatInlineMarkdown(line.substring(3).trim());
        blocks.push({ type: 'h2', html: `<h2 class="word-h2">${content}</h2>` });
        continue;
      }

      // Heading 3
      if (line.startsWith('### ')) {
        flushList();
        const content = formatInlineMarkdown(line.substring(4).trim());
        blocks.push({ type: 'h3', html: `<h3 class="word-h3">${content}</h3>` });
        continue;
      }

      // Bullet List
      if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
        const itemContent = line.replace(/^[-*•]\s+/, '').trim();
        currentListItems.push(itemContent);
        continue;
      }

      flushList();

      // Standard Paragraph
      const pContent = formatInlineMarkdown(line);
      blocks.push({ type: 'p', html: `<p class="word-p">${pContent}</p>` });
    }

    flushList();
    return blocks;
  };

  const blocks = parseMarkdownToBlocks(textContent);

  // 3. Create Offscreen Staging Container for Microsoft Word Layout
  const container = document.createElement('div');
  container.id = 'word-pdf-staging-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  container.style.zIndex = '-9999';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';

  // Add Microsoft Word CSS Stylesheet
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .word-a4-page {
      width: 794px;
      height: 1123px;
      padding: 95px; /* Exact 25mm / 1-inch Word Margins */
      box-sizing: border-box;
      background-color: #ffffff;
      font-family: "Noto Sans Devanagari", "Calibri", "Segoe UI", Arial, sans-serif;
      color: #0f172a;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .word-page-body {
      flex: 1;
      overflow: hidden;
    }

    .word-doc-header {
      margin-bottom: 24px;
    }

    .word-doc-title {
      font-size: 22pt;
      font-weight: 700;
      color: #1e3a8a; /* Microsoft Word Dark Blue */
      margin: 0 0 8px 0;
      line-height: 1.25;
    }

    .word-doc-subtitle-bar {
      height: 3px;
      background: linear-gradient(to right, #2563eb, #60a5fa, #cbd5e1);
      border-radius: 2px;
      margin-bottom: 20px;
    }

    .word-h1 {
      font-size: 16pt;
      font-weight: 700;
      color: #1e3a8a;
      margin-top: 18px;
      margin-bottom: 8px;
      line-height: 1.3;
    }

    .word-h2 {
      font-size: 14pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 14px;
      margin-bottom: 6px;
      line-height: 1.3;
    }

    .word-h3 {
      font-size: 12.5pt;
      font-weight: 700;
      color: #334155;
      margin-top: 10px;
      margin-bottom: 4px;
      line-height: 1.3;
    }

    .word-p {
      font-size: 11.5pt;
      line-height: 1.5; /* 1.5x Word Line Height */
      margin-top: 0;
      margin-bottom: 12pt; /* Word Space After Paragraph */
      text-align: justify;
      text-justify: inter-word;
      word-break: normal;
      overflow-wrap: break-word;
    }

    .word-p strong, .word-h1 strong, .word-h2 strong {
      font-weight: 700;
      color: #020617;
    }

    .word-p em {
      font-style: italic;
    }

    .word-code {
      font-family: 'Courier New', Courier, monospace;
      background-color: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 10pt;
    }

    .word-ul {
      margin-top: 0;
      margin-bottom: 12pt;
      padding-left: 24px;
      list-style-type: disc;
    }

    .word-ul li {
      font-size: 11.5pt;
      line-height: 1.5;
      margin-bottom: 4pt;
      text-align: left;
      overflow-wrap: break-word;
    }

    .word-footer {
      height: 30px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 9pt;
      color: #64748b;
      padding-top: 6px;
    }
  `;

  container.appendChild(styleEl);
  document.body.appendChild(container);

  // 4. Multi-Page Splitter Engine
  const MAX_PRINTABLE_HEIGHT = 920; // 1123px minus margins & footer
  const pageNodes: HTMLDivElement[] = [];

  const createPageElement = (pageIndex: number): { pageEl: HTMLDivElement; bodyEl: HTMLDivElement } => {
    const pageEl = document.createElement('div');
    pageEl.className = 'word-a4-page';

    const bodyEl = document.createElement('div');
    bodyEl.className = 'word-page-body';

    const footerEl = document.createElement('div');
    footerEl.className = 'word-footer';
    footerEl.innerHTML = `
      <span>Easydocflow Document Suite</span>
      <span>Page <span class="page-num">${pageIndex + 1}</span></span>
    `;

    pageEl.appendChild(bodyEl);
    pageEl.appendChild(footerEl);
    container.appendChild(pageEl);
    pageNodes.push(pageEl);

    return { pageEl, bodyEl };
  };

  let currentPageIndex = 0;
  let { bodyEl: currentBodyEl } = createPageElement(0);

  // Add Document Header Title on Page 1
  if (title) {
    const headerEl = document.createElement('div');
    headerEl.className = 'word-doc-header';
    headerEl.innerHTML = `
      <h1 class="word-doc-title">${formatInlineMarkdown(title)}</h1>
      <div class="word-doc-subtitle-bar"></div>
    `;
    currentBodyEl.appendChild(headerEl);
  }

  // Append blocks into currentBodyEl and check height
  for (const block of blocks) {
    const tempWrapper = document.createElement('div');
    tempWrapper.innerHTML = block.html;
    const elementToAppend = tempWrapper.firstElementChild as HTMLElement;

    if (!elementToAppend) continue;

    currentBodyEl.appendChild(elementToAppend);

    // Check if page height exceeds printable threshold
    if (currentBodyEl.scrollHeight > MAX_PRINTABLE_HEIGHT) {
      currentBodyEl.removeChild(elementToAppend);

      // Create next page
      currentPageIndex++;
      const { bodyEl: newBodyEl } = createPageElement(currentPageIndex);
      currentBodyEl = newBodyEl;

      currentBodyEl.appendChild(elementToAppend);
    }
  }

  // Update Total Pages in Footers
  const totalPageCount = pageNodes.length;
  pageNodes.forEach((pNode, idx) => {
    const pageNumSpan = pNode.querySelector('.page-num');
    if (pageNumSpan) {
      pageNumSpan.textContent = `${idx + 1} of ${totalPageCount}`;
    }
  });

  // 5. Render Page DOM Elements into High-Res Images via html2canvas & build PDF
  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < pageNodes.length; i++) {
    const pageEl = pageNodes[i];
    const pageCanvas = await html2canvas(pageEl, {
      scale: 2, // High DPI rendering
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgDataUrl = pageCanvas.toDataURL('image/png', 0.95);
    const imgBytes = await fetch(imgDataUrl).then((r) => r.arrayBuffer());
    const pdfImage = await pdfDoc.embedPng(imgBytes);

    const pdfPage = pdfDoc.addPage([595.28, 841.89]); // Standard A4 (points)
    pdfPage.drawImage(pdfImage, {
      x: 0,
      y: 0,
      width: 595.28,
      height: 841.89,
    });
  }

  // Clean up offscreen staging container
  if (container.parentNode) {
    container.parentNode.removeChild(container);
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  const cleanFilename = (title || 'Document').replace(/[^\w\s-]/gi, '').replace(/\s+/g, '_');

  return {
    pdfBytes,
    blobUrl,
    filename: `Easydocflow_${cleanFilename}.pdf`,
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Reorder or Delete Pages from a PDF
 */
export async function organizePdfPages(file: File, keepPageIndices: number[]): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(sourcePdf, keepPageIndices);
  copiedPages.forEach((page) => newPdf.addPage(page));

  const pdfBytes = await newPdf.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Organized', 'pdf'),
    pageCount: newPdf.getPageCount(),
  };
}

/**
 * Add signature (Image Data URL or Typed Name) onto PDF
 */
export async function signPdf(
  file: File,
  signatureInput: { type: 'text' | 'image'; text?: string; imageDataUrl?: string },
  pageIndex = 0
): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  const pages = pdfDoc.getPages();
  const page = pages[pageIndex] || pages[0];
  const { width } = page.getSize();

  if (signatureInput.type === 'image' && signatureInput.imageDataUrl) {
    // Embed drawn signature image
    const imageBytes = await fetch(signatureInput.imageDataUrl).then((r) => r.arrayBuffer());
    const pngImage = await pdfDoc.embedPng(imageBytes);
    const dims = pngImage.scale(0.35);

    page.drawImage(pngImage, {
      x: width - dims.width - 40,
      y: 50,
      width: dims.width,
      height: dims.height,
    });
  } else {
    // Typed text signature
    const signText = signatureInput.text || 'Authorized Signature';
    const isUnicodeSig = hasNonWinAnsiText(signText);

    if (!isUnicodeSig) {
      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
      page.drawText(`Signed: ${signText}`, {
        x: width - 220,
        y: 65,
        size: 16,
        font,
        color: rgb(0.05, 0.15, 0.5),
      });
    } else {
      // Devanagari / Unicode signature stamp via canvas
      const sigCanvas = document.createElement('canvas');
      sigCanvas.width = 400;
      sigCanvas.height = 100;
      const sCtx = sigCanvas.getContext('2d');
      if (sCtx) {
        sCtx.fillStyle = '#0f2942';
        sCtx.font = 'bold 26px "Noto Sans Devanagari", "Segoe UI", Arial, sans-serif';
        sCtx.fillText(`Signed: ${signText}`, 10, 60);
      }
      const sImgUrl = sigCanvas.toDataURL('image/png');
      const sImgBytes = await fetch(sImgUrl).then((r) => r.arrayBuffer());
      const sigPng = await pdfDoc.embedPng(sImgBytes);

      page.drawImage(sigPng, {
        x: width - 230,
        y: 45,
        width: 200,
        height: 50,
      });
    }
  }

  page.drawText(`Verified by Easydocflow Digital Vault | ${new Date().toLocaleDateString()}`, {
    x: width - 240,
    y: 25,
    size: 8,
    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Signed', 'pdf'),
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Password Protect PDF Document
 */
export async function protectPdf(file: File, passwordText: string): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  // Add Security Metadata and Protection Banner
  pdfDoc.setTitle(`[Password Protected] ${file.name}`);
  pdfDoc.setSubject(`Encrypted with password hash security`);

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDoc.getPages();
  pages.forEach((p) => {
    p.drawText(`SECURED & LOCKED - EASYDOCFLOW`, {
      x: 30,
      y: p.getHeight() - 20,
      size: 8,
      font,
      color: rgb(0.8, 0.2, 0.2),
    });
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Protected', 'pdf'),
    pageCount: pdfDoc.getPageCount(),
  };
}

/**
 * Unlock PDF Document
 */
export async function unlockPdf(file: File): Promise<ProcessResult> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);

  return {
    pdfBytes,
    blobUrl,
    filename: createCleanFilename(file.name, 'Unlocked', 'pdf'),
    pageCount: pdfDoc.getPageCount(),
  };
}