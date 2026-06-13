/**
 * Avatar Service
 * Handles avatar models, animations, and facial expression mapping
 */

import * as THREE from 'three';
import { Avatar, AvatarPreset, FaceDetectionResult } from '@types/index';

export class AvatarService {
  private scene: THREE.Scene | null = null;
  private camera: THREE.Camera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private avatarModel: THREE.Group | null = null;
  private currentAvatar: Avatar | null = null;
  private morphTargets: Map<string, number> = new Map();

  /**
   * Initialize Three.js scene
   */
  initializeScene(canvas: HTMLCanvasElement): void {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  /**
   * Load avatar model
   */
  async loadAvatar(avatar: Avatar): Promise<void> {
    try {
      if (!this.scene) {
        throw new Error('Scene not initialized');
      }

      // Remove previous avatar
      if (this.avatarModel) {
        this.scene.remove(this.avatarModel);
      }

      this.currentAvatar = avatar;

      // Create a simple box as placeholder avatar
      // In production, load from GLTF/FBX models
      const geometry = new THREE.BoxGeometry(1, 1.5, 0.5);
      const material = new THREE.MeshPhongMaterial({ color: 0xffcc99 });
      this.avatarModel = new THREE.Mesh(geometry, material);

      this.scene.add(this.avatarModel);
    } catch (error) {
      console.error('Error loading avatar:', error);
      throw error;
    }
  }

  /**
   * Update avatar animation based on face detection
   */
  updateAvatarAnimation(faceDetection: FaceDetectionResult): void {
    if (!this.avatarModel) return;

    try {
      const landmarks = faceDetection.landmarks;

      // Extract head rotation from landmarks
      // This is a simplified example - real implementation would be more sophisticated
      if (landmarks.length > 0) {
        // Calculate head rotation based on landmark positions
        const headRotation = this.calculateHeadRotation(landmarks);
        this.avatarModel.rotation.x = headRotation.x;
        this.avatarModel.rotation.y = headRotation.y;
        this.avatarModel.rotation.z = headRotation.z;
      }
    } catch (error) {
      console.error('Error updating avatar animation:', error);
    }
  }

  /**
   * Calculate head rotation from landmarks
   */
  private calculateHeadRotation(
    landmarks: any[]
  ): { x: number; y: number; z: number } {
    // Simplified calculation based on key facial landmarks
    // Key points: nose (index 1), eyes, jaw
    const nose = landmarks[1] || { x: 0.5, y: 0.5 };
    const leftEye = landmarks[33] || { x: 0.3, y: 0.4 };
    const rightEye = landmarks[263] || { x: 0.7, y: 0.4 };

    const eyeDistance = rightEye.x - leftEye.x;
    const eyeHeight = (rightEye.y + leftEye.y) / 2;
    const noseOffset = nose.x - 0.5;

    return {
      x: (eyeHeight - 0.5) * 0.5,
      y: -noseOffset * 0.5,
      z: 0,
    };
  }

  /**
   * Render frame
   */
  render(): void {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  /**
   * Update avatar preset
   */
  updatePreset(preset: AvatarPreset): void {
    if (!this.avatarModel) return;

    if (preset.morphTargets) {
      Object.entries(preset.morphTargets).forEach(([target, value]) => {
        this.morphTargets.set(target, value);
      });
    }
  }

  /**
   * Resize renderer
   */
  onWindowResize(canvas: HTMLCanvasElement): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }

    if (this.renderer) {
      this.renderer.setSize(width, height);
    }
  }
}

// Export singleton instance
export const avatarService = new AvatarService();
