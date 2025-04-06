export const isApp = () => {
  return import.meta.env.VITE_APP_MODE === 'app';
};

export const isWeb = () => {
  return import.meta.env.VITE_APP_MODE === 'web';
};
