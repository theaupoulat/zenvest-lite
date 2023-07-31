import { Config } from 'tailwindcss';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import formsPlugin from '@tailwindcss/forms';

const config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [aspectRatioPlugin, formsPlugin],
} satisfies Config;

export default config;
