import type { DrawChosenShape, DrawShape, GetShape } from '@/types';

const drawRect: DrawChosenShape = (area, ctx) => {
  const { scaledCoords, fillColor, lineWidth, strokeColor } = area;
  const [left, top, right, bottom] = scaledCoords;

  ctx.current.fillStyle = fillColor;
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.strokeRect(left, top, right - left, bottom - top);
  ctx.current.fillRect(left, top, right - left, bottom - top);
  return true;
};

const drawCircle: DrawChosenShape = (area, ctx) => {
  const { scaledCoords, fillColor, lineWidth, strokeColor } = area;
  const [left, top, right] = scaledCoords;

  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.arc(left, top, right, 0, 2 * Math.PI);
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
  return true;
};

const drawPoly: DrawChosenShape = (area, ctx) => {
  const { scaledCoords, fillColor, lineWidth, strokeColor } = area;
  const groupCoords = scaledCoords.reduce<[number, number][]>((acc, val, index, array) => {
    if (index % 2) return acc;
    return [...acc, array.slice(index, index + 2)] as [number, number][];
  }, []);

  // const first = groupCoords.unshift();
  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;

  // ctx.current.moveTo(first[0], first[1]);
  groupCoords.forEach(([first, second]) => ctx.current.lineTo(first, second));
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
  return true;
};

const getShape: GetShape = shape => {
  if (shape === 'rect') return drawRect;
  if (shape === 'circle') return drawCircle;
  if (shape === 'poly') return drawPoly;
  return false;
};

const drawShape: DrawShape = (area, ctx) => {
  const { shape, ...restArea } = area;
  const shapeFn = getShape(shape);

  if (shapeFn && ctx.current instanceof CanvasRenderingContext2D) {
    const currentCtx = { current: ctx.current };
    return shapeFn(restArea, currentCtx);
  }

  return false;
};

export default drawShape;
