export function FrameMetaTag({
  version,
  imageUrl,
  button,
}: {
  version: string;
  imageUrl: string;
  button: {
    title: string;
    action: {
      type: 'launch_frame';
      name: string;
      url: string;
      splashImageUrl: string;
      splashBackgroundColor: string;
    }
  }
}) {
  const metadata = {
    version,
    imageUrl,
    button,
  };

  return (
    <meta 
      name="fc:frame" 
      content={JSON.stringify(metadata)} 
    />
  );
}