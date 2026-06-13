/**
 * Recording Service
 * Handles video recording and export
 */

import { RecordingOptions } from '@types/index';

export class RecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: Blob[] = [];
  private isRecording = false;
  private recordingCanvas: HTMLCanvasElement | null = null;
  private recordingStream: MediaStream | null = null;

  /**
   * Initialize recording with canvas stream
   */
  initializeRecording(canvas: HTMLCanvasElement): MediaStream {
    this.recordingCanvas = canvas;
    // Get stream from canvas
    const stream = (canvas as any).captureStream?.(30);
    if (!stream) {
      throw new Error('Canvas does not support captureStream');
    }
    this.recordingStream = stream;
    return stream;
  }

  /**
   * Start recording
   */
  startRecording(options: RecordingOptions): void {
    try {
      if (!this.recordingStream) {
        throw new Error('Recording stream not initialized');
      }

      this.recordedChunks = [];

      const mimeType = this.getMimeType(options.format);
      this.mediaRecorder = new MediaRecorder(this.recordingStream, {
        mimeType,
      });

      this.mediaRecorder.ondataavailable = (event) => {
        this.recordedChunks.push(event.data);
      };

      this.mediaRecorder.start();
      this.isRecording = true;
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  /**
   * Stop recording and get blob
   */
  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('Recording not started'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, {
          type: this.mediaRecorder!.mimeType,
        });
        this.isRecording = false;
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Get appropriate MIME type for format
   */
  private getMimeType(format: string): string {
    const types: Record<string, string> = {
      mp4: 'video/mp4',
      webm: 'video/webm',
      avi: 'video/x-msvideo',
    };
    return types[format] || 'video/webm';
  }

  /**
   * Check if recording
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Pause recording
   */
  pauseRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
    }
  }

  /**
   * Resume recording
   */
  resumeRecording(): void {
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
    }
  }
}

// Export singleton instance
export const recordingService = new RecordingService();
