import React from 'react';
import { useTheme } from './useTheme';
import ThemeToggle from './ThemeToggle';

const ThemeDemo = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">
          <i className="fi fi-rr-eclipse-alt me-2"></i>
          Theme Demo
        </h4>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6">
            <h5>Current Theme: {isDarkMode ? 'Dark' : 'Light'}</h5>
            <p className="text-muted">
              The theme is currently set to {isDarkMode ? 'dark' : 'light'} mode. 
              Click the toggle button to switch themes.
            </p>
            <div className="mb-3">
              <ThemeToggle size="lg" />
            </div>
            <div className="alert alert-info">
              <i className="fi fi-rr-info me-2"></i>
              Theme preference is saved in your browser's localStorage and will persist across sessions.
            </div>
          </div>
          <div className="col-md-6">
            <h6>Theme Features:</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="fi fi-bs-check text-success me-2"></i>
                Automatic system preference detection
              </li>
              <li className="mb-2">
                <i className="fi fi-bs-check text-success me-2"></i>
                Smooth transitions between themes
              </li>
              <li className="mb-2">
                <i className="fi fi-bs-check text-success me-2"></i>
                Persistent theme selection
              </li>
              <li className="mb-2">
                <i className="fi fi-bs-check text-success me-2"></i>
                Comprehensive dark styling
              </li>
              <li className="mb-2">
                <i className="fi fi-bs-check text-success me-2"></i>
                Accessible color contrasts
              </li>
            </ul>
          </div>
        </div>
        
        <hr />
        
        <div className="row">
          <div className="col-md-4">
            <div className="stat-widget-1">
              <h6>Sample Widget</h6>
              <h3>$1,234</h3>
              <p>
                <span className="text-success">
                  <i className="fi fi-rr-arrow-trend-up" />
                  +12.5%
                </span>
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label className="form-label">Sample Input</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Enter some text..."
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="d-flex flex-column">
              <button className="btn btn-primary mb-2">Primary Button</button>
              <button className="btn btn-outline-primary">Outline Button</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo; 