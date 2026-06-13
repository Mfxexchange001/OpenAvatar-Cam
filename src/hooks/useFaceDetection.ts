/**
 * Custom React Hook for Face Detection
 */

import { useEffect, useState } from 'react';
import { faceDetectionService } from '@services/faceDetectionService';
import { FaceDetectionResult } from '@types/index';

export function useFaceDetection() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initFaceDetection = async () => {
      try {
        await faceDetectionService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    initFaceDetection();
  }, []);

  const detectFaces = async (
    videoElement: HTMLVideoElement
  ): Promise<FaceDetectionResult[]> => {
    try {
      const results = await faceDetectionService.detectFaces(videoElement);
      return results;
    } catch (err) {
      setError((err as Error).message);
      return [];
    }
  };

  return {
    isInitialized,
    error,
    detectFaces,
  };
}
