import { CTX } from './types';

const drawRect = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  const [left, top, right, bot] = coords;
  ctx.current.fillStyle = fillColor;
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.strokeRect(left, top, right - left, bot - top);
  ctx.current.fillRect(left, top, right - left, bot - top);
};

const drawCircle = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.arc(coords[0], coords[1], coords[2], 0, 2 * Math.PI);
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
};

const drawPoly = (
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  const newCoords = coords.reduce((a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]), []);
  // const first = newCoords.unshift();
  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;

  // ctx.current.moveTo(first[0], first[1]);
  newCoords.forEach(c => ctx.current.lineTo(c[0], c[1]));
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
};

const callingFn = (
  shape: string,
  coords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  isAreaActive: boolean,
  ctx: CTX
): void | boolean => {
  if (shape === 'rect' && isAreaActive) {
    return drawRect(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'circle' && isAreaActive) {
    return drawCircle(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  if (shape === 'poly' && isAreaActive) {
    return drawPoly(coords, fillColor, lineWidth, strokeColor, ctx);
  }
  return false;
};

export default callingFn;
