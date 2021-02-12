const absPos = {
  position: 'absolute',
  top: 0,
  left: 0,
};

const imgNonResponsive = {
  ...absPos,
  zIndex: 1,
  userSelect: 'none',
};

const imgResponsive = {
  ...imgNonResponsive,
  width: '100%',
  height: 'auto',
};

const styles = props => ({
  container: {
    position: 'relative',
  },
  canvas: {
    ...absPos,
    pointerEvents: 'none',
    zIndex: 2,
  },
  img: props?.responsive ? imgResponsive : imgNonResponsive,
  map:
    (props?.onClick && {
      cursor: 'pointer',
    }) ||
    undefined,
});

export default styles;
