/**
 * Custom React Hook for Camera
 */

import { useEffect, useRef, useState } from 'react';
import { cameraService } from '@services/cameraService';
import { CameraSettings } from '@types/index';

export function useCamera(settings?: CameraSettings) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        await cameraService.initialize(settings);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    initCamera();
  }, [settings]);

  const startStream = async () => {
    try {
      const video = await cameraService.startStream();
      videoRef.current = video;
      setIsStreaming(true);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setIsStreaming(false);
    }
  };

  const stopStream = () => {
    cameraService.stopStream();
    videoRef.current = null;
    setIsStreaming(false);
  };

  return {
    videoRef,
    isStreaming,
    error,
    startStream,
    stopStream,
  };
}
