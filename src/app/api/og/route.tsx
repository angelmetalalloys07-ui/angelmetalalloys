import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Angel Metal & Alloys';
    const description = searchParams.get('description') || 'Manufacturer & Exporter of Stainless Steel Pipe Fittings, Flanges & Forged Components';

    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(to bottom right, #0a1628, #112240)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
            color: 'white',
            padding: '80px',
          }}
        >
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid #cda85c',
                marginRight: '24px',
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#cda85c',
              }}
            >
              A
            </div>
            <div style={{ fontSize: 32, fontWeight: 'bold', letterSpacing: '1px' }}>
              ANGEL METAL <span style={{ color: '#cda85c' }}>&amp; ALLOYS</span>
            </div>
          </div>
          
          <div style={{ fontSize: 64, fontWeight: 'bold', color: 'white', marginBottom: '24px', lineHeight: 1.2, maxWidth: '900px' }}>
            {title}
          </div>
          
          <div style={{ fontSize: 32, color: '#94a3b8', lineHeight: 1.4, maxWidth: '900px' }}>
            {description}
          </div>

          {/* Footer */}
          <div style={{ 
            position: 'absolute', 
            bottom: 60, 
            display: 'flex', 
            width: '100%', 
            gap: '40px',
            color: '#cda85c',
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            <span>ISO 9001:2015</span>
            <span>•</span>
            <span>Est. 2007</span>
            <span>•</span>
            <span>Exporting to 30+ Countries</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}
