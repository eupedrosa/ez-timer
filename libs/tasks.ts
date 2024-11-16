import { Cron } from "cron";

import pb from "./pb.ts";

const pruneTimers = new Cron("0 * * * *", async () => {
  console.log("Running pruneTimers...");

  // authenticate with pocketbase
  await pb.collection("users").authWithPassword(
    Deno.env.get("PB_USER")!,
    Deno.env.get("PB_PASSWORD")!,
  );

  // get all timers that are not active for the past 24 hours
  const timers = await pb.collection("timers").getFullList({
    filter: `updated < "${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}"`,
  });

  // now, go through each timer and delete it
  for (const timer of timers) {
    console.log(`Deleting timer ${timer.id}`);
    await pb.collection("timers").delete(timer.id);
  }

});

export default pruneTimers;
