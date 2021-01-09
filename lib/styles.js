"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const absPos = {
  position: "absolute",
  top: 0,
  left: 0
};

const styles = props => {
  return {
    container: {
      position: "relative"
    },
    canvas: { ...absPos,
      pointerEvents: "none",
      zIndex: 2
    },
    img: { ...absPos,
      zIndex: 1,
      userSelect: "none"
    },
    map: (props === null || props === void 0 ? void 0 : props.onClick) && {
      cursor: "pointer"
    } || undefined
  };
};

var _default = styles;
exports.default = _default;
