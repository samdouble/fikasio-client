import React from 'react';
import loading from '../../images/loading.gif';
import './style.scss';

const LoadingGif = () => {
  return (
    <div>
      <img
        src={loading}
        alt="loading"
        width="200"
        className="loading_image"
      />
    </div>
  );
}

export default LoadingGif;
