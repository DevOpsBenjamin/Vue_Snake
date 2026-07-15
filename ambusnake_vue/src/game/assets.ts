// SVG Assets as strings. These can easily be replaced by real SVG files later.

// @ts-ignore
import svgAmbuHead from '@/assets/svg/head.svg?raw';

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
