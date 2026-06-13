/**
 * Recording Panel Component
 */

import React from 'react';
import './RecordingPanel.css';

interface Props {
  isRecording: boolean;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  onScreenshot: () => void;
}

const RecordingPanel: React.FC<Props> = ({
  isRecording,
  onStart,
  onStop,
  onScreenshot,
}) => {
  return (
    <div className="recording-panel">
      <h3>Recording</h3>
      <div className="button-group">
        {isRecording ? (
          <button className="stop-button" onClick={onStop}>
            ⏹ Stop Recording
          </button>
        ) : (
          <button className="start-button" onClick={onStart}>
            ⏺ Start Recording
          </button>
        )}
        <button className="screenshot-button" onClick={onScreenshot}>
          📸 Screenshot
        </button>
      </div>
      {isRecording && <div className="recording-indicator">Recording...</div>}
    </div>
  );
};

export default RecordingPanel;
