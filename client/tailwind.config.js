module.exports = {
  purge: [
    '../client/index.html',
    '../client/**/*.js',
  ],
  future: {
    removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
