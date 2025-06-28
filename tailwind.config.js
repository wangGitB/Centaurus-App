/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DBB555', // 金色
        secondary: '#EBCF79',
        accent: '#39AB63', // 色素绿
        success: '#92C691',
        background: '#E7ECEF', // 防闪白色
        dark: '#272932', // 黑加仑色
        hover: 'text-gray-600'
      }
    }
  },
  plugins: []
}
