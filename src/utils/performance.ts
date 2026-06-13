/**
 * Performance Monitoring Utility
 * Tracks FPS, memory usage, and performance metrics
 */

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  gpuMemory?: number;
}

export class PerformanceMonitor {
  private frames = 0;
  private lastTime = performance.now();
  private currentFps = 0;
  private frameTimes: number[] = [];
  private maxFrameTimeHistory = 60;

  /**
   * Mark frame start
   */
  markFrameStart(): number {
    return performance.now();
  }

  /**
   * Mark frame end and update metrics
   */
  markFrameEnd(frameStartTime: number): void {
    const frameTime = performance.now() - frameStartTime;
    this.frameTimes.push(frameTime);

    if (this.frameTimes.length > this.maxFrameTimeHistory) {
      this.frameTimes.shift();
    }

    this.frames++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.currentFps = Math.round((this.frames * 1000) / elapsed);
      this.frames = 0;
      this.lastTime = currentTime;
    }
  }

  /**
   * Get current metrics
   */
  getMetrics(): PerformanceMetrics {
    const avgFrameTime =
      this.frameTimes.length > 0
        ? this.frameTimes.reduce((a, b) => a + b) / this.frameTimes.length
        : 0;

    return {
      fps: this.currentFps,
      frameTime: avgFrameTime,
      memoryUsage: this.getMemoryUsage(),
    };
  }

  /**
   * Get memory usage
   */
  private getMemoryUsage(): number | undefined {
    if (performance.memory) {
      return Math.round(performance.memory.usedJSHeapSize / 1048576);
    }
    return undefined;
  }

  /**
   * Reset metrics
   */
  reset(): void {
    this.frames = 0;
    this.lastTime = performance.now();
    this.currentFps = 0;
    this.frameTimes = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();
