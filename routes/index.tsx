export default function Home() {
  return (
    <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center gap-8">
        <h1 class="text-6xl text-white font-bold font-['Leckerli_One']">ezTimer</h1>
        <p class="text-gray-300 text-xl">Create a new countdown timer</p>
        <a 
          href="/timer/new"
          class="px-8 py-4 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600 transition-colors"
        >
          Create Timer
        </a>
      </div>
    </div>
  );
}
