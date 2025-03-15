
// IBM Carbon Design System Tokens

// Color Tokens
export const colors = {
  // Core palette
  gray10: '#f4f4f4',
  gray20: '#e0e0e0',
  gray30: '#c6c6c6',
  gray40: '#a8a8a8',
  gray50: '#8d8d8d',
  gray60: '#6f6f6f',
  gray70: '#525252',
  gray80: '#393939',
  gray90: '#262626',
  gray100: '#161616',
  
  // Blue palette (primary)
  blue10: '#edf5ff',
  blue20: '#d0e2ff',
  blue30: '#a6c8ff',
  blue40: '#78a9ff',
  blue50: '#4589ff',
  blue60: '#0f62fe',
  blue70: '#0043ce',
  blue80: '#002d9c',
  blue90: '#001d6c',
  blue100: '#001141',
  
  // Supporting colors
  green50: '#24a148',
  red50: '#da1e28',
  purple50: '#8a3ffc',
  teal50: '#009d9a',
  cyan50: '#1192e8',
  
  // UI background
  background: '#f4f4f4',
  backgroundHover: '#e8e8e8',
  backgroundActive: '#c6c6c6',
  
  // UI elements
  border: '#8d8d8d',
  borderLight: '#e0e0e0',
  borderSubtle: '#dcdcdc',
  
  // Text
  textPrimary: '#161616',
  textSecondary: '#525252',
  textPlaceholder: '#6f6f6f',
  textOnColor: '#ffffff',
  textDisabled: '#a8a8a8',
  
  // Status
  success: '#24a148',
  warning: '#f1c21b',
  error: '#da1e28',
  info: '#0043ce',
};

// Typography Tokens
export const typography = {
  // Font family
  fontFamily: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  
  // Font weights
  weightLight: 300,
  weightRegular: 400,
  weightSemibold: 600,
  
  // Font sizes
  scale: {
    caption01: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.34,
      fontWeight: 400,
    },
    label01: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.34,
      fontWeight: 400,
    },
    helperText01: {
      fontSize: '0.75rem', // 12px
      lineHeight: 1.34,
      fontWeight: 400,
    },
    bodyShort01: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.29,
      fontWeight: 400,
    },
    bodyLong01: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.43,
      fontWeight: 400,
    },
    bodyShort02: {
      fontSize: '1rem', // 16px
      lineHeight: 1.375,
      fontWeight: 400,
    },
    bodyLong02: {
      fontSize: '1rem', // 16px
      lineHeight: 1.5,
      fontWeight: 400,
    },
    heading01: {
      fontSize: '0.875rem', // 14px
      lineHeight: 1.29,
      fontWeight: 600,
    },
    heading02: {
      fontSize: '1rem', // 16px
      lineHeight: 1.375,
      fontWeight: 600,
    },
    productiveHeading03: {
      fontSize: '1.25rem', // 20px
      lineHeight: 1.4,
      fontWeight: 400,
    },
    productiveHeading04: {
      fontSize: '1.75rem', // 28px
      lineHeight: 1.29,
      fontWeight: 400,
    },
    productiveHeading05: {
      fontSize: '2rem', // 32px
      lineHeight: 1.25,
      fontWeight: 400,
    },
    productiveHeading06: {
      fontSize: '2.625rem', // 42px
      lineHeight: 1.2,
      fontWeight: 300,
    },
    productiveHeading07: {
      fontSize: '3.375rem', // 54px
      lineHeight: 1.2,
      fontWeight: 300,
    },
  },
};

// Spacing Tokens (8px grid)
export const spacing = {
  spacing01: '0.125rem', // 2px
  spacing02: '0.25rem',  // 4px
  spacing03: '0.5rem',   // 8px
  spacing04: '0.75rem',  // 12px
  spacing05: '1rem',     // 16px
  spacing06: '1.5rem',   // 24px
  spacing07: '2rem',     // 32px
  spacing08: '2.5rem',   // 40px
  spacing09: '3rem',     // 48px
  spacing10: '4rem',     // 64px
  spacing11: '5rem',     // 80px
  spacing12: '6rem',     // 96px
  spacing13: '10rem',    // 160px
};

// Layout Tokens
export const layout = {
  // Container widths
  container: {
    sm: '32rem',     // 512px
    md: '48rem',     // 768px
    lg: '64rem',     // 1024px
    xl: '80rem',     // 1280px
    xxl: '90rem',    // 1440px
    maxWidth: '100%',
  },
  
  // Grid
  grid: {
    columns: 12,
    margin: spacing.spacing05,
    gutter: spacing.spacing03,
  },
};

// Component-specific Tokens
export const components = {
  // Buttons
  button: {
    primary: {
      background: colors.blue60,
      hoverBackground: colors.blue70,
      activeBackground: colors.blue80,
      text: colors.textOnColor,
    },
    secondary: {
      background: colors.gray80,
      hoverBackground: colors.gray90,
      activeBackground: colors.gray100,
      text: colors.textOnColor,
    },
    tertiary: {
      background: 'transparent',
      hoverBackground: colors.gray20,
      activeBackground: colors.gray30,
      text: colors.blue60,
      border: colors.blue60,
    },
    danger: {
      background: colors.red50,
      hoverBackground: '#b81921',
      activeBackground: '#8e1418',
      text: colors.textOnColor,
    },
    ghost: {
      background: 'transparent',
      hoverBackground: colors.gray10,
      activeBackground: colors.gray20,
      text: colors.blue60,
    },
  },
  
  // Input
  input: {
    height: '2.5rem', // 40px
    background: colors.textOnColor,
    border: colors.gray50,
    focusBorder: colors.blue60,
    errorBorder: colors.red50,
    text: colors.textPrimary,
    placeholderText: colors.textPlaceholder,
    padding: `0 ${spacing.spacing05}`,
  },
  
  // Card
  card: {
    background: colors.textOnColor,
    border: colors.borderLight,
    shadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    padding: spacing.spacing05,
    borderRadius: '4px',
  },
  
  // Tag
  tag: {
    background: colors.gray20,
    text: colors.textPrimary,
    borderRadius: '2px',
    padding: `${spacing.spacing02} ${spacing.spacing03}`,
  },
  
  // Data table
  dataTable: {
    headerBackground: colors.gray10,
    rowHoverBackground: colors.gray10,
    border: colors.borderLight,
    text: colors.textPrimary,
    headerText: colors.textPrimary,
  },
  
  // Modal
  modal: {
    background: colors.textOnColor,
    overlay: 'rgba(22, 22, 22, 0.5)',
    border: colors.borderLight,
    shadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
  },
  
  // Notification
  notification: {
    info: {
      background: colors.blue10,
      border: colors.blue50,
      icon: colors.blue60,
    },
    success: {
      background: '#defbe6',
      border: colors.green50,
      icon: colors.green50,
    },
    warning: {
      background: '#fff8e1',
      border: colors.warning,
      icon: colors.warning,
    },
    error: {
      background: '#fff1f1',
      border: colors.error,
      icon: colors.error,
    },
  },
};

// Animation Tokens
export const motion = {
  timing: {
    fast01: '70ms', // Micro-interactions, button state change
    fast02: '110ms', // Small expansions, system communication
    moderate01: '150ms', // Expansion, system communication, toast
    moderate02: '240ms', // Large expansion, toast, dropdown
    slow01: '400ms', // Large expansion, important system notifications
    slow02: '700ms', // Background animation
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
    entrance: 'cubic-bezier(0, 0, 0.38, 0.9)',
    exit: 'cubic-bezier(0.2, 0, 1, 0.9)',
  },
};

// Common
export const common = {
  borderRadius: '0', // Carbon uses mostly square corners for components
  focusRing: `2px solid ${colors.blue60}`,
  iconSize: {
    small: '1rem', // 16px
    medium: '1.25rem', // 20px
    large: '1.5rem', // 24px
  },
};

export default {
  colors,
  typography,
  spacing,
  layout,
  components,
  motion,
  common,
};
