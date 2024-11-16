import { PageProps, Handlers } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

import Counter from "../../islands/Counter.tsx";

import { ClientResponseError } from "pocketbase";
import pb from "../../libs/pb.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const id = ctx.params.id;
    
    try {
      const record = await pb.collection('timers').getOne(id);
      const resp = await ctx.render(record);
      return resp;
    } catch (error: unknown) {
      // Check if it's a 404 error from PocketBase
      if (error instanceof ClientResponseError && error.status === 404) {
        return ctx.renderNotFound();
      }
      // Re-throw other errors
      throw error;
    }
  },

  // Add POST handler to update timer value
  async POST(req, ctx) {
    const id = ctx.params.id;
    const data = await req.json();
    
    try {
      await pb.collection('timers').update(id, {
        seconds: data.seconds,
      });
      return new Response('Timer updated', { status: 200 });
    } catch (error) {
      return new Response('Failed to update timer', { status: 500 });
    }
  },
};

export default function Timer(props: PageProps) {
  return (
    <div>
      <a href="/" class="fixed top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Home
      </a>
      <Counter count={useSignal(props.data.seconds)} />
    </div>
  );
}
