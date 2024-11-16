
import pb from "../../libs/pb.ts";

export async function handler(req: Request) {
  // Create timer record in PocketBase
  let record;
  try {
    record = await pb.collection('timers').create({
      "seconds": 15 * 60,
    });
  } catch (error) {
    console.error('Failed to create timer:', error);
    return new Response('Failed to create timer', { status: 500 });
  }

  return new Response(null, {
    status: 307,
    headers: {
      Location: `/timer/${record.id}`,
    },
  });
} 