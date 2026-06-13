/**
 * Camera Controls Component
 */

import React from 'react';
import './CameraControls.css';

interface Props {
  isStreaming: boolean;
  onStart: () => Promise<void>;
  onStop: () => void;
}

const CameraControls: React.FC<Props> = ({
  isStreaming,
  onStart,
  onStop,
}) => {
  const handleToggleCamera = async () => {
    if (isStreaming) {
      onStop();
    } else {
      await onStart();
    }
  };

  return (
    <div className="camera-controls">
      <h3>Camera</h3>
      <button
        className={`toggle-button ${isStreaming ? 'active' : ''}`}
        onClick={handleToggleCamera}
      >
        {isStreaming ? '🎥 Stop Camera' : '📷 Start Camera'}
      </button>
    </div>
  );
};

export default CameraControls;
