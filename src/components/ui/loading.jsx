import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ height, width, color = '#ffffff' }) => (
  <ReactLoading type="spin" color={color} height={height} width={width} />
);

export default Loading;
