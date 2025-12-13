import '../utils/polyfill';
import type { Metadata } from 'next';
import './globals.css';
import '../utils/polyfill';

export const metadata: Metadata = {
    title: 'Extra PDF',
    description: 'Advanced PDF Editor',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
