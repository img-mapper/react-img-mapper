import React from 'react';
import ImageMapper from '../../lib/ImageMapper';
import URL from '../../assets/example.jpg';
import areasJSON from '../../assets/example.json';

const Mapper = props => {
  const { customJSON, customType } = props;

  const getJSON = () => {
    if (customJSON === 0) {
      return areasJSON.map(cur => {
        const temp = { ...cur };
        if (customType === 'fill') {
          delete temp.fillColor;
        }
        if (customType === 'stroke') {
          delete temp.fillColor;
          delete temp.strokeColor;
        }
        return temp;
      });
    }
    if (customJSON === 1) {
      return areasJSON.map(cur => {
        const temp = { ...cur };
        if (['Front Wall', 'Window'].includes(cur.title)) {
          if (customType === 'fill') {
            delete temp.fillColor;
          }
          if (customType === 'stroke') {
            delete temp.strokeColor;
          }
          return temp;
        }
        return temp;
      });
    }
    return areasJSON;
  };

  const MAP = {
    name: 'my-map',
    areas: getJSON(),
  };

  return <ImageMapper src={URL} map={MAP} {...props} />;
};

export default Mapper;
