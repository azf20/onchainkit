import sdk from "@farcaster/frame-sdk";
import { useMiniKit } from "./useMiniKit";
import { useCallback } from "react";

export function useAddFrame() {
  const { setNotificationDetails, setFrameAdded } = useMiniKit();

  return useCallback(async () => {
    const result = await sdk.actions.addFrame();

    if (result.notificationDetails) {
      setFrameAdded();
      setNotificationDetails(result.notificationDetails);
      return result.notificationDetails;
    }
  
    return null;
  }, [setNotificationDetails, setFrameAdded]);
}