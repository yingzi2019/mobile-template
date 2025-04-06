// https://unocss.dev/presets/rem-to-px
import presetRemToPx from '@unocss/preset-rem-to-px';
import presetWind3 from '@unocss/preset-wind3';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetMini,
} from 'unocss';

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify,
    presetIcons({
      collections: {
        'circle-flags': () =>
          import('@iconify-json/circle-flags/icons.json').then(
            (i) => i.default,
          ),
        ri: () => import('@iconify-json/ri/icons.json').then((i) => i.default),
        solar: () =>
          import('@iconify-json/solar/icons.json').then(
            (i) => i.default as any,
          ),
      },
      autoInstall: true,
    }),
    presetRemToPx({
      baseFontSize: 4,
    }),
    presetMini(),
  ],
  shortcuts: [
    // shortcuts to multiple utilities
    [
      'btn',
      'px-6 py-3 rounded-3 border-none inline-block bg-green-400 text-white cursor-pointer !outline-none hover:bg-green-600 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    ],
  ],
});
