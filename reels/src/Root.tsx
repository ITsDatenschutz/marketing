import React from 'react';
import { Composition } from 'remotion';
import { Reel } from './Reel';
import { FPS, sek, type ReelData } from './types';
import beispiel from '../../content/reels/2026-10-20-nein-vs-ja.json';

export const Root: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    fps={FPS}
    width={1080}
    height={1920}
    durationInFrames={450}
    defaultProps={beispiel as ReelData}
    calculateMetadata={({ props }) => ({
      durationInFrames: props.szenen.reduce((sum, s) => sum + sek(s.dauer), 0),
    })}
  />
);
