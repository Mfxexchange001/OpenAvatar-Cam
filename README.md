# OpenAvatar Cam

**Production-Ready AI Virtual Webcam Desktop Application**

OpenAvatar Cam is a comprehensive desktop application that provides advanced webcam manipulation, AI-powered face tracking, avatar animation, and virtual background capabilities. Built with Electron, React, and TypeScript, it delivers professional-grade video processing for virtual meetings, streaming, and content creation.

## Features

### 🎥 Core Functionality
- **Real-time Webcam Capture**: HD and Full HD support with adjustable frame rates
- **AI Face Tracking**: MediaPipe-powered facial landmark detection (468 points)
- **Avatar System**: Support for realistic, stylized, and cartoon avatars
- **Facial Expression Mapping**: Real-time animation based on detected expressions
- **Virtual Backgrounds**: Blur, image, video, or solid color backgrounds
- **Recording**: Export processed video in MP4, AVI, or MOV formats
- **Screenshots**: Capture processed frames as PNG images

### 🤖 AI Features
- Accurate head rotation tracking
- Eye movement detection
- Mouth movement and expression recognition
- Eyebrow movement tracking
- Lighting-adaptive face detection

### 🎭 Customization
- Appearance transformation (clothing, hairstyles, accessories)
- Avatar morphing presets
- Hair and clothing customization
- Hat, glasses, and scarf accessories
- Custom color and texture options

### 📹 Virtual Camera Output
- Compatible with Zoom, Google Meet, Microsoft Teams
- OBS, Discord, and browser-based platforms
- Virtual camera device creation
- Real-time frame streaming

### ⚡ Performance
- GPU acceleration with WebGL
- Optimized 30-60 FPS rendering
- Efficient memory management
- Responsive UI with real-time feedback

### 🔒 Privacy & Security
- Local processing (no cloud dependency)
- User-controlled data handling
- Secure IPC communication
- Context isolation in Electron

## Project Structure

```
OpenAvatar-Cam/
├── src/
│   ├── main/
│   │   ├── main.ts              # Electron main process
│   │   └── preload.ts           # Secure IPC preload
│   ├── renderer/
│   │   ├── index.tsx            # React entry point
│   │   ├── App.tsx              # Root component
│   │   ├── pages/
│   │   │   ├── MainPage.tsx     # Primary UI
│   │   │   ├── SettingsPage.tsx # Settings panel
│   │   │   └── AvatarCustomizationPage.tsx
│   │   ├── components/
│   │   │   ├── CameraControls.tsx
│   │   │   ├── AvatarSelector.tsx
│   │   │   ├── BackgroundSelector.tsx
│   │   │   └── RecordingPanel.tsx
│   │   └── *.css               # Styling
│   ├── services/
│   │   ├── cameraService.ts    # Camera management
│   │   ├── faceDetectionService.ts  # Face detection
│   │   ├── avatarService.ts    # Avatar rendering
│   │   ├── backgroundService.ts # Background processing
│   │   └── recordingService.ts # Video recording
│   ├── types/
│   │   └── index.ts            # TypeScript definitions
│   ├── utils/
│   │   ├── settings.ts         # App configuration
│   │   ├── errors.ts           # Error handling
│   │   ├── performance.ts      # Performance monitoring
│   │   ├── math.ts             # Math utilities
│   │   └── canvas.ts           # Canvas helpers
│   └── hooks/
│       ├── useCamera.ts        # Camera hook
│       ├── useFaceDetection.ts # Face detection hook
│       └── usePerformanceMonitor.ts
├── public/
│   └── index.html              # Main HTML
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- Windows 10+ or macOS 10.13+
- 4GB RAM minimum (8GB recommended)
- Webcam or compatible video device

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd OpenAvatar-Cam
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This command runs both the React development server and Electron main process concurrently.

## Building

### Development Build
```bash
npm run build
# or
yarn build
```

### Production Executable
```bash
npm run dist
# or
yarn dist
```

The executable will be generated in the `out/` directory.

## Usage

### Starting the Application
1. Launch OpenAvatar Cam
2. Allow camera permissions when prompted
3. Click "Start Camera" to begin

### Using the Interface

**Main Panel:**
- **Camera**: Toggle webcam on/off
- **FPS Counter**: Monitor real-time performance
- **Avatar**: Select from available avatars
- **Background**: Choose background effect
- **Recording**: Start/stop video capture

**Settings Page:**
- Camera resolution and frame rate
- GPU acceleration settings
- Feature toggles
- Model quality settings

**Avatar Customization:**
- Select avatar from library
- Customize hairstyle and clothing
- Add accessories (glasses, hats, scarves)
- Apply custom colors and textures

### Recording Videos
1. Select desired settings
2. Click "Start Recording"
3. The recording indicator appears
4. Click "Stop Recording" to finish
5. File downloads automatically

### Taking Screenshots
1. Click the "Screenshot" button
2. Image saves to Documents/OpenAvatar/screenshots/

## Configuration

### Environment Variables

```env
# Camera
REACT_APP_DEFAULT_CAMERA_WIDTH=1920
REACT_APP_DEFAULT_CAMERA_HEIGHT=1080
REACT_APP_DEFAULT_CAMERA_FPS=30

# Performance
REACT_APP_TARGET_FPS=60
REACT_APP_ENABLE_GPU_ACCELERATION=true
REACT_APP_MEDIAPIPE_THREADS=4

# Features
REACT_APP_ENABLE_FACE_MESH=true
REACT_APP_ENABLE_VIRTUAL_BACKGROUNDS=true
REACT_APP_ENABLE_AVATAR_CUSTOMIZATION=true
REACT_APP_ENABLE_RECORDING=true
REACT_APP_ENABLE_FACE_REPLACEMENT=true
```

## Technical Stack

### Core
- **Electron 27.0**: Desktop application framework
- **React 18.2**: UI framework
- **TypeScript 5.2**: Type safety
- **Node.js**: Backend runtime

### AI & Processing
- **MediaPipe Tasks**: Face detection and tracking
- **TensorFlow.js**: ML model execution
- **Three.js**: 3D avatar rendering
- **WebGL**: GPU acceleration

### Video & Recording
- **MediaStream API**: Camera access
- **Canvas API**: Frame processing
- **MediaRecorder API**: Video encoding
- **WebRTC**: Real-time media handling

## Performance Optimization

### GPU Acceleration
- WebGL backend for TensorFlow.js
- Three.js GPU rendering
- Hardware-accelerated video encoding

### Memory Management
- Canvas pooling
- Efficient frame buffering
- Automatic garbage collection
- Memory leak prevention

### FPS Optimization
- Adaptive rendering quality
- Frame rate limiting
- Efficient landmark processing
- Batch processing operations

## Troubleshooting

### Camera Not Detected
1. Check camera permissions in OS settings
2. Verify webcam is connected and functioning
3. Try restarting the application
4. Check for conflicting applications

### Poor Performance
1. Lower camera resolution
2. Reduce frame rate
3. Disable GPU acceleration in settings
4. Close other applications
5. Update graphics drivers

### Face Not Detected
1. Ensure adequate lighting
2. Face must be clearly visible
3. Check camera focus
4. Move closer to camera
5. Verify face mesh is enabled

### Recording Issues
1. Ensure sufficient disk space
2. Check output directory permissions
3. Verify codec compatibility
4. Try different format (MP4, WebM)

## API Reference

### Services

#### CameraService
```typescript
await cameraService.initialize(settings);
await cameraService.startStream(deviceId);
cameraService.stopStream();
const canvas = cameraService.captureFrame();
const cameras = await cameraService.getAvailableCameras();
```

#### FaceDetectionService
```typescript
await faceDetectionService.initialize();
const results = await faceDetectionService.detectFaces(videoElement);
```

#### AvatarService
```typescript
avatarService.initializeScene(canvas);
await avatarService.loadAvatar(avatar);
avatarService.updateAvatarAnimation(faceDetection);
avatarService.render();
```

#### BackgroundService
```typescript
await backgroundService.initialize();
const processed = await backgroundService.processFrame(frame, background);
```

#### RecordingService
```typescript
const stream = recordingService.initializeRecording(canvas);
recordingService.startRecording(options);
const blob = await recordingService.stopRecording();
```

## Hooks

#### useCamera
```typescript
const { videoRef, isStreaming, error, startStream, stopStream } = useCamera(settings);
```

#### useFaceDetection
```typescript
const { isInitialized, error, detectFaces } = useFaceDetection();
```

#### usePerformanceMonitor
```typescript
const { fps, frameTime, memoryUsage } = usePerformanceMonitor();
```

## Security Considerations

1. **Context Isolation**: Electron processes are properly isolated
2. **Preload Scripts**: Safe API exposure through preload
3. **Content Security Policy**: Strict CSP headers
4. **No Node Integration**: Disabled by default
5. **Sandbox Mode**: Enabled for renderer process
6. **Local Processing**: No data sent to external servers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please open an issue on GitHub.

## Roadmap

- [ ] Linux support
- [ ] Multiple avatar support with streaming
- [ ] Advanced hair physics
- [ ] Real-time lighting adaptation
- [ ] Plugin system for custom avatars
- [ ] Cloud avatar library
- [ ] AR filters integration
- [ ] Advanced audio processing
- [ ] Performance profiling tools
- [ ] Accessibility improvements

## Credits

Built with ❤️ using open-source technologies

---

**OpenAvatar Cam** - Making virtual communication more human
