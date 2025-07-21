


export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  css: string;
  name?: string;
}

export interface ColorTheme {
  id: string;
  name: string;
  colors: ColorInfo[];
  css: string;
}

export interface GradientInfo {
  id: string;
  name: string;
  colors: string[];
  css: string;
  type: 'linear' | 'radial';
  direction?: string;
}

// Global set to track all generated hex colors across all categories
const globalUsedHexes = new Set<string>();

// Convert HSL to RGB
export const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { r: gray, g: gray, b: gray };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  
  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255)
  };
};

// Convert RGB to HEX
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

// Generate color shades for pagination (much more efficient)
export const generateColorShades = (baseHue: number, count: number = 50, startIndex: number = 0): ColorInfo[] => {
  const colors: ColorInfo[] = [];
  let attempts = 0;
  const maxAttempts = count * 5;
  
  // White variations (very light colors only)
  if (baseHue === -1) {
    let i = startIndex;
    while (colors.length < count && attempts < maxAttempts) {
      const lightness = 85 + (i % 15); // 85-99% lightness (only very light)
      const saturation = Math.floor(i / 15) % 20; // 0-19% saturation
      const hue = Math.floor(i / 300) % 360;
      
      const rgb = hslToRgb(hue, saturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      // Skip duplicate check for pagination efficiency
      colors.push({
        hex,
        rgb,
        hsl: { h: hue, s: saturation, l: lightness },
        css: `background-color: ${hex};`
      });
      
      i++;
      attempts++;
    }
  } 
  // Black variations (very dark colors only)
  else if (baseHue === -2) {
  let i = startIndex;
  const hueStep = 47;         // Prime step to spread hue well
  const lightStep = 3.7;      // Lightness from 2% to 20%
  const satStep = 5.3;        // Saturation from 4% to 30%
  
  while (colors.length < count && attempts < maxAttempts) {
    const hue = (i * hueStep) % 360;
    const lightness = 2 + (Math.floor(i * lightStep) % 18);  // 2% to 20%
    const saturation = 4 + (Math.floor(i * satStep) % 26);   // 4% to 30%
    
    const rgb = hslToRgb(hue, saturation, lightness);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    // Push directly
    colors.push({
      hex,
      rgb,
      hsl: { h: hue, s: saturation, l: lightness },
      css: `background-color: ${hex};`
    });

    i++;
    attempts++;
  }
}

  // Gray variations (medium lightness, low saturation)
  else if (baseHue === -3) {
    let i = startIndex;
    while (colors.length < count && attempts < maxAttempts) {
      const lightness = 25 + ((i % 50) * 1.0); // 25-75% lightness (avoid very dark/light)
      const saturation = Math.floor(i / 50) % 15; // 0-14% saturation (grays)
      const hue = Math.floor(i / 750) % 360;
      
      const rgb = hslToRgb(hue, saturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      // Skip duplicate check for pagination efficiency
      colors.push({
        hex,
        rgb,
        hsl: { h: hue, s: saturation, l: lightness },
        css: `background-color: ${hex};`
      });
      
      i++;
      attempts++;
    }
  } 
  // Regular color variations (avoid very dark/light to prevent overlap)
  else {
    let i = startIndex;
    while (colors.length < count && attempts < maxAttempts) {
      // Tighter hue range to stay within color family
      const hueVariation = baseHue + ((i % 20) - 10); // ±10 degree variation
      // Avoid very high and very low saturation/lightness to prevent overlap with white/black/gray
      const saturation = 30 + (Math.floor(i / 20) % 71); // 30-100% saturation (avoid low saturation)
      const lightness = 25 + (Math.floor(i / 1420) % 55); // 25-79% lightness (avoid very dark/light)
      
      // Normalize hue to 0-360
      const normalizedHue = ((hueVariation % 360) + 360) % 360;
      
      const rgb = hslToRgb(normalizedHue, saturation, lightness);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      
      // Skip duplicate check for pagination efficiency
      colors.push({
        hex,
        rgb,
        hsl: { h: normalizedHue, s: saturation, l: lightness },
        css: `background-color: ${hex};`
      });
      
      i++;
      attempts++;
    }
  }

  return colors;
};

// Helper function to safely get a color shade
const getSafeColorShade = (hue: number, attempts: number = 0): ColorInfo | null => {
  if (attempts > 5) return null; // Prevent infinite recursion
  
  const shades = generateColorShades(hue, 1);
  if (shades.length > 0) {
    return shades[0];
  }
  
  // If no shade was generated, try with slightly different hue
  return getSafeColorShade(hue + Math.random() * 10 - 5, attempts + 1);
};

// Generate color themes
export const generateColorThemes = (colorCount: number): ColorTheme[] => {
  const themes: ColorTheme[] = [];
  const baseColors = [0, 30, 60, 120, 180, 240, 300]; // Red, Orange, Yellow, Green, Cyan, Blue, Magenta

  // 2-color combinations
  for (let i = 0; i < baseColors.length; i++) {
    for (let j = i + 1; j < baseColors.length; j++) {
      const color1 = getSafeColorShade(baseColors[i]);
      const color2 = getSafeColorShade(baseColors[j]);
      
      if (color1 && color2) {
        const colors = [color1, color2];
        
        themes.push({
          id: `theme-2-${i}-${j}`,
          name: `Duo Theme ${i + 1}-${j + 1}`,
          colors,
          css: colors.map((c, idx) => `--color-${idx + 1}: ${c.hex};`).join(' ')
        });
      }
    }
  }

  // Generate more complex themes (3-6 colors)
  for (let colorNum = 3; colorNum <= 6; colorNum++) {
    const combinations = generateCombinations(baseColors, colorNum);
    
    combinations.slice(0, Math.floor(colorCount / (colorNum - 1))).forEach((combo, idx) => {
      const colors: ColorInfo[] = [];
      
      // Safely get colors for each hue in the combination
      for (const hue of combo) {
        const color = getSafeColorShade(hue);
        if (color) {
          colors.push(color);
        }
      }
      
      // Only create theme if we have colors
      if (colors.length > 0) {
        themes.push({
          id: `theme-${colorNum}-${idx}`,
          name: `${colorNum}-Color Theme ${idx + 1}`,
          colors,
          css: colors.map((c, cidx) => `--color-${cidx + 1}: ${c.hex};`).join(' ')
        });
      }
    });
  }

  return themes;
};

// Generate combinations helper
const generateCombinations = (arr: number[], size: number): number[][] => {
  if (size === 1) return arr.map(item => [item]);
  if (size === arr.length) return [arr];
  
  const combinations: number[][] = [];
  
  for (let i = 0; i <= arr.length - size; i++) {
    const head = arr[i];
    const tailCombinations = generateCombinations(arr.slice(i + 1), size - 1);
    
    tailCombinations.forEach(tail => {
      combinations.push([head, ...tail]);
    });
  }
  
  return combinations;
};

// Generate gradients
export const generateGradients = (count: number = 10000): GradientInfo[] => {
  const gradients: GradientInfo[] = [];
  const baseColors = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const directions = ['to right', 'to left', 'to bottom', 'to top', '45deg', '135deg', '225deg', '315deg'];

  let id = 0;

  // Linear gradients
  for (let i = 0; i < baseColors.length && id < count; i++) {
    for (let j = i + 1; j < baseColors.length && id < count; j++) {
      for (const direction of directions) {
        if (id >= count) break;
        
        const color1 = hslToRgb(baseColors[i], 70, 60);
        const color2 = hslToRgb(baseColors[j], 70, 60);
        const hex1 = rgbToHex(color1.r, color1.g, color1.b);
        const hex2 = rgbToHex(color2.r, color2.g, color2.b);
        
        gradients.push({
          id: `gradient-${id}`,
          name: `Gradient ${id + 1}`,
          colors: [hex1, hex2],
          css: `background: linear-gradient(${direction}, ${hex1}, ${hex2});`,
          type: 'linear',
          direction
        });
        
        id++;
      }
    }
  }

  // Multi-color gradients
  for (let colorCount = 3; colorCount <= 5 && id < count; colorCount++) {
    const combinations = generateCombinations(baseColors, colorCount);
    
    for (const combo of combinations.slice(0, Math.floor((count - id) / (6 - colorCount)))) {
      if (id >= count) break;
      
      for (const direction of directions.slice(0, 4)) {
        if (id >= count) break;
        
        const colors = combo.map(hue => {
          const rgb = hslToRgb(hue, 70, 60);
          return rgbToHex(rgb.r, rgb.g, rgb.b);
        });
        
        gradients.push({
          id: `gradient-${id}`,
          name: `Multi Gradient ${id + 1}`,
          colors,
          css: `background: linear-gradient(${direction}, ${colors.join(', ')});`,
          type: 'linear',
          direction
        });
        
        id++;
      }
    }
  }

  return gradients;
};

// Main color categories with proper hue separation
export const MAIN_COLORS = [
  { name: 'White', hue: -1, emoji: '⚪' },
  { name: 'Black', hue: -2, emoji: '⚫' },
  { name: 'Gray', hue: -3, emoji: '⚫' },
  { name: 'Red', hue: 0, emoji: '🔴' },
  { name: 'Maroon', hue: 15, emoji: '🔴' },
  { name: 'Brown', hue: 25, emoji: '🤎' },
  { name: 'Orange', hue: 30, emoji: '🟠' },
  { name: 'Gold', hue: 45, emoji: '🟡' },
  { name: 'Yellow', hue: 60, emoji: '🟡' },
  { name: 'Lime', hue: 90, emoji: '🟢' },
  { name: 'Green', hue: 120, emoji: '🟢' },
  { name: 'Emerald', hue: 150, emoji: '💚' },
  { name: 'Teal', hue: 180, emoji: '🩵' },
  { name: 'Cyan', hue: 200, emoji: '🩵' },
  { name: 'Sky', hue: 220, emoji: '🔵' },
  { name: 'Blue', hue: 240, emoji: '🔵' },
  { name: 'Indigo', hue: 260, emoji: '💙' },
  { name: 'Purple', hue: 280, emoji: '🟣' },
  { name: 'Violet', hue: 300, emoji: '🟣' },
  { name: 'Pink', hue: 320, emoji: '🩷' },
  { name: 'Rose', hue: 340, emoji: '🌹' }
];

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

// Function to clear global hex cache (useful for testing or resetting)
export const clearGlobalColorCache = () => {
  globalUsedHexes.clear();
};