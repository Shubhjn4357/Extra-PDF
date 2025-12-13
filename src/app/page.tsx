'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LandingPage = dynamic(
  () => import('@/features/home/LandingPage').then((mod) => mod.LandingPage),
  { ssr: false }
);

export default function Home() {
  return <LandingPage />;
}
