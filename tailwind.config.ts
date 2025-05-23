import type { Config } from "tailwindcss";

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
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    fontFamily: {
      sans: ['"Geomanist"', 'system-ui', 'sans-serif'],
    },
    extend: {
      transitionDuration: {
        '3000': '3000ms',
      },
      colors: {
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
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      willChange: {
        opacity: 'opacity',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-out': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(10px)'
          }
        },
        'scale-in': {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'scale-out': {
          from: { transform: 'scale(1)', opacity: '1' },
          to: { transform: 'scale(0.95)', opacity: '0' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'image-shimmer': {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        },
        'content-fade-up': {
          '0%': { 
            opacity: '0',
            transform: 'scale(1.05) translateY(10px)',
            filter: 'blur(4px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)'
          }
        },
        'content-fade-down': {
          '0%': { 
            opacity: '0',
            transform: 'scale(1.05) translateY(-10px)',
            filter: 'blur(4px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)'
          }
        },
        'content-fade-out-up': {
          '0%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)',
            filter: 'blur(4px)'
          }
        },
        'content-fade-out-down': {
          '0%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)',
            filter: 'blur(0)'
          },
          '100%': { 
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
            filter: 'blur(4px)'
          }
        },
        'content-blur-fade': {
          '0%': { 
            opacity: '0',
            filter: 'blur(8px)'
          },
          '100%': { 
            opacity: '1',
            filter: 'blur(0)'
          }
        },
        'content-blur-fade-out': {
          '0%': { 
            opacity: '1',
            filter: 'blur(0)'
          },
          '100%': { 
            opacity: '0',
            filter: 'blur(8px)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-out': 'fade-out 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'scale-out': 'scale-out 0.2s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'slide-out-right': 'slide-out-right 0.3s ease-out',
        'image-shimmer': 'image-shimmer 1.5s infinite linear',
        'content-enter-up': 'content-fade-up 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'content-enter-down': 'content-fade-down 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'content-exit-up': 'content-fade-out-up 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'content-exit-down': 'content-fade-out-down 400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        'blur-fade-in': 'content-blur-fade 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        'blur-fade-out': 'content-blur-fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
