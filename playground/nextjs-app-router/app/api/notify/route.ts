export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received request body:', body); // Debug log

    const { url, token, notification } = body;

    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(notification)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Warpcast API error:', errorData);
      return new Response(JSON.stringify(errorData), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Server error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 