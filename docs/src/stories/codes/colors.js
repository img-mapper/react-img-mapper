import common from './common';

export const fillColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
    />
  )`);

export const inArrayFillColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
    />
  )`);

export const dynamicFillColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      fillColor={props.fillColor} // dynamic fill color
   />
  )`);

export const dynamicMixArrayFillColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      fillColor={props.fillColor} // dynamic fill color
   />
  )`);

export const strokeColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      lineWidth={2}
   />
  )`);

export const inArrayStrokeColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      lineWidth={2}
   />
  )`);

export const dynamicStrokeColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      strokeColor={props.strokeColor} // dynamic stroke color
      lineWidth={props.lineWidth} // dynamic stroke line width
   />
  )`);

export const dynamicMixArrayStrokeColor = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      strokeColor={props.strokeColor} // dynamic stroke color
      lineWidth={props.lineWidth} // dynamic stroke line width
   />
  )`);
