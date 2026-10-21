import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Series,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import { brand } from './brand';
import {
  sek,
  type EndScene,
  type HookScene,
  type KartenScene,
  type ListeScene,
  type ReelData,
  type Scene,
  type StatementScene,
} from './types';

const F = brand.farben;
const FONT = brand.schrift;
const HEAD = { fontFamily: FONT, fontWeight: 900, letterSpacing: -2 } as const;
const BODY = { fontFamily: FONT } as const;
// Schriftgröße automatisch an die längste Zeile anpassen (Montserrat Black ≈ 0,66 em pro Zeichen)
const fit = (text: string, max: number, breite: number) => {
  const len = Math.max(...text.split('\n').map((z) => z.length));
  return Math.min(max, Math.floor(breite / (len * 0.58)));
};
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const Zeilen: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split('\n').map((z, i, a) => (
      <React.Fragment key={i}>
        {z}
        {i < a.length - 1 && <br />}
      </React.Fragment>
    ))}
  </>
);

// Instagram/LinkedIn-Safe-Zone: oben 260px, unten 540px, rechts 150px frei
const Safe: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill
    style={{
      padding: '260px 150px 540px 90px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    {children}
  </AbsoluteFill>
);

const usePop = (delay = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, stiffness: 180 } });
};

const Kreis: React.FC<{ zeichen: string; farbe: string; size?: number }> = ({ zeichen, farbe, size = 92 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      background: farbe,
      color: F.bg,
      ...HEAD,
      letterSpacing: 0,
      fontSize: size * 0.62,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {zeichen}
  </div>
);

/* ---------- hook ---------- */
const Hook: React.FC<{ s: HookScene }> = ({ s }) => {
  const frame = useCurrentFrame();
  const label = usePop(0, 20);
  const stamp = usePop(12, 9);
  return (
    <Safe>
      <div
        style={{
          ...BODY,
          fontWeight: 700,
          fontSize: 46,
          color: F.leise,
          opacity: label,
          transform: `translateY(${(1 - label) * 30}px)`,
          marginBottom: 50,
        }}
      >
        {s.frage}
      </div>
      <div
        style={{
          ...HEAD,
          fontSize: fit(s.stempel, 124, 740),
          lineHeight: 1.02,
          color: F.rot,
          transform: `scale(${interpolate(stamp, [0, 1], [2.2, 1])}) rotate(${interpolate(stamp, [0, 1], [-14, -4])}deg)`,
          opacity: interpolate(stamp, [0, 0.3], [0, 1], clamp),
          transformOrigin: 'left center',
          border: `10px solid ${F.rot}`,
          borderRadius: 24,
          padding: '30px 40px',
          alignSelf: 'flex-start',
        }}
      >
        <Zeilen text={s.stempel} />
      </div>
      {s.nachsatz && (
        <div style={{ marginTop: 60, ...BODY, fontSize: 40, color: F.text, opacity: interpolate(frame, [40, 55], [0, 0.8], clamp) }}>
          {s.nachsatz}
        </div>
      )}
    </Safe>
  );
};

/* ---------- liste ---------- */
const Punkt: React.FC<{ text: string; delay: number; art: 'nein' | 'ja' }> = ({ text, delay, art }) => {
  const frame = useCurrentFrame();
  const p = usePop(delay, 10);
  const shake = art === 'nein' && frame - delay >= 0 && frame - delay < 6 ? Math.sin((frame - delay) * 3) * 8 : 0;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 30,
        marginBottom: 46,
        opacity: interpolate(p, [0, 0.2], [0, 1], clamp),
        transform: `translateX(${(1 - p) * -200 + shake}px)`,
      }}
    >
      <Kreis zeichen={art === 'nein' ? '✕' : '✓'} farbe={art === 'nein' ? F.rot : F.lime} />
      <div style={{ ...HEAD, fontSize: fit(text, 72, 720), color: F.text, lineHeight: 1.05 }}>{text}</div>
    </div>
  );
};

const Liste: React.FC<{ s: ListeScene }> = ({ s }) => {
  const frame = useCurrentFrame();
  const fazitStart = s.punkte.length * 18 + 4;
  return (
    <Safe>
      {s.punkte.map((p, i) => (
        <Punkt key={i} text={p} delay={i * 18} art={s.art} />
      ))}
      {s.fazit && (
        <div
          style={{
            marginTop: 40,
            ...BODY,
            fontWeight: 700,
            fontSize: 44,
            color: F.leise,
            opacity: interpolate(frame, [fazitStart, fazitStart + 12], [0, 1], clamp),
          }}
        >
          {s.fazit}
        </div>
      )}
    </Safe>
  );
};

/* ---------- statement ---------- */
const Statement: React.FC<{ s: StatementScene }> = ({ s }) => {
  const frame = useCurrentFrame();
  const bg = s.farbe === 'lime' ? F.lime : s.farbe === 'rot' ? F.rot : F.gruen;
  const fg = s.farbe === 'lime' ? F.bg : F.text;
  const x = interpolate(frame, [0, 12], [100, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const t = usePop(8, 11);
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}%)`, background: bg }}>
      <Safe>
        <div
          style={{
            ...HEAD,
            fontSize: fit(s.text, 136, 840),
            lineHeight: 1,
            color: fg,
            opacity: t,
            transform: `scale(${interpolate(t, [0, 1], [0.7, 1])})`,
            transformOrigin: 'left center',
          }}
        >
          <Zeilen text={s.text} />
        </div>
      </Safe>
    </AbsoluteFill>
  );
};

/* ---------- karten ---------- */
const Karte: React.FC<{ frage: string; antwort: string; delay: number }> = ({ frage, antwort, delay }) => {
  const p = usePop(delay, 13);
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `3px solid ${F.lime}`,
        borderRadius: 32,
        padding: '34px 40px',
        marginBottom: 32,
        display: 'flex',
        gap: 30,
        alignItems: 'center',
        opacity: interpolate(p, [0, 0.3], [0, 1], clamp),
        transform: `translateY(${(1 - p) * 80}px)`,
      }}
    >
      <Kreis zeichen="✓" farbe={F.lime} size={84} />
      <div>
        <div style={{ ...HEAD, fontSize: fit(frage, 52, 600), color: F.text }}>{frage}</div>
        <div style={{ ...BODY, fontSize: 37, color: F.text, opacity: 0.85, marginTop: 6 }}>{antwort}</div>
      </div>
    </div>
  );
};

const Karten: React.FC<{ s: KartenScene }> = ({ s }) => {
  const h = usePop(0, 14);
  return (
    <Safe>
      <div style={{ ...HEAD, fontSize: 86, lineHeight: 1.05, color: F.text, marginBottom: 50, opacity: h, transform: `translateY(${(1 - h) * 40}px)` }}>
        <Zeilen text={s.titel} />
        {s.titelAkzent && (
          <>
            <br />
            <span style={{ color: F.lime }}>{s.titelAkzent}</span>
          </>
        )}
      </div>
      {s.karten.slice(0, 3).map((k, i) => (
        <Karte key={i} frage={k.frage} antwort={k.antwort} delay={20 + i * 22} />
      ))}
    </Safe>
  );
};

/* ---------- ende ---------- */
const Ende: React.FC<{ s: EndScene }> = ({ s }) => {
  const frame = useCurrentFrame();
  const a = usePop(0, 14);
  const n = usePop(14, 14);
  const c = usePop(28, 10);
  const pulse = 1 + Math.sin(Math.max(0, frame - 40) / 5) * 0.025;
  return (
    <Safe>
      <div style={{ ...HEAD, fontSize: 108, lineHeight: 1.02, color: F.text, opacity: a, transform: `translateY(${(1 - a) * 40}px)` }}>
        <Zeilen text={s.claim ?? brand.claim} />
        <br />
        <span style={{ color: F.lime }}>{s.claimAkzent ?? brand.claimAkzent}</span>
      </div>
      <div style={{ marginTop: 70, opacity: n, transform: `translateY(${(1 - n) * 30}px)` }}>
        <Img src={staticFile(brand.logo)} style={{ width: 560, display: 'block' }} />
        <div style={{ ...BODY, fontWeight: 700, fontSize: 36, color: F.leise, marginTop: 24 }}>{brand.unterzeile}</div>
      </div>
      <div
        style={{
          marginTop: 60,
          alignSelf: 'flex-start',
          background: F.lime,
          color: F.bg,
          ...BODY,
          fontWeight: 800,
          fontSize: 44,
          padding: '28px 46px',
          borderRadius: 60,
          opacity: c,
          transform: `scale(${interpolate(c, [0, 1], [0.6, 1]) * pulse})`,
          transformOrigin: 'left center',
        }}
      >
        {brand.cta} →
      </div>
      <div style={{ marginTop: 26, ...BODY, fontWeight: 700, fontSize: 46, color: F.text, opacity: c }}>{brand.url}</div>
    </Safe>
  );
};

/* ---------- Hintergrund mit Stimmungs-Glow ---------- */
const istNegativ = (s: Scene) => s.typ === 'hook' || (s.typ === 'liste' && s.art === 'nein');

const Hintergrund: React.FC<{ szenen: Scene[] }> = ({ szenen }) => {
  const frame = useCurrentFrame();
  let t = 0;
  let glow: string = F.lime;
  for (const s of szenen) {
    if (frame < t + sek(s.dauer)) {
      glow = istNegativ(s) ? F.rot : F.lime;
      break;
    }
    t += sek(s.dauer);
  }
  return (
    <AbsoluteFill style={{ background: F.bg }}>
      <div
        style={{
          position: 'absolute',
          width: 1200,
          height: 1200,
          borderRadius: 600,
          background: glow,
          opacity: 0.12,
          filter: 'blur(160px)',
          left: -300 + Math.sin(frame / 40) * 80,
          top: 300 + Math.cos(frame / 50) * 120,
        }}
      />
    </AbsoluteFill>
  );
};

const SzeneView: React.FC<{ s: Scene }> = ({ s }) => {
  switch (s.typ) {
    case 'hook':
      return <Hook s={s} />;
    case 'liste':
      return <Liste s={s} />;
    case 'statement':
      return <Statement s={s} />;
    case 'karten':
      return <Karten s={s} />;
    case 'ende':
      return <Ende s={s} />;
  }
};

export const Reel: React.FC<ReelData> = ({ szenen }) => (
  <AbsoluteFill>
    <Hintergrund szenen={szenen} />
    <Series>
      {szenen.map((s, i) => (
        <Series.Sequence key={i} durationInFrames={sek(s.dauer)}>
          <SzeneView s={s} />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
