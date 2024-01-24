/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '50p': '50px',
        '10p':'10px',
        '30p':'30px'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        'primary':'#ACD8FE',
        'gradientTop':'#3498db87',
        'gradientBottom':'#3498db87',
        'bottomNavigation': '#3498DB',
        'activeFontIcon': '#F5F5F5',
        'customFontColor':'#333333',
        'patientVisitTask':'#ACD8FE',
        'activateColor':'#F5F5F5',
        'grayAlpha30':'#bcbcbc4d',
        'CornflowerBlue':'#62b6ff',
        'SilverChalice':'#EAEBEE',
        'disabledColor':'#e5e5e5',
        'activeColor':'#4285f4',
        'DodgerBlue':'#3c90e5'
      },
    },
  },
  plugins:  [require("tailwindcss-animate")],
}

