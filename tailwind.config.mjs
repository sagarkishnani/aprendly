/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'system-ui', 'sans-serif'],
      heading: ['Poppins', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    fontSize: {
      'display':     ['clamp(2.5rem, 4.6vw + 0.6rem, 4.5rem)',      { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '700' }],
      'heading-xl':  ['clamp(2.25rem, 3.6vw + 0.6rem, 3.5rem)',     { lineHeight: '1.06', letterSpacing: '-0.035em', fontWeight: '700' }],
      'heading-lg':  ['clamp(2rem, 2.8vw + 0.6rem, 3rem)',          { lineHeight: '1.08', letterSpacing: '-0.03em',  fontWeight: '700' }],
      'heading-md':  ['clamp(1.75rem, 2vw + 0.6rem, 2.5rem)',       { lineHeight: '1.1',  letterSpacing: '-0.03em',  fontWeight: '700' }],
      'heading-sm':  ['clamp(1.5rem, 1.2vw + 0.7rem, 2rem)',        { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '700' }],
      'heading-xs':  ['clamp(1.25rem, 0.6vw + 0.9rem, 1.5rem)',     { lineHeight: '1.25', letterSpacing: '-0.02em',  fontWeight: '600' }],

      'subtitle-lg': ['20px', { lineHeight: '1.35', fontWeight: '600' }],
      'subtitle-md': ['18px', { lineHeight: '1.4',  fontWeight: '600' }],
      'subtitle-sm': ['16px', { lineHeight: '1.4',  fontWeight: '600' }],

      'body-lg': ['18px', { lineHeight: '1.65', fontWeight: '400' }],
      'body-md': ['16px', { lineHeight: '1.6',  fontWeight: '400' }],
      'body-sm': ['14px', { lineHeight: '1.6',  fontWeight: '400' }],

      'caption-md': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
      'caption-sm': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      'overline':   ['12px', { lineHeight: '1.3', letterSpacing: '0.14em', fontWeight: '600' }],
    },
    extend: {
      colors: {
        brand: {
          primary: {
            darkest:  '#160B33',
            dark:     '#6410D4',
            DEFAULT:  '#7416ED',
            light:    '#D6CDF0',
            lightest: '#F4EEFE',
          },
          pink: {
            DEFAULT:  '#F43870',
            dark:     '#D91F58',
          },
          ink:     '#160B33',
          night:   '#1C0A4A',
          dusk:    '#3A2C66',
          lilac:   '#C9C2E0',
        },
        semantics: {
          success: { dark: '#267C35', DEFAULT: '#37B24D', lightest: '#EBF7ED' },
          alert:   { dark: '#CA7900', DEFAULT: '#FC9700', lightest: '#FFF4D8' },
          error:   { dark: '#8C1D1D', DEFAULT: '#EB0E0E', lightest: '#F9EBEA' },
          whatsapp: '#25D366',
          star:    '#FFB800',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          raised:  '#F7F5FB',
          tint:    '#FAF8FF',
        },
        content: {
          DEFAULT: '#160B33',
          muted:   '#4A4166',
          subtle:  '#6B6385',
        },
        line: {
          DEFAULT: '#E6E0F2',
          strong:  '#D6CDF0',
        },
        accent: '#7416ED',
      },
      maxWidth: {
        site: '1344px',
      },
      borderRadius: {
        sm: '6px', md: '10px', lg: '16px', xl: '20px', '2xl': '24px', '3xl': '32px', '4xl': '40px',
      },
      boxShadow: {
        float: '0 24px 60px rgba(22, 11, 51, 0.14)',
        card:  '0 16px 40px rgba(22, 11, 51, 0.10)',
        soft:  '0 1px 4px rgba(22, 11, 51, 0.08)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-sharp': 'cubic-bezier(0.7, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%':   { boxShadow: '0 0 0 0 rgba(244, 56, 112, 0.5)' },
          '100%': { boxShadow: '0 0 0 12px rgba(244, 56, 112, 0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'live-pulse': 'pulse 1.6s ease-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
