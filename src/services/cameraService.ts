/**
 * Camera Service
 * Handles webcam access and video stream management
 */

import { CameraSettings, CameraDevice } from '@types/index';

export class CameraService {
  private stream: MediaStream | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private settings: CameraSettings = {
    width: 1920,
    height: 1080,
    frameRate: 30,
  };

  /**
   * Initialize camera service
   */
  async initialize(settings?: CameraSettings): Promise<void> {
    if (settings) {
      this.settings = { ...this.settings, ...settings };
    }

    // Create video element
    this.videoElement = document.createElement('video');
    this.videoElement.setAttribute('playsinline', '');
    this.videoElement.autoplay = true;
    this.videoElement.muted = true;
  }

  /**
   * Start camera stream
   */
  async startStream(
    deviceId?: string
  ): Promise<HTMLVideoElement> {
    try {
      if (!this.videoElement) {
        throw new Error('Camera service not initialized');
      }

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: this.settings.width },
          height: { ideal: this.settings.height },
          frameRate: { ideal: this.settings.frameRate },
          deviceId: deviceId ? { exact: deviceId } : undefined,
        },
        audio: false,
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;

      // Wait for video to load
      await new Promise((resolve) => {
        if (this.videoElement) {
          this.videoElement.onloadedmetadata = resolve;
        }
      });

      return this.videoElement;
    } catch (error) {
      console.error('Error starting camera stream:', error);
      throw error;
    }
  }

  /**
   * Stop camera stream
   */
  stopStream(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }

  /**
   * Get available cameras
   */
  async getAvailableCameras(): Promise<CameraDevice[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices
        .filter((device) => device.kind === 'videoinput')
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `Camera ${device.deviceId.substring(0, 5)}`,
        }));
    } catch (error) {
      console.error('Error getting available cameras:', error);
      return [];
    }
  }

  /**
   * Get current frame as canvas
   */
  captureFrame(): HTMLCanvasElement | null {
    if (!this.videoElement || !this.videoElement.srcObject) {
      return null;
    }

    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.settings.width;
      this.canvas.height = this.settings.height;
    }

    if (!this.context) {
      this.context = this.canvas.getContext('2d');
    }

    if (this.context) {
      this.context.drawImage(
        this.videoElement,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    return this.canvas;
  }

  /**
   * Update camera settings
   */
  updateSettings(settings: Partial<CameraSettings>): void {
    this.settings = { ...this.settings, ...settings };
  }

  /**
   * Get current settings
   */
  getSettings(): CameraSettings {
    return { ...this.settings };
  }

  /**
   * Get video element
   */
  getVideoElement(): HTMLVideoElement | null {
    return this.videoElement;
  }
}

// Export singleton instance
export const cameraService = new CameraService();
