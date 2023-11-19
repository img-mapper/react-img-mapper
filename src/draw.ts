import type { CTX } from '@/types';

const drawRect = (
  scaledCoords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  const [left, top, right, bot] = scaledCoords;
  ctx.current.fillStyle = fillColor;
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.strokeRect(left, top, right - left, bot - top);
  ctx.current.fillRect(left, top, right - left, bot - top);
};

const drawCircle = (
  scaledCoords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  ctx.current.fillStyle = fillColor;
  ctx.current.beginPath();
  ctx.current.lineWidth = lineWidth;
  ctx.current.strokeStyle = strokeColor;
  ctx.current.arc(scaledCoords[0], scaledCoords[1], scaledCoords[2], 0, 2 * Math.PI);
  ctx.current.closePath();
  ctx.current.stroke();
  ctx.current.fill();
};

const drawPoly = (
  scaledCoords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
) => {
  const newCoords = scaledCoords.reduce(
    (a, v, i, s) => (i % 2 ? a : [...a, s.slice(i, i + 2)]),
    []
  );
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
  scaledCoords: number[],
  fillColor: string,
  lineWidth: number,
  strokeColor: string,
  ctx: CTX
): void | boolean => {
  if (shape === 'rect') {
    drawRect(scaledCoords, fillColor, lineWidth, strokeColor, ctx);
    return true;
  }
  if (shape === 'circle') {
    drawCircle(scaledCoords, fillColor, lineWidth, strokeColor, ctx);
    return true;
  }
  if (shape === 'poly') {
    drawPoly(scaledCoords, fillColor, lineWidth, strokeColor, ctx);
    return true;
  }
  return false;
};

export default callingFn;
