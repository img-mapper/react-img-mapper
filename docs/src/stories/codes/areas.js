import common, { clearButtonTemplate, commonWithState, zoomTemplate } from './common';

export const showHighlightedArea = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      active={props.active} // dynamic active
   />
  )`);

export const inArrayShowHighlightedArea = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
    />
  )`);

export const disabledArea = common(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      disabled={props.disabled} // dynamic disabled
   />
  )`);

export const inArrayDisabledArea = inArrayShowHighlightedArea;

export const staySelectedHighlightedArea = commonWithState(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      onChange={(_, newAreas) => setAreas(newAreas)}
      isMulti={false}
   />
  )`);

export const stayMultipleSelectedHighlightedArea = commonWithState(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      onChange={(_, newAreas) => setAreas(newAreas)}
      isMulti
   />
  )`);

export const clearSelectedHighlightedArea = clearButtonTemplate;

export const toggleStayHighlightedArea = commonWithState(`(
    <ImageMapper 
      src={url} 
      name={name}
      areas={areas}
      onChange={(_, newAreas) => setAreas(newAreas)}
      isMulti={props.isMulti} // dynamic isMulti
      toggle={props.toggle} // dynamic toggle
   />
  )`);

export const zoomInZoomOutArea = zoomTemplate;
