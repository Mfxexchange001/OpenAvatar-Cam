/**
 * Application Settings Utility
 * Manages persistent app configuration
 */

import Store from 'electron-store';
import { AppSettings, PerformanceSettings, UISettings, CameraSettings } from '@types/index';

const store = new Store();

const DEFAULT_SETTINGS: AppSettings = {
  camera: {
    width: 1920,
    height: 1080,
    frameRate: 30,
  },
  performance: {
    targetFPS: 60,
    enableGPU: true,
    enableFaceMesh: true,
    maxLandmarks: 468,
    modelQuality: 'high',
  },
  avatars: [],
  backgrounds: [],
  recording: {
    outputPath: '',
    format: 'mp4',
    quality: 'high',
    fps: 30,
    width: 1920,
    height: 1080,
  },
  ui: {
    theme: 'dark',
    layout: 'default',
    showFPS: true,
    showLandmarks: false,
  },
};

/**
 * Initialize app settings
 */
export function initializeAppSettings(): void {
  const existingSettings = store.get('appSettings');
  if (!existingSettings) {
    store.set('appSettings', DEFAULT_SETTINGS);
  }
}

/**
 * Get current app settings
 */
export function getAppSettings(): AppSettings {
  return (store.get('appSettings') as AppSettings) || DEFAULT_SETTINGS;
}

/**
 * Update app settings
 */
export function updateAppSettings(settings: Partial<AppSettings>): void {
  const current = getAppSettings();
  const updated = { ...current, ...settings };
  store.set('appSettings', updated);
}

/**
 * Get camera settings
 */
export function getCameraSettings(): CameraSettings {
  return getAppSettings().camera;
}

/**
 * Update camera settings
 */
export function updateCameraSettings(
  settings: Partial<CameraSettings>
): void {
  const current = getAppSettings();
  current.camera = { ...current.camera, ...settings };
  updateAppSettings(current);
}

/**
 * Get performance settings
 */
export function getPerformanceSettings(): PerformanceSettings {
  return getAppSettings().performance;
}

/**
 * Update performance settings
 */
export function updatePerformanceSettings(
  settings: Partial<PerformanceSettings>
): void {
  const current = getAppSettings();
  current.performance = { ...current.performance, ...settings };
  updateAppSettings(current);
}

/**
 * Get UI settings
 */
export function getUISettings(): UISettings {
  return getAppSettings().ui;
}

/**
 * Update UI settings
 */
export function updateUISettings(settings: Partial<UISettings>): void {
  const current = getAppSettings();
  current.ui = { ...current.ui, ...settings };
  updateAppSettings(current);
}
