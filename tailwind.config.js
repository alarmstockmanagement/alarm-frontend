/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#404BD9',
      secondary: '#373854',
      bgPrimary: '#f9f9f9',
      vilotLow: '#D0D2EC',
      vilot: "#445DE3",
      redLow: '#ECC9CD',
      red: '#F02E24',
      greenLow: "#CCE1D4",
      green: "#25974C",

    },
    container: {
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1240px',
        '2xl': '1440px',
        '3xl': '1600px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'md': '6px 6px 20px 0px #00000070',
      },
    },
  },
  plugins: [],
}
