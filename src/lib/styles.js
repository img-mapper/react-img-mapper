const absPos = {
  position: "absolute",
  top: 0,
  left: 0
};

const styles = props => {
  return ({
    container: {
      position: "relative"
    },
    canvas: {
      ...absPos,
      pointerEvents: "none",
      zIndex: 2
    },
    img: {
      ...absPos,
      zIndex: 1,
      userSelect: "none"
    },
    map: (
      props?.onClick && {
        cursor: "pointer"
      }) || undefined
  });
}

export default styles;
