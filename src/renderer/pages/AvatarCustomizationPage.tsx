/**
 * Avatar Customization Page Component
 */

import React, { useState } from 'react';
import { Avatar, AvatarPreset } from '@types/index';
import './AvatarCustomizationPage.css';

const AvatarCustomizationPage: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  const handlePresetApply = (preset: AvatarPreset) => {
    console.log('Applied preset:', preset);
  };

  return (
    <div className="avatar-customization-page">
      <h1>Avatar Customization</h1>

      <div className="customization-container">
        {/* Avatar list */}
        <div className="avatar-list">
          <h2>Available Avatars</h2>
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`avatar-item ${selectedAvatar?.id === avatar.id ? 'selected' : ''}`}
              onClick={() => handleAvatarSelect(avatar)}
            >
              <div className="avatar-preview">
                <div className="avatar-placeholder">{avatar.name}</div>
              </div>
              <div className="avatar-info">
                <h3>{avatar.name}</h3>
                <p>{avatar.type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customization panel */}
        {selectedAvatar && (
          <div className="customization-panel">
            <h2>Customize: {selectedAvatar.name}</h2>

            <section className="customization-section">
              <h3>Appearance</h3>
              <div className="control-group">
                <label>Hairstyle:</label>
                <select>
                  <option>Default</option>
                  <option>Short</option>
                  <option>Long</option>
                  <option>Curly</option>
                </select>
              </div>
              <div className="control-group">
                <label>Clothing:</label>
                <select>
                  <option>Default</option>
                  <option>Casual</option>
                  <option>Formal</option>
                  <option>Sport</option>
                </select>
              </div>
            </section>

            <section className="customization-section">
              <h3>Accessories</h3>
              <div className="control-group">
                <label>
                  <input type="checkbox" /> Glasses
                </label>
              </div>
              <div className="control-group">
                <label>
                  <input type="checkbox" /> Hat
                </label>
              </div>
              <div className="control-group">
                <label>
                  <input type="checkbox" /> Scarf
                </label>
              </div>
            </section>

            <button className="apply-button">Apply Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarCustomizationPage;
