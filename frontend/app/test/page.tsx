'use client';

import { useEffect, useState } from 'react';
import { endpoints } from '@/lib/api';

export default function TestPage() {
  const [health, setHealth] = useState<string>('Checking...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:5001/health');
        const data = await response.json();
        setHealth(data.status);
        setError(null);
      } catch (err) {
        setHealth('Failed');
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <div className="mb-4">
        <strong>Backend Health:</strong>{' '}
        <span className={health === 'healthy' ? 'text-green-500' : 'text-red-500'}>
          {health}
        </span>
      </div>
      {error && (
        <div className="text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
