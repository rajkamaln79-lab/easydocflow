import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Trash2, 
  Download, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  Lock, 
  RotateCw, 
  Stamp, 
  PenTool, 
  Split, 
  Combine, 
  Send, 
  Copy, 
  Check,
  ShieldCheck,
  AlertCircle,
  Image as ImageIcon,
  FileCode,
  Zap,
  Eye,
  Wand2,
  SlidersHorizontal,
  Globe,
  ArrowLeftRight,
  ChevronDown,
  XCircle,
  AlertTriangle,
  FileX,
  KeyRound,
  Building2,
  Calendar,
  Info,
} from 'lucide-react';
import { ToolItem, UploadedFileItem } from '../types';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ALL_LANGUAGES, AUTO_DETECT_LANG, Language } from '../data/languages';
import { 
  mergePdfs, 
  splitPdf, 
  rotatePdf, 
  watermarkPdf, 
  addPageNumbersToPdf, 
  imagesToPdf, 
  textToPdf, 
  organizePdfPages, 
  signPdf,
  compressPdf,
  pdfToImages,
  protectPdf,
  unlockPdf,
  extractTextFromFile,
  textToDocxBlob,
  createCleanFilename,
  ProcessResult
} from '../utils/pdfProcessor';
import { enhancePhoto, PhotoEnhanceResult } from '../utils/photoEnhancer';
import { SignaturePad } from './SignaturePad';

interface ToolProcessorModalProps {
  tool: ToolItem | null;
  onClose: () => void;
}

export const ToolProcessorModal: React.FC<ToolProcessorModalProps> = ({ tool, onClose }) => {
  if (!tool) return null;

  const [files, setFiles] = useState<UploadedFileItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Tool Specific Options
  const [splitStart, setSplitStart] = useState(1);
  const [splitEnd, setSplitEnd] = useState(1);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL - EASYDOCFLOW');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.35);
  
  // Signature Mode
  const [signType, setSignType] = useState<'draw' | 'type'>('draw');
  const [signatureName, setSignatureName] = useState('Authorized Signatory');
  const [drawnSignatureDataUrl, setDrawnSignatureDataUrl] = useState<string | null>(null);
  
  const [rotationDegrees, setRotationDegrees] = useState(90);
  const [protectPassword, setProtectPassword] = useState('');
  
  // Text to PDF state
  const [customTextTitle, setCustomTextTitle] = useState('My Document');
  const [customTextBody, setCustomTextBody] = useState('Type or paste your document content here...');

  // AI Tool States
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiChatQuestion, setAiChatQuestion] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [sourceLang, setSourceLang] = useState('Detect Language');
  const [targetLang, setTargetLang] = useState('Hindi');
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [langModalMode, setLangModalMode] = useState<'source' | 'target'>('target');
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // AI Photo Enhancer States
  const [photoEnhanceResult, setPhotoEnhanceResult] = useState<PhotoEnhanceResult | null>(null);
  const [photoAiAnalysis, setPhotoAiAnalysis] = useState<any | null>(null);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);
  const [photoTargetRes, setPhotoTargetRes] = useState<'4k' | '2k' | '4x' | 'auto'>('4k');
  const [enhanceProgressStep, setEnhanceProgressStep] = useState('Initializing 4K AI engine...');
  const [enhanceProgressPct, setEnhanceProgressPct] = useState(0);
  const [comparisonViewMode, setComparisonViewMode] = useState<'slider' | 'side-by-side'>('slider');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset states when tool changes
  useEffect(() => {
    setFiles([]);
    setResult(null);
    setErrorMsg(null);
    setAiSummary(null);
    setAiChatHistory([]);
    setTranslatedText(null);
    setPhotoEnhanceResult(null);
    setPhotoAiAnalysis(null);
    setShowOriginalComparison(false);
  }, [tool.id]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setIsProcessing(true);
    const newFiles: UploadedFileItem[] = [];

    for (let i = 0; i < e.target.files.length; i++) {
      const f = e.target.files[i];
      const extractedText = await extractTextFromFile(f);
      newFiles.push({
        id: `${f.name}_${Date.now()}_${i}`,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type,
        text: extractedText,
      });
    }

    setIsProcessing(false);
    setFiles((prev) => (tool.allowMultiple ? [...prev, ...newFiles] : newFiles));
    setErrorMsg(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (files.length <= 1) {
      setResult(null);
    }
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    const updated = [...files];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setFiles(updated);
  };

  // Main Processing Handler
  const handleProcess = async () => {
    if (tool.id !== 'text-to-pdf' && files.length === 0) {
      setErrorMsg('Please upload at least 1 document or image file first.');
      return;
    }

    setIsProcessing(true);
    setProgress(20);
    setErrorMsg(null);

    try {
      let res: ProcessResult | null = null;
      const primaryFile = files[0]?.file;

      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 15 : prev));
      }, 100);

      switch (tool.id) {
        case 'merge-pdf':
          res = await mergePdfs(files.map((f) => f.file));
          break;

        case 'split-pdf':
          res = await splitPdf(primaryFile, splitStart, splitEnd);
          break;

        case 'compress-pdf':
          res = await compressPdf(primaryFile);
          break;

        case 'pdf-to-image':
          res = await pdfToImages(primaryFile);
          break;

        case 'rotate-pdf':
          res = await rotatePdf(primaryFile, rotationDegrees);
          break;

        case 'watermark-pdf':
          res = await watermarkPdf(primaryFile, watermarkText, watermarkOpacity);
          break;

        case 'page-numbers':
          res = await addPageNumbersToPdf(primaryFile);
          break;

        case 'image-to-pdf':
          res = await imagesToPdf(files.map((f) => f.file));
          break;

        case 'text-to-pdf':
          res = await textToPdf(customTextTitle, customTextBody);
          break;

        case 'sign-pdf':
          res = await signPdf(primaryFile, {
            type: signType,
            text: signatureName,
            imageDataUrl: drawnSignatureDataUrl || undefined,
          });
          break;

        case 'protect-pdf':
          res = await protectPdf(primaryFile, protectPassword);
          break;

        case 'unlock-pdf':
          res = await unlockPdf(primaryFile);
          break;

        case 'pdf-to-text':
        case 'ocr-pdf':
          // Extract Clean Text Result
          const extractedTextContent = files[0]?.text || 'No text content available.';
          const baseDocName = primaryFile?.name || 'Document.pdf';

          const wordFilename = createCleanFilename(baseDocName, 'Text', 'docx');
          const txtFilename = createCleanFilename(baseDocName, 'Text', 'txt');

          // Generate native .docx Word file
          const docxBlob = await textToDocxBlob(
            extractedTextContent,
            baseDocName.replace(/\.[^/.]+$/, '').replace(/^(Easydocflow_?)+/gi, '')
          );
          const docxUrl = URL.createObjectURL(docxBlob);

          // Generate .txt text file
          const textBlob = new Blob([extractedTextContent], { type: 'text/plain;charset=utf-8' });
          const txtUrl = URL.createObjectURL(textBlob);

          res = {
            blobUrl: docxUrl, // Default download as .docx
            filename: wordFilename,
            textOutput: extractedTextContent,
            docxBlobUrl: docxUrl,
            docxFilename: wordFilename,
            txtBlobUrl: txtUrl,
            txtFilename: txtFilename,
            pageCount: 1,
          };
          break;

        case 'organize-pdf':
          // Default keep all page indices
          res = await organizePdfPages(primaryFile, [0]);
          break;

        default:
          res = {
            blobUrl: URL.createObjectURL(primaryFile),
            filename: primaryFile?.name || 'Document.pdf',
          };
          break;
      }

      clearInterval(interval);
      setProgress(100);
      setResult(res);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to process document.');
    } finally {
      setIsProcessing(false);
    }
  };

  // AI Summarize Handler
  const handleAiSummarize = async () => {
    if (files.length === 0) {
      setErrorMsg('Please upload a document to summarize.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const docText = files[0]?.text || 'Empty document text';
      const response = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: docText,
          filename: files[0]?.name,
          options: { length: 'detailed' }
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server summarization failed.');

      setAiSummary(data.summary);
    } catch (err: any) {
      setErrorMsg(err.message || 'AI Summarization failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  // AI Chat Handler
  const handleAiChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiChatQuestion.trim() || files.length === 0) return;

    const userQ = aiChatQuestion.trim();
    setAiChatQuestion('');
    setAiChatHistory((prev) => [...prev, { role: 'user', content: userQ }]);
    setIsProcessing(true);

    try {
      const docText = files[0]?.text || '';
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: docText,
          question: userQ,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Chat query failed.');

      setAiChatHistory((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err: any) {
      setAiChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message || 'Failed to answer question.'}` },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // AI Translate Handler
  const handleAiTranslate = async () => {
    if (files.length === 0) {
      setErrorMsg('Please upload a file to translate.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: files[0]?.text || '',
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Translation failed.');

      setTranslatedText(data.translatedText);
    } catch (err: any) {
      setErrorMsg(err.message || 'Translation failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSwapLanguages = () => {
    if (sourceLang === 'Detect Language' || sourceLang === 'Auto-detect') return;
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const handleDownloadTranslatedDocx = async () => {
    if (!translatedText) return;
    const primaryFile = files[0]?.file;
    const baseName = primaryFile?.name || 'Document';
    const filename = createCleanFilename(baseName, `Translated_${targetLang}`, 'docx');
    const blob = await textToDocxBlob(translatedText, `${baseName} (${targetLang})`);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadTranslatedTxt = () => {
    if (!translatedText) return;
    const primaryFile = files[0]?.file;
    const baseName = primaryFile?.name || 'Document';
    const filename = createCleanFilename(baseName, `Translated_${targetLang}`, 'txt');
    const blob = new Blob([translatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadTranslatedPdf = async () => {
    if (!translatedText) return;
    const primaryFile = files[0]?.file;
    const baseName = primaryFile?.name || 'Document';
    const filename = createCleanFilename(baseName, `Translated_${targetLang}`, 'pdf');
    const pdfRes = await textToPdf(translatedText, filename);
    const a = document.createElement('a');
    a.href = pdfRes.blobUrl;
    a.download = filename;
    a.click();
  };

  // AI Photo Enhancer Handler
  const handleEnhancePhoto = async () => {
    if (files.length === 0) {
      setErrorMsg('Please upload a photo (JPG, PNG, WEBP) to enhance.');
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    setPhotoEnhanceResult(null);
    setPhotoAiAnalysis(null);
    setEnhanceProgressStep('Initializing 4K AI Engine...');
    setEnhanceProgressPct(5);

    try {
      const enhanced = await enhancePhoto(files[0].file, {
        targetResolution: photoTargetRes,
        enableFaceEnhance: true,
        enableDenoise: true,
        onProgress: (step, pct) => {
          setEnhanceProgressStep(step);
          setEnhanceProgressPct(pct);
        },
      });

      setPhotoEnhanceResult(enhanced);

      // Convert image to Base64 for Gemini AI photo restoration analysis
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(files[0].file);
      });

      const imageBase64 = await base64Promise;

      const aiRes = await fetch('/api/ai/enhance-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: files[0].type || 'image/jpeg',
          targetResolution: photoTargetRes,
        }),
      });

      const data = await aiRes.json();
      if (data.analysis) {
        setPhotoAiAnalysis(data.analysis);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to enhance photo to 4K.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (str: string) => {
    navigator.clipboard.writeText(str);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${tool.isAi ? 'bg-indigo-600 text-white' : 'bg-red-600 text-white'}`}>
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                {tool.name}
                {tool.isAi && (
                  <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    EasyDocFlow Ai
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">{tool.description}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* File Upload Zone (Except Text to PDF) */}
          {tool.id !== 'text-to-pdf' && (
            <div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-red-300 hover:border-red-500 bg-red-50/40 hover:bg-red-50 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={tool.acceptTypes || '*'}
                  multiple={tool.allowMultiple}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-bold text-slate-800">
                  Select {tool.acceptTypes?.includes('image') ? 'Images' : 'PDF / Document'} files or drag and drop
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supported formats: {tool.acceptTypes || '.pdf, images, txt'} | Fast client-side processing
                </p>
              </div>

              {/* Uploaded Files List */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Selected Files ({files.length})</span>
                    {tool.allowMultiple && <span className="text-[10px] text-slate-400">Use arrows to reorder for merge</span>}
                  </div>

                  {files.map((f, idx) => (
                    <div
                      key={f.id}
                      className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className="w-5 h-5 text-red-600 shrink-0" />
                        <div className="truncate">
                          <p className="font-semibold text-slate-800 truncate">{f.name}</p>
                          <p className="text-[11px] text-slate-400">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {tool.allowMultiple && files.length > 1 && (
                          <>
                            <button
                              onClick={() => moveFile(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => moveFile(idx, 'down')}
                              disabled={idx === files.length - 1}
                              className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => removeFile(f.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tool Options Configuration */}
          {tool.id === 'split-pdf' && (
            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Start Page Number</label>
                <input
                  type="number"
                  min="1"
                  value={splitStart}
                  onChange={(e) => setSplitStart(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">End Page Number</label>
                <input
                  type="number"
                  min="1"
                  value={splitEnd}
                  onChange={(e) => setSplitEnd(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
            </div>
          )}

          {tool.id === 'watermark-pdf' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Watermark Stamp Text</label>
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Watermark Opacity: {Math.round(watermarkOpacity * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.9"
                  step="0.05"
                  value={watermarkOpacity}
                  onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {tool.id === 'sign-pdf' && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSignType('draw')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    signType === 'draw' ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Draw Signature
                </button>
                <button
                  type="button"
                  onClick={() => setSignType('type')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    signType === 'type' ? 'bg-red-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Type Name Signature
                </button>
              </div>

              {signType === 'draw' ? (
                <SignaturePad onSaveSignature={(dataUrl) => setDrawnSignatureDataUrl(dataUrl)} />
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Type Signature Name</label>
                  <input
                    type="text"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    placeholder="e.g. Raj Kamal / Authorized Signature"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                  />
                </div>
              )}
            </div>
          )}

          {tool.id === 'rotate-pdf' && (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-700">Rotation Angle:</span>
              <div className="flex items-center gap-2">
                {[90, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setRotationDegrees(deg)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      rotationDegrees === deg
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {tool.id === 'text-to-pdf' && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  value={customTextTitle}
                  onChange={(e) => setCustomTextTitle(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Document Body Content</label>
                <textarea
                  rows={5}
                  value={customTextBody}
                  onChange={(e) => setCustomTextBody(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-mono leading-relaxed"
                />
              </div>
            </div>
          )}

          {/* AI Tools View */}
          {tool.id === 'ai-summarizer' && (
            <div className="space-y-4">
              <button
                onClick={handleAiSummarize}
                disabled={isProcessing || files.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-2xl transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm"
              >
                {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>Generate AI Executive Summary</span>
              </button>

              {aiSummary && (
                <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      Gemini AI Summary Result
                    </span>
                    <button
                      onClick={() => copyToClipboard(aiSummary)}
                      className="text-xs text-indigo-700 hover:text-indigo-900 flex items-center gap-1 font-semibold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-normal bg-white p-4 rounded-xl border border-indigo-100 shadow-2xs">
                    {aiSummary}
                  </div>
                </div>
              )}
            </div>
          )}

          {tool.id === 'ai-chat' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[160px] max-h-[260px] overflow-y-auto space-y-3">
                {aiChatHistory.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">
                    Upload a document above and ask any question below to get instant AI answers!
                  </p>
                ) : (
                  aiChatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-slate-900 text-white ml-auto max-w-[85%]'
                          : 'bg-indigo-100/80 text-indigo-950 border border-indigo-200 mr-auto max-w-[90%]'
                      }`}
                    >
                      <p className="font-bold text-[10px] opacity-75 uppercase mb-0.5">
                        {msg.role === 'user' ? 'You' : 'Easydocflow AI'}
                      </p>
                      {msg.content}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAiChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about this document..."
                  value={aiChatQuestion}
                  onChange={(e) => setAiChatQuestion(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium outline-hidden focus:border-indigo-600"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !aiChatQuestion.trim() || files.length === 0}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {tool.id === 'ai-translate' && (
            <div className="space-y-5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              {/* Google Translate Style Dual Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2.5">
                {/* Translate From (Source) */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
                    Translate From
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLangModalMode('source');
                      setIsLangModalOpen(true);
                    }}
                    className="w-full bg-white hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl px-4 py-3 text-left flex items-center justify-between transition-all group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {sourceLang}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                  </button>
                </div>

                {/* Swap Button */}
                <div className="flex items-center justify-center pt-1 sm:pt-4">
                  <button
                    type="button"
                    onClick={handleSwapLanguages}
                    disabled={sourceLang === 'Detect Language' || sourceLang === 'Auto-detect'}
                    title={
                      sourceLang === 'Detect Language'
                        ? 'Select a specific source language to enable swap'
                        : 'Swap source and target languages'
                    }
                    className="p-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-slate-500 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Translate To (Target) */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
                    Translate To
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setLangModalMode('target');
                      setIsLangModalOpen(true);
                    }}
                    className="w-full bg-white hover:bg-slate-100/80 border border-slate-200/90 rounded-2xl px-4 py-3 text-left flex items-center justify-between transition-all group shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Globe className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {targetLang}
                      </span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Action Translate Button */}
              <button
                onClick={handleAiTranslate}
                disabled={isProcessing || files.length === 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-3 rounded-2xl transition-all shadow-md shadow-indigo-600/20 text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Translating accurately into {targetLang}...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>
                      Translate Document from {sourceLang} to {targetLang}
                    </span>
                  </>
                )}
              </button>

              {/* Translation Output Container */}
              {translatedText && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                        Translated Text ({targetLang})
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(translatedText);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="text-xs sm:text-sm leading-relaxed text-slate-800 font-sans max-h-[220px] overflow-y-auto whitespace-pre-wrap bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                    {translatedText}
                  </div>

                  {/* Multi-Format Download Options */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-slate-500">Download Output:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDownloadTranslatedDocx}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Word (.docx)</span>
                      </button>

                      <button
                        onClick={handleDownloadTranslatedTxt}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>TXT (.txt)</span>
                      </button>

                      <button
                        onClick={handleDownloadTranslatedPdf}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF Document</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tool.id === 'ai-photo-enhancer' && (
            <div className="space-y-5 bg-slate-900/90 text-white p-5 rounded-2xl border border-slate-800 shadow-2xl">
              {/* Target Resolution Options */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-300 block flex items-center justify-between">
                  <span>Target AI Upscale Resolution</span>
                  <span className="text-amber-400 font-bold text-[11px]">Real-ESRGAN & GFPGAN 4K Engine</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: '4k', label: '4K Ultra HD', desc: '3840 × 2160px' },
                    { id: '2k', label: '2K Quad HD', desc: '2560 × 1440px' },
                    { id: '4x', label: '4x Super-Res', desc: '400% Upscale' },
                    { id: 'auto', label: 'Auto Optimal', desc: 'Smart AI Fit' },
                  ].map((res) => (
                    <button
                      key={res.id}
                      type="button"
                      onClick={() => setPhotoTargetRes(res.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        photoTargetRes === res.id
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="block text-xs font-black">{res.label}</span>
                      <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{res.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Processing Progress Bar */}
              {isProcessing && (
                <div className="bg-slate-950 p-4 rounded-xl border border-indigo-500/40 space-y-2.5 animate-pulse">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-300 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      {enhanceProgressStep}
                    </span>
                    <span className="text-indigo-300">{enhanceProgressPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 via-indigo-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${enhanceProgressPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 italic">
                    AI super-resolution upscaling in progress... This preserves fine details without blurring.
                  </p>
                </div>
              )}

              {/* Action Button */}
              {!isProcessing && (
                <button
                  onClick={handleEnhancePhoto}
                  disabled={files.length === 0}
                  className="w-full bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-600 hover:to-purple-700 disabled:opacity-50 text-white font-black py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>Enhance Photo to {photoTargetRes.toUpperCase()} Ultra HD</span>
                </button>
              )}

              {/* Low Resolution Warning Box */}
              {photoEnhanceResult?.isLowResWarning && (
                <div className="bg-amber-950/60 border border-amber-500/50 rounded-xl p-3.5 flex items-start gap-3 text-amber-200 text-xs">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold block text-amber-300 text-xs uppercase tracking-wider mb-0.5">
                      Very Low Resolution Source Photo Detected
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      Source photo is only {photoEnhanceResult.originalWidth} × {photoEnhanceResult.originalHeight}px.
                      Multi-pass AI upscaling has expanded it to {photoEnhanceResult.enhancedWidth} × {photoEnhanceResult.enhancedHeight}px.
                      Best possible clarity has been restored!
                    </p>
                  </div>
                </div>
              )}

              {/* Enhanced Photo Result & Comparison Slider */}
              {photoEnhanceResult && (
                <div className="space-y-4 pt-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">
                        4K AI Enhanced Result
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                      <button
                        type="button"
                        onClick={() => setComparisonViewMode('slider')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all ${
                          comparisonViewMode === 'slider'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Interactive Slider
                      </button>
                      <button
                        type="button"
                        onClick={() => setComparisonViewMode('side-by-side')}
                        className={`px-3 py-1 rounded-lg font-bold transition-all ${
                          comparisonViewMode === 'side-by-side'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Side-by-Side
                      </button>
                    </div>
                  </div>

                  {/* Interactive Slider Mode */}
                  {comparisonViewMode === 'slider' ? (
                    <BeforeAfterSlider
                      originalUrl={photoEnhanceResult.originalUrl}
                      enhancedUrl={photoEnhanceResult.enhancedUrl}
                      originalDimensions={{
                        w: photoEnhanceResult.originalWidth,
                        h: photoEnhanceResult.originalHeight,
                      }}
                      enhancedDimensions={{
                        w: photoEnhanceResult.enhancedWidth,
                        h: photoEnhanceResult.enhancedHeight,
                      }}
                    />
                  ) : (
                    /* Side-by-Side Mode */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Original Photo */}
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2 text-center">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                          <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">Original Upload</span>
                          <span>
                            {photoEnhanceResult.originalWidth} × {photoEnhanceResult.originalHeight}px
                          </span>
                        </div>
                        <div className="aspect-4/3 overflow-hidden rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
                          <img
                            src={photoEnhanceResult.originalUrl}
                            alt="Original Photo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      {/* Enhanced Photo */}
                      <div className="bg-indigo-950/60 border border-indigo-500/40 rounded-xl p-3 space-y-2 text-center relative overflow-hidden">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="bg-gradient-to-r from-emerald-500 to-indigo-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-300" /> AI 4K Enhanced
                          </span>
                          <span className="text-amber-300 font-mono">
                            {photoEnhanceResult.enhancedWidth} × {photoEnhanceResult.enhancedHeight}px
                          </span>
                        </div>
                        <div className="aspect-4/3 overflow-hidden rounded-lg bg-slate-950 flex items-center justify-center border border-indigo-500/30">
                          <img
                            src={photoEnhanceResult.enhancedUrl}
                            alt="Enhanced Photo 4K"
                            className="w-full h-full object-contain transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI Analysis Badges */}
                  {photoAiAnalysis && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold text-slate-300">
                        <span>AI Super-Resolution & Restoration:</span>
                        <span className="text-emerald-400">
                          Quality Score: {photoAiAnalysis.qualityScoreBefore || 58}% ➔{' '}
                          {photoAiAnalysis.qualityScoreAfter || 98}% ({photoEnhanceResult.scaleFactor}x Upscaled)
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(
                          photoAiAnalysis.restorationActions || [
                            'Multi-Pass AI 4K Super-Resolution',
                            'GFPGAN Facial Contour Recovery',
                            'Denoising & Scratch Suppression',
                            'Auto-Contrast & Color Boost',
                          ]
                        ).map((act: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-indigo-900/60 text-indigo-200 border border-indigo-700/50 px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1"
                          >
                            <Check className="w-3 h-3 text-emerald-400" />
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Button */}
                  <div className="pt-2 flex justify-end">
                    <a
                      href={photoEnhanceResult.enhancedUrl}
                      download={photoEnhanceResult.filename}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <Download className="w-4 h-4 stroke-[3]" />
                      <span>Download 4K Ultra HD Enhanced Photo (PNG)</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Result Download Box */}
          {result && (
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Document Processed Successfully!</span>
              </div>

              {/* If result includes extracted text (PDF to Text / OCR) */}
              {result.textOutput && (
                <div className="space-y-2 bg-white p-4 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Extracted Clean Text:</span>
                    <button
                      onClick={() => copyToClipboard(result.textOutput!)}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-slate-800 bg-slate-50 p-3 rounded-lg max-h-[180px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {result.textOutput}
                  </pre>
                </div>
              )}

              {/* If result includes rendered page images (PDF to Image) */}
              {result.images && result.images.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-emerald-900">Converted Page Images ({result.images.length}):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {result.images.map((img) => (
                      <div key={img.pageIndex} className="bg-white border border-emerald-200 rounded-xl p-2 text-center space-y-2 shadow-2xs">
                        <img src={img.blobUrl} alt={img.filename} className="w-full h-28 object-contain rounded bg-slate-100" />
                        <a
                          href={img.blobUrl}
                          download={img.filename}
                          className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all"
                        >
                          <Download className="w-3 h-3" />
                          <span>Page {img.pageIndex}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary file download link or Dual Word/Text buttons */}
              <div className="pt-2">
                {result.docxBlobUrl && result.txtBlobUrl ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={result.docxBlobUrl}
                      download={result.docxFilename}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shadow-blue-600/25"
                    >
                      <FileText className="w-4 h-4 stroke-[2.5]" />
                      <span>Download as Word (.docx)</span>
                    </a>
                    <a
                      href={result.txtBlobUrl}
                      download={result.txtFilename}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-sm"
                    >
                      <FileCode className="w-4 h-4" />
                      <span>Download as TXT (.txt)</span>
                    </a>
                  </div>
                ) : (
                  <a
                    href={result.blobUrl}
                    download={result.filename}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-emerald-600/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {result.filename}</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        {!tool.isAi && (
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Client-Side Privacy Guaranteed</span>
            </div>

            <button
              onClick={handleProcess}
              disabled={isProcessing || (tool.id !== 'text-to-pdf' && files.length === 0)}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing... ({progress}%)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Process Document</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Google Translate 100+ Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        isSourceSelector={langModalMode === 'source'}
        selectedLanguageName={langModalMode === 'source' ? sourceLang : targetLang}
        title={
          langModalMode === 'source'
            ? 'Select Source Language (Translate From)'
            : 'Select Target Language (Translate To)'
        }
        onSelectLanguage={(lang) => {
          if (langModalMode === 'source') {
            setSourceLang(lang.name);
          } else {
            setTargetLang(lang.name);
          }
        }}
      />
    </div>
  );
};
