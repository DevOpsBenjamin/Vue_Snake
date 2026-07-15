// SVG Assets as strings. These can easily be replaced by real SVG files later.

export const svgAmbuHead = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="10" width="56" height="44" rx="8" fill="white" stroke="#333" stroke-width="2"/>
  <!-- Front windshield -->
  <rect x="40" y="15" width="16" height="34" rx="4" fill="#87CEFA"/>
  <!-- Red cross -->
  <rect x="18" y="26" width="12" height="12" fill="red"/>
  <rect x="22" y="22" width="4" height="20" fill="red"/>
  <rect x="14" y="30" width="20" height="4" fill="red"/>
  <!-- Headlights -->
  <circle cx="58" cy="20" r="3" fill="yellow"/>
  <circle cx="58" cy="44" r="3" fill="yellow"/>
</svg>
`;

// @ts-ignore
import svgAmbuBody from '@/assets/svg/body.svg?raw';


// @ts-ignore
import svgPatientBonus from '@/assets/svg/patient.svg?raw';

export const svgBackground = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="#a8e6cf"/>
  <path d="M0,0 L64,64 M64,0 L0,64" stroke="#95d1bc" stroke-width="1" opacity="0.5"/>
</svg>
`;

export function createSvgImage(svgString: string): HTMLImageElement {
  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.src = url;
  return img;
}

export const images = {
  head: createSvgImage(svgAmbuHead),
  body: createSvgImage(svgAmbuBody),
  bonus: createSvgImage(svgPatientBonus),
  bg: createSvgImage(svgBackground),
};
