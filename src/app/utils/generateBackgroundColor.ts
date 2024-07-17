import chroma from "chroma-js";

export default function generateBackgroundColor(
  foregroundColor: string
): string {
  const foregroundColorChroma = chroma(foregroundColor);

  const backgroundColorChroma = foregroundColorChroma.luminance(0.9);

  const backgroundColor = backgroundColorChroma.hex();

  return backgroundColor;
}
