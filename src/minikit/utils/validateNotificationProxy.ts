export async function validateNotificationProxy(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error('Failed to validate notification proxy:', error);
    return false;
  }
}
