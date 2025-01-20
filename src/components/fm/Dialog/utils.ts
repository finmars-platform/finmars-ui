export function determineWindowWidth({
  width,
  style,
  defaultValue = 380
}: {
  width?: string | number;
  style?: Record<string, string>;
  defaultValue?: number;
}): string {
  if (width) {
    const widthAsNumber = Number(width);
    if (Number.isNaN(widthAsNumber)) {
      return width as string;
    }

    return `${widthAsNumber}px`;
  }

  if (style?.width) {
    return style.width as string;
  }

  return `${defaultValue}px`;
}

s;
