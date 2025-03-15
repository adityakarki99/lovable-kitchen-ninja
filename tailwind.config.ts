import type { Config } from "tailwindcss";
import { colors, spacing, typography } from "./src/styles/carbon-tokens";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: spacing.spacing05,
			screens: {
				'sm': '32rem',  // 512px
				'md': '48rem',  // 768px
				'lg': '64rem',  // 1024px
				'xl': '80rem',  // 1280px
				'2xl': '90rem', // 1440px
			}
		},
		extend: {
			colors: {
				// Core IBM Carbon colors
				'carbon-gray-10': colors.gray10,
				'carbon-gray-20': colors.gray20,
				'carbon-gray-30': colors.gray30,
				'carbon-gray-40': colors.gray40,
				'carbon-gray-50': colors.gray50,
				'carbon-gray-60': colors.gray60,
				'carbon-gray-70': colors.gray70,
				'carbon-gray-80': colors.gray80,
				'carbon-gray-90': colors.gray90,
				'carbon-gray-100': colors.gray100,
				
				'carbon-blue-10': colors.blue10,
				'carbon-blue-20': colors.blue20,
				'carbon-blue-30': colors.blue30,
				'carbon-blue-40': colors.blue40,
				'carbon-blue-50': colors.blue50,
				'carbon-blue-60': colors.blue60,
				'carbon-blue-70': colors.blue70,
				'carbon-blue-80': colors.blue80,
				'carbon-blue-90': colors.blue90,
				'carbon-blue-100': colors.blue100,
				
				// Supporting colors
				'carbon-green-50': colors.green50,
				'carbon-red-50': colors.red50,
				'carbon-purple-50': colors.purple50,
				'carbon-teal-50': colors.teal50,
				'carbon-cyan-50': colors.cyan50,
				
				// Semantic colors
				'carbon-background': colors.background,
				'carbon-background-hover': colors.backgroundHover,
				'carbon-background-active': colors.backgroundActive,
				
				'carbon-border': colors.border,
				'carbon-border-light': colors.borderLight,
				'carbon-border-subtle': colors.borderSubtle,
				
				'carbon-text-primary': colors.textPrimary,
				'carbon-text-secondary': colors.textSecondary,
				'carbon-text-placeholder': colors.textPlaceholder,
				'carbon-text-on-color': colors.textOnColor,
				'carbon-text-disabled': colors.textDisabled,
				
				'carbon-success': colors.success,
				'carbon-warning': colors.warning,
				'carbon-error': colors.error,
				'carbon-info': colors.info,
				
				// Existing Tailwind mappings
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				kitchen: {
					DEFAULT: '#f4f4f4', // Carbon gray10
					foreground: '#161616', // Carbon gray100
					primary: '#0f62fe', // Carbon blue60
					'primary-foreground': '#ffffff',
					danger: '#da1e28', // Carbon red50
					'danger-foreground': '#ffffff',
					success: '#24a148', // Carbon green50
					'success-foreground': '#ffffff',
					warning: '#f1c21b', // Carbon warning
					'warning-foreground': '#161616',
					muted: '#f4f4f4', // Carbon gray10
					'muted-foreground': '#6f6f6f', // Carbon gray60
					border: '#e0e0e0', // Carbon gray20
					card: '#ffffff',
					'card-foreground': '#161616', // Carbon gray100
				}
			},
			fontFamily: {
				'ibm-plex-sans': ["'IBM Plex Sans'", "'Helvetica Neue'", 'Arial', 'sans-serif'],
				'ibm-plex-mono': ["'IBM Plex Mono'", 'Consolas', 'monospace'],
			},
			fontSize: {
				// IBM Carbon font scale
				'carbon-caption': [typography.scale.caption01.fontSize, { lineHeight: typography.scale.caption01.lineHeight }],
				'carbon-label': [typography.scale.label01.fontSize, { lineHeight: typography.scale.label01.lineHeight }],
				'carbon-helper': [typography.scale.helperText01.fontSize, { lineHeight: typography.scale.helperText01.lineHeight }],
				'carbon-body-short-01': [typography.scale.bodyShort01.fontSize, { lineHeight: typography.scale.bodyShort01.lineHeight }],
				'carbon-body-long-01': [typography.scale.bodyLong01.fontSize, { lineHeight: typography.scale.bodyLong01.lineHeight }],
				'carbon-body-short-02': [typography.scale.bodyShort02.fontSize, { lineHeight: typography.scale.bodyShort02.lineHeight }],
				'carbon-body-long-02': [typography.scale.bodyLong02.fontSize, { lineHeight: typography.scale.bodyLong02.lineHeight }],
				'carbon-heading-01': [typography.scale.heading01.fontSize, { lineHeight: typography.scale.heading01.lineHeight }],
				'carbon-heading-02': [typography.scale.heading02.fontSize, { lineHeight: typography.scale.heading02.lineHeight }],
				'carbon-heading-03': [typography.scale.productiveHeading03.fontSize, { lineHeight: typography.scale.productiveHeading03.lineHeight }],
				'carbon-heading-04': [typography.scale.productiveHeading04.fontSize, { lineHeight: typography.scale.productiveHeading04.lineHeight }],
				'carbon-heading-05': [typography.scale.productiveHeading05.fontSize, { lineHeight: typography.scale.productiveHeading05.lineHeight }],
				'carbon-heading-06': [typography.scale.productiveHeading06.fontSize, { lineHeight: typography.scale.productiveHeading06.lineHeight }],
				'carbon-heading-07': [typography.scale.productiveHeading07.fontSize, { lineHeight: typography.scale.productiveHeading07.lineHeight }],
			},
			spacing: {
				// IBM Carbon spacing scale
				'carbon-01': spacing.spacing01,
				'carbon-02': spacing.spacing02,
				'carbon-03': spacing.spacing03,
				'carbon-04': spacing.spacing04,
				'carbon-05': spacing.spacing05,
				'carbon-06': spacing.spacing06,
				'carbon-07': spacing.spacing07,
				'carbon-08': spacing.spacing08,
				'carbon-09': spacing.spacing09,
				'carbon-10': spacing.spacing10,
				'carbon-11': spacing.spacing11,
				'carbon-12': spacing.spacing12,
				'carbon-13': spacing.spacing13,
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-10px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'blur-in': {
					'0%': { filter: 'blur(4px)', opacity: '0' },
					'100%': { filter: 'blur(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'slide-down': 'slide-down 0.4s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'blur-in': 'blur-in 0.4s ease-out'
			},
			boxShadow: {
				'apple-sm': '0 2px 10px rgba(0, 0, 0, 0.05)',
				'apple-md': '0 4px 20px rgba(0, 0, 0, 0.08)',
				'apple-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
				'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
				'carbon-sm': '0 2px 6px rgba(0, 0, 0, 0.2)',
				'carbon-md': '0 4px 8px rgba(0, 0, 0, 0.3)',
				'carbon-lg': '0 8px 16px rgba(0, 0, 0, 0.4)',
			},
			backdropBlur: {
				'apple': '10px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
