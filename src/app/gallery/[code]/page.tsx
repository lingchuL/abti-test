import { OUTCOMES, byCode } from '@/data/outcomes';
import { notFound } from 'next/navigation';
import { GalleryCodeContent } from '@/components/gallery/GalleryCodeContent';

export function generateStaticParams() {
  return OUTCOMES.map(o => ({ code: o.code }));
}

export default async function GalleryCodePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!byCode[code]) notFound();

  return <GalleryCodeContent code={code} />;
}
