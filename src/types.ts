export type ToolCategory = 
  | 'all' 
  | 'organize' 
  | 'optimize' 
  | 'convert' 
  | 'edit' 
  | 'security' 
  | 'ai';

export interface ToolItem {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  iconName: string;
  badge?: string;
  badgeColor?: string;
  isAi?: boolean;
  acceptTypes?: string; // e.g. '.pdf', 'image/*'
  allowMultiple?: boolean;
}

export interface UploadedFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  pageCount?: number;
  arrayBuffer?: ArrayBuffer;
  text?: string;
}

export interface HostingerStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  details: string[];
  tips?: string[];
  aiPromptExample?: string;
  iconName: string;
}

export interface AiSummaryResult {
  summary: string;
  tokenCountEstimate?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isPremium?: boolean;
  joinedDate?: string;
}
