/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this to include paths to all files using Tailwind classes (e.g., App.tsx, components, etc.)
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // If using Expo Router or an 'app' folder
    "./components/**/*.{js,jsx,ts,tsx}", // Add your custom folders here
    // Include any other directories like './src/**/*.{js,jsx,ts,tsx}' if applicable
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
