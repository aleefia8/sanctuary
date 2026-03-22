// Design tokens for SanctuaryOS
export const Colors = {
  // Base
  background: '#0c0f14',
  surface: '#161b22',
  surfaceLight: '#1f2937',
  glass: 'rgba(255,255,255,0.04)',
  glassBorder: 'rgba(255,255,255,0.06)',

  // Text
  textPrimary: '#ffffff',
  textSecondary: '#9ca3af',
  textMuted: '#6b7280',

  // Accent
  accent: '#34D399',
  accentSoft: 'rgba(52, 211, 153, 0.15)',
  accentGlow: 'rgba(52, 211, 153, 0.3)',

  // Feedback
  success: '#34D399',
  warning: '#fbbf24',
  info: '#22D3EE',
  energy: '#fbbf24',
  sleep: '#818cf8',
  fitness: '#f472b6',
  stress: '#fb923c',
  longevity: '#34D399',

  // Coin
  coin: '#fbbf24',
  coinDark: '#92400e',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const Typography = {
  hero: { fontSize: 42, fontWeight: '800' as const, letterSpacing: -1.5 },
  h1: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.8 },
  h2: { fontSize: 24, fontWeight: '600' as const, letterSpacing: -0.5 },
  h3: { fontSize: 20, fontWeight: '600' as const, letterSpacing: -0.3 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  bodyLight: { fontSize: 16, fontWeight: '300' as const, lineHeight: 24 },
  caption: { fontSize: 13, fontWeight: '500' as const },
  small: { fontSize: 12, fontWeight: '400' as const },
  score: { fontSize: 72, fontWeight: '800' as const, letterSpacing: -2 },
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};
