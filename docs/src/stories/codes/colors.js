import common from './common';

export const fillColor = common(`<ImageMapper src={URL} map={MAP} />;`);

export const inArrayFillColor = common(`<ImageMapper src={URL} map={MAP} />;`);

export const dynamicFillColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      fillColor={props.fillColor} // dynamic fill color
   />
  )`);

export const dynamicMixArrayFillColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      fillColor={props.fillColor} // dynamic fill color
   />
  )`);

export const strokeColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      lineWidth={2}
   />
  )`);

export const inArrayStrokeColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      lineWidth={2}
   />
  )`);

export const dynamicStrokeColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      strokeColor={props.strokeColor} // dynamic stroke color
      lineWidth={props.lineWidth} // dynamic stroke line width
   />
  )`);

export const dynamicMixArrayStrokeColor = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      strokeColor={props.strokeColor} // dynamic stroke color
      lineWidth={props.lineWidth} // dynamic stroke line width
   />
  )`);
