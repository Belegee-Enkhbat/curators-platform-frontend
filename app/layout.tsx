// app/layout.tsx
import Header from '@/components/custom/header';
import './globals.css';
import RootLayoutClient from './layout.client';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
