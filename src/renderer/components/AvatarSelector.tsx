/**
 * Avatar Selector Component
 */

import React, { useState } from 'react';
import './AvatarSelector.css';

const AvatarSelector: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('realistic-1');

  const avatars = [
    { id: 'realistic-1', name: 'Realistic Avatar', type: 'realistic' },
    { id: 'stylized-1', name: 'Stylized Avatar', type: 'stylized' },
    { id: 'cartoon-1', name: 'Cartoon Avatar', type: 'cartoon' },
  ];

  return (
    <div className="avatar-selector">
      <h3>Avatar</h3>
      <select
        value={selectedAvatar}
        onChange={(e) => setSelectedAvatar(e.target.value)}
      >
        {avatars.map((avatar) => (
          <option key={avatar.id} value={avatar.id}>
            {avatar.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AvatarSelector;
