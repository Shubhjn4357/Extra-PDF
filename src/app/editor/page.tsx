'use client';

import dynamic from 'next/dynamic';

const EditorPage = dynamic(() => import('@/features/editor/EditorPage').then(mod => mod.EditorPage), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-screen">Loading Editor...</div>
});

export default function EditorRoute() {
  return <EditorPage />;
}
