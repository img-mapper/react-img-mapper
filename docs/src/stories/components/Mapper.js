import React, { Fragment, useState } from 'react';
import ImageMapper from 'react-img-mapper';
import url from '../../assets/example.jpg';
import areasJSON from '../../assets/example.json';

const Mapper = props => {
  const { customJSON, customType, isOnChangeNeeded, TopComponent, BottomComponent } = props;

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

    if (customJSON === 2) {
      return areasJSON.map(cur => {
        const temp = { ...cur };

        if (['Refrigerator', 'Window'].includes(cur.title)) {
          if (customType === 'active') {
            temp.active = false;
          }

          if (customType === 'disabled') {
            temp.disabled = true;
          }

          return temp;
        }

        return temp;
      });
    }

    return areasJSON;
  };

  const [areas, setAreas] = useState(getJSON);

  const resetAreas = () => setAreas(getJSON());

  return (
    <Fragment>
      {TopComponent && <TopComponent resetAreas={resetAreas} />}
      <ImageMapper
        src={url}
        name="my-map"
        areas={areas}
        onChange={(_, areas) => (isOnChangeNeeded ? setAreas(areas) : null)}
        {...props}
      />
      {BottomComponent && <BottomComponent resetAreas={resetAreas} />}
    </Fragment>
  );
};

export default Mapper;
