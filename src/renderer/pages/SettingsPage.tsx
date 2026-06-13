/**
 * Settings Page Component
 */

import React, { useState, useEffect } from 'react';
import { AppSettings } from '@types/index';
import './SettingsPage.css';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Load settings from electron
        setLoading(false);
      } catch (error) {
        console.error('Error loading settings:', error);
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      // Save settings to electron
      console.log('Settings saved');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  if (loading) {
    return <div className="settings-page">Loading...</div>;
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Camera Settings</h2>
        <div className="setting-item">
          <label>Resolution:</label>
          <select>
            <option>1920x1080 (Full HD)</option>
            <option>1280x720 (HD)</option>
            <option>640x480 (VGA)</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Frame Rate (FPS):</label>
          <select>
            <option>30</option>
            <option>60</option>
            <option>24</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2>Performance Settings</h2>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Enable GPU Acceleration
          </label>
        </div>
        <div className="setting-item">
          <label>Face Mesh Quality:</label>
          <select>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2>Feature Settings</h2>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Enable Virtual Backgrounds
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Enable Avatar Customization
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked /> Enable Recording
          </label>
        </div>
      </section>

      <section className="settings-section">
        <button onClick={handleSaveSettings} className="save-button">
          Save Settings
        </button>
      </section>
    </div>
  );
};

export default SettingsPage;
