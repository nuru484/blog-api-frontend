import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ height, width }) => (
  <ReactLoading type="spin" color="#ffffff" height={height} width={width} />
);

export default Loading;
