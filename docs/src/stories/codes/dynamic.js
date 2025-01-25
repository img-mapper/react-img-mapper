import common from './common';

export const dynamicAllProperties = common(`(
    <ImageMapper 
      src={URL} 
      map={MAP}
      active={props.active}
      width={props.width}
      height={props.height}
      fillColor={props.fillColor}
      strokeColor={props.strokeColor}
      lineWidth={props.lineWidth}
      imgWidth={props.imgWidth}
      natural={props.natural}
      stayHighlighted={props.stayHighlighted}
      stayMultiHighlighted={props.stayMultiHighlighted}
      toggleHighlighted={props.toggleHighlighted}
      parentWidth={props.parentWidth}
      responsive={props.responsive}
   />
  )`);
