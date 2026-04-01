module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#22C55E', // Hijau Sukses
          dark: '#166534',
          light: '#F0FDF4',
        },
        surface: {
          bg: '#F9FAFB',     // Abu-abu sangat muda untuk background
          card: '#FFFFFF',   // Putih bersih untuk kartu
          border: '#E5E7EB', // Border tipis
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};