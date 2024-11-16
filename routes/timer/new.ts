import pb from "../../libs/pb.ts";

// Add rate limiting map at the top
const rateLimit = new Map<string, number[]>();

export async function handler(req: Request) {
  // Handle POST request with form data
  if (req.method === 'POST') {
    // Get client IP using multiple fallback headers
    const clientIP = req.headers.get('x-forwarded-for') || 
                    req.headers.get('x-real-ip') ||
                    req.headers.get('cf-connecting-ip') ||  // Cloudflare
                    req.headers.get('x-client-ip') ||
                    req.headers.get('x-cluster-client-ip') ||
                    req.headers.get('x-forwarded') ||
                    req.headers.get('forwarded-for') ||
                    req.headers.get('remote-addr') ||
                    'unknown';
    
    // Clean up old timestamps (older than 1 minute)
    const now = Date.now();
    const timestamps = rateLimit.get(clientIP) || [];
    const recentTimestamps = timestamps.filter(time => now - time < 60000);
    console.log(clientIP, recentTimestamps);
    
    // Check if rate limit exceeded
    if (recentTimestamps.length >= 5) {
      return new Response('Rate limit exceeded. Please try again later.', { 
        status: 429 
      });
    }
    
    // Add current timestamp and update map
    recentTimestamps.push(now);
    rateLimit.set(clientIP, recentTimestamps);

    const formData = await req.formData();
    const minutes = parseInt(formData.get('minutes')?.toString() || '15');
    
    // Create timer record in PocketBase
    try {
      const record = await pb.collection('timers').create({
        "seconds": minutes * 60,
        "running": false,
      });
      
      return new Response(null, {
        status: 303, // POST-redirect-GET
        headers: {
          Location: `/timer/${record.id}`,
        },
      });
    } catch (error) {
      console.error('Failed to create timer:', error);
      return new Response('Failed to create timer', { status: 500 });
    }
  }

  // Redirect GET requests to home
  return new Response(null, {
    status: 307,
    headers: {
      Location: '/',
    },
  });
} 