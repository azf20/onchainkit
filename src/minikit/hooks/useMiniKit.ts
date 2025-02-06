import { useContext, useEffect, useState } from "react";
import sdk from "@farcaster/frame-sdk";
import { MiniKitContext } from "@/MiniKitProvider";

export const useMiniKit = () => {
  const [isReady, setIsReady] = useState(false);
  const context = useContext(MiniKitContext);
  if (!context) {
    throw new Error('useMiniKit must be used within a MiniKitProvider');
  }

  useEffect(() => {
    return () => {
      sdk.removeAllListeners();
    };
  }, []);

  const ready = async () => {
    sdk.actions.ready({});
    setIsReady(true);
    return context;
  };

  return {
    ready,
    isReady,
    context: context.context,
    setNotificationDetails: context.setNotificationDetails,
    setFrameAdded: context.setFrameAdded,
    notificationProxyUrl: context.notificationProxyUrl,
  };
};
