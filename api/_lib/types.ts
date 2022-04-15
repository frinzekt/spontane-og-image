export type FileType = 'png' | 'jpeg';
export type Theme = 'light' | 'dark';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    subtext: string;
    theme: Theme;
    md: boolean;
    fontSize: string;
    fontSizeSub: string;
    images: string[];
    widths: string[];
    heights: string[];
}
