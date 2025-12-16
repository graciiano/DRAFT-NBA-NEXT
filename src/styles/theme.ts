// Theme configuration - Inspirado em NBA / E-sports
export const theme = {
  colors: {
    // Primary Colors - NBA inspired
    primary: {
      main: '#FF6B35', // Orange vibrant
      light: '#FF8C61',
      dark: '#E04E1A',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    },
    secondary: {
      main: '#00D9FF', // Cyan neon
      light: '#33E3FF',
      dark: '#00B8D9',
      gradient: 'linear-gradient(135deg, #00D9FF 0%, #0099FF 100%)',
    },

    // Background - Dark theme
    background: {
      primary: '#0A0E27', // Deep dark blue
      secondary: '#141B3D',
      tertiary: '#1E2749',
      card: '#1A2238',
      overlay: 'rgba(10, 14, 39, 0.95)',
    },

    // Text Colors
    text: {
      primary: '#FFFFFF',
      secondary: '#B8C5D6',
      disabled: '#6B7A8F',
      accent: '#00D9FF',
    },

    // Status Colors
    success: '#00FF88',
    error: '#FF3366',
    warning: '#FFB800',
    info: '#00D9FF',

    // Glassmorphism
    glass: {
      background: 'rgba(26, 34, 56, 0.6)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
    },
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
    secondary: 'linear-gradient(135deg, #00D9FF 0%, #0099FF 100%)',
    accent: 'linear-gradient(135deg, #FF3366 0%, #FF6B35 100%)',
    dark: 'linear-gradient(180deg, #0A0E27 0%, #141B3D 100%)',
    glow: 'radial-gradient(circle, rgba(255,107,53,0.3) 0%, transparent 70%)',
  },

  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  // Border Radius
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.2)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.4)',
    glow: {
      primary: '0 0 20px rgba(255, 107, 53, 0.5)',
      secondary: '0 0 20px rgba(0, 217, 255, 0.5)',
      success: '0 0 20px rgba(0, 255, 136, 0.5)',
    },
    neon: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
  },

  // Typography
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Rajdhani', 'Inter', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },

  // Breakpoints
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    modal: 2000,
    toast: 3000,
    tooltip: 4000,
  },
};

export type Theme = typeof theme;
