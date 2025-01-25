import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ImageMapper from 'react-img-mapper';
import URL from '../../assets/example.jpg';
import areasJSON from '../../assets/example.json';

const DynamicMapper = props => {
  const MAP = {
    name: 'my-map',
    areas: areasJSON.map(cur => {
      const temp = { ...cur };
      if (['Front Wall', 'Window'].includes(cur.title)) {
        delete temp.fillColor;
        delete temp.strokeColor;
        return temp;
      }
      return temp;
    }),
  };

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
      <ImageMapper src={URL} map={MAP} {...props} />
    </Fragment>
  );
};

DynamicMapper.defaultProps = {
  width: 640,
  height: 480,
  lineWidth: 1,
  active: true,
  disabled: false,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  natural: false,
  imgWidth: 0,
  stayHighlighted: false,
  stayMultiHighlighted: false,
  toggleHighlighted: false,
  parentWidth: 640,
  responsive: false,
};

DynamicMapper.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  lineWidth: PropTypes.number,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  fillColor: PropTypes.string,
  imgWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  natural: PropTypes.bool,
  stayHighlighted: PropTypes.bool,
  stayMultiHighlighted: PropTypes.bool,
  toggleHighlighted: PropTypes.bool,
  parentWidth: PropTypes.number,
  responsive: PropTypes.bool,
};

export default DynamicMapper;
