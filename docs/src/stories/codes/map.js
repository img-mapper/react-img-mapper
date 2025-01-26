import common from './common';

export const nonResponsiveDimensions = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      width={props.width} // dynamic width
      height={props.height} // dynamic height
      imageWidth={props.imageWidth} // dynamic imageWidth
      natural={props.natural} // dynamic natural
   />
  )`);

export const responsiveDimensions = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      responsive
      parentWidth={props.parentWidth} // dynamic parentWidth
   />
  )`);

export const allDimensions = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      width={props.width} // dynamic width
      height={props.height} // dynamic height
      imgWidth={props.imgWidth} // dynamic imgWidth
      natural={props.natural} // dynamic natural
      responsive={props.responsive} // dynamic responsive
      parentWidth={props.parentWidth} // dynamic parentWidth
   />
  )`);
