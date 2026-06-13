/**
 * Global type definitions for OpenAvatar Cam
 */

export interface CameraDevice {
  deviceId: string;
  label: string;
}

export interface CameraSettings {
  width: number;
  height: number;
  frameRate: number;
  deviceId?: string;
}

export interface FaceLandmark {
  x: number;
  y: number;
  z?: number;
  visibility?: number;
}

export interface FaceDetectionResult {
  landmarks: FaceLandmark[];
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence?: number;
  expressions?: FacialExpressions;
}

export interface FacialExpressions {
  neutral: number;
  happy: number;
  sad: number;
  angry: number;
  surprised: number;
  fearful: number;
  disgusted: number;
}

export interface Avatar {
  id: string;
  name: string;
  type: 'realistic' | 'stylized' | 'cartoon';
  modelPath: string;
  textureUrl?: string;
  presets?: AvatarPreset[];
}

export interface AvatarPreset {
  id: string;
  name: string;
  morphTargets?: Record<string, number>;
  materials?: Record<string, any>;
}

export interface VirtualBackground {
  id: string;
  name: string;
  type: 'blur' | 'image' | 'video' | 'solid';
  data: string | CanvasImageSource;
  intensity?: number;
}

export interface AppearanceTransform {
  id: string;
  name: string;
  clothing?: string;
  hairstyle?: string;
  accessories?: string[];
  filters?: Record<string, number>;
}

export interface RecordingOptions {
  outputPath: string;
  format: 'mp4' | 'avi' | 'mov';
  quality: 'low' | 'medium' | 'high';
  fps: number;
  width: number;
  height: number;
}

export interface AppSettings {
  camera: CameraSettings;
  performance: PerformanceSettings;
  avatars: Avatar[];
  backgrounds: VirtualBackground[];
  recording: RecordingOptions;
  ui: UISettings;
}

export interface PerformanceSettings {
  targetFPS: number;
  enableGPU: boolean;
  enableFaceMesh: boolean;
  maxLandmarks: number;
  modelQuality: 'low' | 'medium' | 'high';
}

export interface UISettings {
  theme: 'light' | 'dark';
  layout: 'default' | 'compact' | 'expanded';
  showFPS: boolean;
  showLandmarks: boolean;
}

export interface ProcessedFrame {
  canvas: HTMLCanvasElement;
  timestamp: number;
  faceDetection?: FaceDetectionResult;
  hasPersonDetected: boolean;
}

export interface VirtualCameraOptions {
  width: number;
  height: number;
  fps: number;
  format?: string;
}
