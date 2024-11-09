'use client'
import { useEffect, useState } from 'react';

export default function TileLoader() {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumber((prev) => (prev === 9 ? 0 : prev + 1));
    }, 100); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="">
        {number}
      </div>
    </div>
  );
}