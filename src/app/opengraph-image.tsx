import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'Angel Metal & Alloys';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0a1628, #112240)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
        }}
      >
        {/* Brand Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Mock Logo using Text since we don't have a static buffer here easily */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              borderRadius: '24px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid #cda85c',
              marginBottom: '40px',
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#cda85c',
            }}
          >
            A
          </div>
          
          <div style={{ fontSize: 64, fontWeight: 'bold', color: 'white', marginBottom: '20px', textAlign: 'center' }}>
            ANGEL METAL <span style={{ color: '#cda85c' }}>&amp; ALLOYS</span>
          </div>
          
          <div style={{ fontSize: 32, color: '#94a3b8', textAlign: 'center', maxWidth: '800px', lineHeight: 1.4 }}>
            Manufacturer & Exporter of Stainless Steel/Carbon Steel Pipe Fittings, Flanges & Forged Components
          </div>
        </div>

        {/* Footer info */}
        <div style={{ 
          position: 'absolute', 
          bottom: 40, 
          display: 'flex', 
          width: '100%', 
          justifyContent: 'center', 
          gap: '40px',
          color: '#cda85c',
          fontSize: 24,
          fontWeight: 'bold'
        }}>
          <span>Ahmedabad, India</span>
          <span>•</span>
          <span>ISO Certified</span>
          <span>•</span>
          <span>Worldwide Export</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
