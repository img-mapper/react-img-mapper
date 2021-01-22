import React from 'react';
import PropTypes from 'prop-types';
import ImageMapper from '../../lib/ImageMapper';
import URL from '../../assets/example.jpg';
import areasJSON from '../../assets/example.json';

const DynamicMapper = props => {
  const MAP = {
    name: 'my-map',
    areas: areasJSON,
  };

  return <ImageMapper src={URL} map={MAP} {...props} />;
};

DynamicMapper.defaultProps = {
  width: 0,
  height: 0,
  lineWidth: 1,
  active: true,
  fillColor: 'rgba(255, 255, 255, 0.5)',
  strokeColor: 'rgba(0, 0, 0, 0.5)',
  natural: false,
  imgWidth: 0,
  stayHighlighted: false,
  parentWidth: 0,
  responsive: false,
};

DynamicMapper.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  lineWidth: PropTypes.number,
  active: PropTypes.bool,
  fillColor: PropTypes.string,
  imgWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  natural: PropTypes.bool,
  stayHighlighted: PropTypes.bool,
  parentWidth: PropTypes.number,
  responsive: PropTypes.bool,
};

export default DynamicMapper;
