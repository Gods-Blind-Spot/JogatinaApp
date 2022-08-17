/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
    colors: {
      primary: {
        default: 'var(--ion-color-primary)',
        tint: 'var(--ion-color-primary-tint)',
        shade: 'var(--ion-color-primary-shade)'
      },
      secondary: {
        default: 'var(--ion-color-secondary)',
        tint: 'var(--ion-color-secondary-tint)',
        shade: 'var(--ion-color-secondary-shade)'

      },
      tertiary: {
        default: 'var(--ion-color-tertiary)',
        tint: 'var(--ion-color-tertiary-tint)',
        shade: 'var(--ion-color-tertiary-shade)'
      },
      dark: {
        default: 'var(--ion-color-dark)',
        tint: 'var(--ion-color-dark-tint)',
        shade: 'var(--ion-color-dark-shade)'
      },
      light: {
        default: 'var(--ion-color-light)',
        tint: 'var(--ion-color-light-tint)',
        shade: 'var(--ion-color-light-shade)'
      },
      danger: {
        default: 'var(--ion-color-danger)',
        tint: 'var(--ion-color-danger-tint)',
        shade: 'var(--ion-color-danger-shade)'
      },
      warning: {
        default: 'var(--ion-color-warning)',
        tint: 'var(--ion-color-warning-tint)',
        shade: 'var(--ion-color-warning-shade)'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
