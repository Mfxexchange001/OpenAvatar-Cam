/**
 * Face Detection Service
 * Uses MediaPipe Face Mesh for real-time face tracking
 */

import {
  FaceDetector,
  FilesetResolver,
} from '@mediapipe/tasks-vision';
import { FaceDetectionResult } from '@types/index';

export class FaceDetectionService {
  private faceDetector: FaceDetector | null = null;
  private initialized = false;

  /**
   * Initialize face detection model
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm'
      );

      this.faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/image_classifier/efficientnet_lite0/float32/1/efficientnet_lite0.tflite',
        },
        runningMode: 'VIDEO',
      });

      this.initialized = true;
    } catch (error) {
      console.error('Error initializing face detection:', error);
      throw error;
    }
  }

  /**
   * Detect faces in video frame
   */
  async detectFaces(
    videoElement: HTMLVideoElement
  ): Promise<FaceDetectionResult[]> {
    if (!this.faceDetector) {
      throw new Error('Face detector not initialized');
    }

    try {
      const detectionResult = this.faceDetector.detectForVideo(
        videoElement,
        performance.now()
      );

      return detectionResult.detections.map((detection: any) => ({
        landmarks: detection.landmarks.map((lm: any) => ({
          x: lm.x,
          y: lm.y,
          z: lm.z,
          visibility: lm.visibility,
        })),
        boundingBox: detection.boundingBox
          ? {
              x: detection.boundingBox.originX,
              y: detection.boundingBox.originY,
              width: detection.boundingBox.width,
              height: detection.boundingBox.height,
            }
          : undefined,
        confidence: detection.categories[0]?.score || 0,
      }));
    } catch (error) {
      console.error('Error detecting faces:', error);
      return [];
    }
  }

  /**
   * Get service status
   */
  isInitialized(): boolean {
    return this.initialized && this.faceDetector !== null;
  }
}

// Export singleton instance
export const faceDetectionService = new FaceDetectionService();
