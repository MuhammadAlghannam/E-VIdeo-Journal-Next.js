"use client";
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import type { ReactElement } from 'react';

interface ParserHTMLRendererProps { htmlContent?: string | null; className?: string }

export default function ParserHTMLRenderer({ htmlContent, className }: ParserHTMLRendererProps): ReactElement {
  const sanitizedHTML = DOMPurify.sanitize(htmlContent ?? "");
  return <div className={className}>{parse(sanitizedHTML)}</div>;
}