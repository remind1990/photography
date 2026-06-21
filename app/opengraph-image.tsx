import { ImageResponse } from 'next/og';

// File-based OpenGraph image: Next renders this once at build time and serves it
// as og:image / twitter:image for every route. Replaces the missing og-image.jpg.
export const runtime = 'edge';
export const alt =
  "Dubenko Photography — Photographer in St. John's, Newfoundland";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #1c1917 0%, #44403c 55%, #78716c 100%)',
          color: '#fafaf9',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: -1,
            textAlign: 'center',
            padding: '0 60px',
          }}
        >
          Dubenko Photography
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 38,
            color: '#fed7aa',
            textAlign: 'center',
          }}
        >
          Photographer in St. John&apos;s, Newfoundland
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 26,
            color: '#e7e5e4',
          }}
        >
          Individual · Family · Love story
        </div>
      </div>
    ),
    { ...size }
  );
}
