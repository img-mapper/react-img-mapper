import common from './common';

export const dynamicAllProperties = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      isMulti={props.isMulti}
      toggle={props.toggle}
      active={props.active}
      disabled={props.disabled}
      fillColor={props.fillColor}
      strokeColor={props.strokeColor}
      lineWidth={props.lineWidth}
      imgWidth={props.imgWidth}
      width={props.width}
      height={props.height}
      natural={props.natural}
      responsive={props.responsive}
      parentWidth={props.parentWidth}
   />
  )`);
