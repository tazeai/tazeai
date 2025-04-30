'use client';

import Link from 'next/link';
import { Button } from '@tazeai/ui/components/button';
import { useParams } from 'next/navigation';

export default function HomePage() {
  const { lang } = useParams();
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <span>
        <Button>Click me</Button>
      </span>
    </main>
  );
}
