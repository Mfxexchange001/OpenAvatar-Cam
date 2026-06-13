/**
 * Background Selector Component
 */

import React from 'react';
import { VirtualBackground } from '@types/index';
import './BackgroundSelector.css';

interface Props {
  onSelect: (background: VirtualBackground | null) => void;
}

const BackgroundSelector: React.FC<Props> = ({ onSelect }) => {
  const handleBackgroundChange = (type: string) => {
    if (type === 'none') {
      onSelect(null);
    } else if (type === 'blur') {
      onSelect({
        id: 'blur-1',
        name: 'Blur Background',
        type: 'blur',
        data: '',
        intensity: 10,
      });
    }
  };

  return (
    <div className="background-selector">
      <h3>Background</h3>
      <select onChange={(e) => handleBackgroundChange(e.target.value)}>
        <option value="none">None</option>
        <option value="blur">Blur</option>
        <option value="solid">Solid Color</option>
      </select>
    </div>
  );
};

export default BackgroundSelector;
