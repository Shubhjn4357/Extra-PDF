'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import EditorPage to avoid SSR issues with Canvas/PDF.js
const EditorPage = dynamic(
  () => import('@/features/editor/EditorPage').then((mod) => mod.EditorPage),
  { 
    ssr: false, 
    loading: () => (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }
);

export default function EditorRoute() {
  return <EditorPage />;
}
