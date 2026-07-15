// SVG Assets as strings. These can easily be replaced by real SVG files later.

// @ts-ignore
import svgAmbuHead from '@/assets/svg/head.svg?raw';

// @ts-ignore
import svgAmbuBody from '@/assets/svg/body.svg?raw';


// @ts-ignore
import svgPatientBonus from '@/assets/svg/patient.svg?raw';

// @ts-ignore
import imgSnakeBg from '@/assets/SnakeBg.png';

export function createSvgImage(svgString: string): HTMLImageElement {
  const img = new Image();
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  img.src = url;
  return img;
}

export function createPngImage(srcString: string): HTMLImageElement {
  const img = new Image();
  img.src = srcString;
  return img;
}

export const images = {
  head: createSvgImage(svgAmbuHead),
  body: createSvgImage(svgAmbuBody),
  bonus: createSvgImage(svgPatientBonus),
  bg: createPngImage(imgSnakeBg),
};
