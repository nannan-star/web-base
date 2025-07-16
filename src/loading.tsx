import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="loading-text">加载中...</div>
    </div>
  );
};

export default Loading;
