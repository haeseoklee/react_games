import React, {memo} from 'react';

const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = '#fbc400';
  } else if (number <= 20) {
    background = '#69c8f2';
  } else if (number <= 30) {
    background = '#ff7272';
  } else if (number <= 40) {
    background = '#aaa';
  } else {
    background = '#b0d840';
  }

  return (
    <div className="ball" style={{ background }}>{number}</div>
  )
});

export default Ball;