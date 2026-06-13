/**
 * Custom React Hook for Performance Monitoring
 */

import { useEffect, useState } from 'react';
import { performanceMonitor, PerformanceMetrics } from '@utils/performance';

export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentMetrics = performanceMonitor.getMetrics();
      setMetrics(currentMetrics);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
