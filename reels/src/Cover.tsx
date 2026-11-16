import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import { brand } from './brand';
import type { ReelData } from './types';

// Vorschaubild (Cover) für Instagram/Facebook/LinkedIn, 1080x1920.
// Profilraster schneidet auf 3:4 (y 240–1680), Feed teils auf 1:1 (y 420–1500):
// Kategorie, Titel und Akzent liegen deshalb in der Mitte, Logo im 3:4-Bereich.
const F = brand.farben;
const FONT = brand.schrift;

const formatFarbe: Record<ReelData['format'], string> = {
  mythos: F.rot,
  'nein-vs-ja': F.rot,
  'it-sicherheit': F.rot,
  kundenfrage: F.gruen,
  aktuell: F.lime,
  vorstellung: F.gruen,
};

const fit = (text: string, max: number, breite: number) => {
  const len = Math.max(...text.split('\n').map((z) => z.length));
  return Math.min(max, Math.floor(breite / (len * 0.62)));
};

export const Cover: React.FC<ReelData> = (props) => {
  const c = props.cover ?? { kategorie: props.format, titel: props.titel };
  const glow = formatFarbe[props.format];
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 48%, ${glow}55 0%, ${F.bg} 62%)`,
        backgroundColor: F.bg,
        fontFamily: FONT,
      }}
    >
      <Img
        src={staticFile(brand.logo)}
        style={{ position: 'absolute', top: 290, left: 0, right: 0, margin: '0 auto', width: 380 }}
      />
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 440,
          bottom: 440,
          padding: '0 90px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: F.lime,
            color: F.bg,
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: 2,
            textTransform: 'uppercase',
            padding: '14px 34px',
            borderRadius: 999,
            marginBottom: 54,
          }}
        >
          {c.kategorie}
        </div>
        <div
          style={{
            color: F.text,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1.04,
            fontSize: fit(c.titel, 132, 900),
          }}
        >
          {c.titel.split('\n').map((z, i) => (
            <div key={i}>{z}</div>
          ))}
        </div>
        {c.akzent && (
          <div
            style={{
              marginTop: 40,
              color: F.lime,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1.1,
              fontSize: fit(c.akzent, 76, 900),
            }}
          >
            {c.akzent}
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 300,
          width: '100%',
          textAlign: 'center',
          color: F.leise,
          fontWeight: 700,
          fontSize: 40,
        }}
      >
        {brand.url}
      </div>
    </AbsoluteFill>
  );
};
