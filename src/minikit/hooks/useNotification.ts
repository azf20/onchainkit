import { useCallback } from "react";
import { useMiniKit } from "./useMiniKit";

export function useNotification() {
  const { context, notificationProxyUrl } = useMiniKit();

  return useCallback(async ({ title, body, targetUrl }: { title: string, body: string, targetUrl: string }) => {
    if (!context?.client?.added || !context?.client?.notificationDetails) {
      throw new Error('Frame not added, cannot send notification');
    }
  
    try {
      const response = await fetch(notificationProxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: context.client.notificationDetails.url,
          token: context.client.notificationDetails.token,
          notification: {
            notificationId: crypto.randomUUID(),
            title,
            body,
            targetUrl,
            tokens: [context.client.notificationDetails.token],
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, [context, notificationProxyUrl]);
}
