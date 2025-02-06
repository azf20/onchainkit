import type { Metadata } from 'next';
import '../globals.css';
import '@coinbase/onchainkit/styles.css';
import Providers from './providers';

const appUrl = 'https://80b6-2600-1f18-24c9-6105-5-0-4-706.ngrok-free.app/minikit';

export const metadata: Metadata = {
  title: 'MiniKit',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta name="fc:frame" content={JSON.stringify({
        version: "next",
        imageUrl: `${appUrl}/opengraph-image`,
        button: {
          title: "Launch Minikit",
          action: {
            type: "launch_frame",
            name: "MiniKit",
            url: appUrl,
            splashImageUrl: "https://onchainkit.xyz/favicon/48x48.png?v4-19-24",
            splashBackgroundColor: "#000000",
          },
        },
      })} />
    </head>
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
  );
}
