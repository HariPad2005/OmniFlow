'use client';

import { useEffect, useState } from 'react';
import { deinit, isInitialized } from '../lib/nexus';

export default function DeinitButton({
  className,
  onDone,
}: { className?: string; onDone?: () => void }) {
  // initialize state based on current value
  const [initialized, setInitialized] = useState(() => isInitialized());

  useEffect(() => {
    const interval = setInterval(() => {
      setInitialized(isInitialized());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const onClick = async () => {
    if (!initialized) return alert('Not initialized');
    await deinit();
    onDone?.();
    alert('Nexus de-initialized');
  };

  return (
    <button className={className} onClick={onClick} disabled={!initialized}>
      De-initialize
    </button>
  );
}
