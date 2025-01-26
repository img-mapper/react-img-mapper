import React, { Fragment, useState } from 'react';
import ImageMapper from 'react-img-mapper';
import url from '../../assets/example.jpg';
import areasJSON from '../../assets/example.json';

const getAreas = () =>
  areasJSON.map(cur => {
    const temp = { ...cur };

    if (['Front Wall', 'Window'].includes(cur.title)) {
      delete temp.fillColor;
      delete temp.strokeColor;
      return temp;
    }

    return temp;
  });

const DynamicMapper = props => {
  const [areas, setAreas] = useState(getAreas);

  return (
    <Fragment>
      <div className="top_container">
        <h1 className="title">Dynamic All Properties Example</h1>
        <div className="top_content">
          <p>
            In this example, I have tried to merge all the{' '}
            <span className="tag">functionalities</span> that I have created till{' '}
            <span className="tag">now</span>.
            <br />
            <br />
            <span className="block">So just play with it and have fun 🤪</span>
          </p>
        </div>
      </div>
      <ImageMapper
        src={url}
        name="my-map"
        areas={areas}
        onChange={(_, newAreas) => setAreas(newAreas)}
        {...props}
      />
    </Fragment>
  );
};

export default DynamicMapper;
