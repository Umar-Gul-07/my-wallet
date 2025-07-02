# Dark Theme Implementation

## Overview

The Kaka Wallet application now includes a comprehensive dark theme system that provides users with a comfortable viewing experience in low-light conditions.

## Features

### 🎨 **Theme Toggle**
- Click the moon/sun icon in the header to switch between light and dark themes
- Smooth animations and transitions between themes
- Visual feedback with icon rotation and scaling effects

### 💾 **Persistent Storage**
- Theme preference is automatically saved to localStorage
- Theme selection persists across browser sessions
- No need to re-select theme on each visit

### 🌐 **System Preference Detection**
- Automatically detects user's system theme preference
- Respects `prefers-color-scheme: dark` media query
- Falls back to light theme if no preference is set

### 🎯 **Comprehensive Styling**
- All components styled for both light and dark themes
- Proper color contrasts for accessibility
- Consistent visual hierarchy in both themes

## Implementation Details

### Theme Context (`useTheme.js`)
```javascript
import { useTheme } from '../Utils/useTheme';

const { isDarkMode, toggleTheme } = useTheme();
```

### Theme Provider Setup
The `ThemeProvider` wraps the entire application in `App.js`:
```javascript
import { ThemeProvider } from "./Utils/useTheme";

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### CSS Classes
The dark theme is applied using the `.dark-theme` class on the document body:
- Light theme: No additional classes
- Dark theme: `.dark-theme` class applied

### Custom Components

#### ThemeToggle Component
```javascript
import ThemeToggle from '../Utils/ThemeToggle';

// Usage
<ThemeToggle size="md" className="custom-class" />
```

#### ThemeDemo Component
```javascript
import ThemeDemo from '../Utils/ThemeDemo';

// Usage - showcases theme functionality
<ThemeDemo />
```

## Styling Guidelines

### Color Palette
- **Background**: `#1a1a1a` (dark) / `#F6F9FC` (light)
- **Card Background**: `#2d2d2d` (dark) / `#ffffff` (light)
- **Text Primary**: `#e5e5e5` (dark) / `#1f2c73` (light)
- **Text Secondary**: `#a3a3a3` (dark) / `#7184ad` (light)
- **Border**: `#404040` (dark) / `#e5eaf2` (light)

### Transitions
All theme changes include smooth transitions:
```css
transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
```

## Usage Examples

### Using Theme in Components
```javascript
import React from 'react';
import { useTheme } from '../Utils/useTheme';

const MyComponent = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className={`my-component ${isDarkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
};
```

### Conditional Styling
```javascript
const dynamicStyle = {
  backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
  color: isDarkMode ? '#e5e5e5' : '#1f2c73'
};
```

## Browser Support

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Accessibility

- WCAG 2.1 AA compliant color contrasts
- Proper focus indicators in both themes
- Screen reader friendly theme toggle
- Keyboard navigation support

## Customization

### Adding New Dark Theme Styles
Add your custom dark theme styles to `src/index.css`:
```css
.dark-theme .my-custom-component {
  background-color: #2d2d2d !important;
  color: #e5e5e5 !important;
  border-color: #404040 !important;
}
```

### Extending Theme Context
You can extend the theme context to include additional theme options:
```javascript
const [theme, setTheme] = useState('light'); // 'light', 'dark', 'auto'
```

## Troubleshooting

### Theme Not Persisting
- Check if localStorage is enabled in the browser
- Verify the `ThemeProvider` wraps your app correctly

### Styles Not Applying
- Ensure the `.dark-theme` class is applied to the document body
- Check for CSS specificity issues with `!important` declarations

### Performance Issues
- Theme switching is optimized with CSS transitions
- No re-renders required for theme changes
- Minimal JavaScript overhead

## Future Enhancements

- [ ] Additional theme options (auto, custom)
- [ ] Theme-specific chart colors
- [ ] Export/import theme preferences
- [ ] Theme-aware image assets
- [ ] Reduced motion support for accessibility

---

For more information, see the theme implementation in:
- `src/Utils/useTheme.js` - Theme context and logic
- `src/Utils/ThemeToggle.jsx` - Toggle component
- `src/Utils/ThemeDemo.jsx` - Demo component
- `src/index.css` - Dark theme styles
- `src/Pages/include/Header.jsx` - Header integration 