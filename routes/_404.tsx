import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Time Not Found</title>
      </Head>
      <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
        <div class="flex flex-col items-center gap-6">
          <div class="text-7xl mb-2">⏰</div>
          <h1 class="text-6xl text-white font-bold">Time Not Found</h1>
          <p class="text-gray-300 text-xl text-center">
            Looks like time slipped away! The page you're looking for doesn't exist.
          </p>
          <div class="font-mono text-4xl text-gray-300 my-2">04:04:04</div>
          <a 
            href="/" 
            class="px-8 py-4 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600 transition-colors"
          >
            Back to Timer
          </a>
        </div>
      </div>
    </>
  );
}
