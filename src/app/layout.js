import './globals.css';

export const metadata = {
  title: 'Bharat & Parul - Wedding Invitation 💍',
  description: '॥ श्री गणेशाय नमः ॥ | Divine 3D Wedding Invitation for Bharat & Parul | 19-20 April 2026',
}

// Next.js 14: viewport must be a separate export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0000',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ background: '#0a0000', margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
