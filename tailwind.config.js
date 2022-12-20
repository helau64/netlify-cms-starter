module.exports = {
  content: ["./**/*.njk"],
  theme: {
    screens: {
      xxs: '350px',
      xs: '580px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};