module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'neo': '8px 8px 15px #d1d9e6, -8px -8px 15px #ffffff',
        'neo-inner': 'inset 2px 2px 5px #d1d9e6, inset -3px -3px 7px #ffffff',
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        pinkish: "#e32e80",
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#D97706',
        },
        background: {
          light: '#F9FAFB',
          dark: '#1F2937',
        },
        surface: {
          light: '#FFFFFF',
          dark: '#111827',
        },
        text: {
          primary: '#1F2937',
          secondary: '#4B5563',
          tertiary: '#e32e80',
          dark: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
          },
        },
      },
    },
  },
  plugins: [],
};
