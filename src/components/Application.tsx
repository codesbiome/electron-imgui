import React from 'react';
import { hot } from 'react-hot-loader';
import { ImGuiRenderer } from '@src/app/ImGuiRenderer';
import './Application.less';

const Application: React.FC = () => {

  React.useEffect(() => {
    const renderer = new ImGuiRenderer();
    const canvas = document.getElementById('EmGuiCanvas') as HTMLCanvasElement;
    renderer.Setup(canvas);
  }, []);

  return (
    <React.Fragment>
      <canvas id="EmGuiCanvas" style={{ width: '100%', height: '100%' }}></canvas>
    </React.Fragment>
  );
};

export default hot(module)(Application);
