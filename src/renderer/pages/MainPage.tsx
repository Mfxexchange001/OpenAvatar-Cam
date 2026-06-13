/**
 * Main Page Component
 * Primary interface for webcam capture and avatar display
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cameraService } from '@services/cameraService';
import { faceDetectionService } from '@services/faceDetectionService';
import { avatarService } from '@services/avatarService';
import { backgroundService } from '@services/backgroundService';
import { recordingService } from '@services/recordingService';
import CameraControls from '@components/CameraControls';
import AvatarSelector from '@components/AvatarSelector';
import BackgroundSelector from '@components/BackgroundSelector';
import RecordingPanel from '@components/RecordingPanel';
import { FaceDetectionResult, VirtualBackground } from '@types/index';
import './MainPage.css';

const MainPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [fps, setFps] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedBackground, setSelectedBackground] =
    useState<VirtualBackground | null>(null);
  const animationFrameRef = useRef<number>();
  const fpsCounterRef = useRef({ frames: 0, lastTime: Date.now() });

  /**
   * Initialize camera and services
   */
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Initialize camera
        await cameraService.initialize({
          width: 1920,
          height: 1080,
          frameRate: 30,
        });

        // Initialize face detection
        await faceDetectionService.initialize();

        // Initialize background service
        await backgroundService.initialize();

        // Initialize avatar service
        if (canvasRef.current) {
          avatarService.initializeScene(canvasRef.current);
        }
      } catch (error) {
        console.error('Error initializing services:', error);
      }
    };

    initializeServices();
  }, []);

  /**
   * Start camera stream
   */
  const startCamera = useCallback(async () => {
    try {
      const videoElement = await cameraService.startStream();
      videoRef.current = videoElement;
      setIsStreaming(true);
      startProcessingLoop();
    } catch (error) {
      console.error('Error starting camera:', error);
    }
  }, []);

  /**
   * Stop camera stream
   */
  const stopCamera = useCallback(() => {
    cameraService.stopStream();
    setIsStreaming(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  /**
   * Main processing loop
   */
  const startProcessingLoop = useCallback(() => {
    const processFrame = async () => {
      try {
        if (!videoRef.current || !canvasRef.current) {
          animationFrameRef.current = requestAnimationFrame(processFrame);
          return;
        }

        // Capture frame from camera
        const frame = cameraService.captureFrame();
        if (!frame) {
          animationFrameRef.current = requestAnimationFrame(processFrame);
          return;
        }

        // Detect faces
        const faceDetections = await faceDetectionService.detectFaces(
          videoRef.current
        );

        const hasDetection = faceDetections.length > 0;
        setFaceDetected(hasDetection);

        // Update avatar based on face detection
        if (hasDetection && faceDetections[0]) {
          avatarService.updateAvatarAnimation(faceDetections[0]);
        }

        // Apply background if selected
        let processedFrame = frame;
        if (selectedBackground) {
          const processedCanvas = await backgroundService.processFrame(
            {
              canvas: frame,
              timestamp: Date.now(),
              faceDetection: faceDetections[0],
              hasPersonDetected: hasDetection,
            },
            selectedBackground
          );
          processedFrame = processedCanvas;
        }

        // Render avatar
        avatarService.render();

        // Update preview canvas
        if (previewCanvasRef.current) {
          const previewCtx = previewCanvasRef.current.getContext('2d');
          if (previewCtx) {
            previewCtx.drawImage(
              canvasRef.current,
              0,
              0,
              previewCanvasRef.current.width,
              previewCanvasRef.current.height
            );
          }
        }

        // Update FPS counter
        fpsCounterRef.current.frames++;
        const currentTime = Date.now();
        if (currentTime - fpsCounterRef.current.lastTime >= 1000) {
          setFps(fpsCounterRef.current.frames);
          fpsCounterRef.current.frames = 0;
          fpsCounterRef.current.lastTime = currentTime;
        }
      } catch (error) {
        console.error('Error processing frame:', error);
      }

      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [selectedBackground]);

  /**
   * Handle recording start
   */
  const handleRecordingStart = useCallback(async () => {
    try {
      if (!previewCanvasRef.current) throw new Error('Preview canvas not ready');

      const stream = recordingService.initializeRecording(
        previewCanvasRef.current
      );
      recordingService.startRecording({
        outputPath: '',
        format: 'mp4',
        quality: 'high',
        fps: 30,
        width: 1920,
        height: 1080,
      });

      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }, []);

  /**
   * Handle recording stop
   */
  const handleRecordingStop = useCallback(async () => {
    try {
      const blob = await recordingService.stopRecording();
      setIsRecording(false);

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `recording-${Date.now()}.mp4`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }, []);

  /**
   * Handle screenshot
   */
  const handleScreenshot = useCallback(() => {
    if (!previewCanvasRef.current) return;

    const imageData = previewCanvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageData;
    link.download = `screenshot-${Date.now()}.png`;
    link.click();
  }, []);

  return (
    <div className="main-page">
      <div className="main-container">
        {/* Canvas for rendering */}
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="render-canvas"
            width={1920}
            height={1080}
          />
          <canvas
            ref={previewCanvasRef}
            className="preview-canvas"
            width={1920}
            height={1080}
          />
        </div>

        {/* Side panel */}
        <div className="side-panel">
          {/* Camera controls */}
          <CameraControls
            isStreaming={isStreaming}
            onStart={startCamera}
            onStop={stopCamera}
          />

          {/* FPS counter */}
          <div className="fps-counter">
            <span>FPS: {fps}</span>
            <span className={faceDetected ? 'detected' : 'not-detected'}>
              {faceDetected ? '✓ Face Detected' : '✗ No Face'}
            </span>
          </div>

          {/* Avatar selector */}
          <AvatarSelector />

          {/* Background selector */}
          <BackgroundSelector onSelect={setSelectedBackground} />

          {/* Recording panel */}
          <RecordingPanel
            isRecording={isRecording}
            onStart={handleRecordingStart}
            onStop={handleRecordingStop}
            onScreenshot={handleScreenshot}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
