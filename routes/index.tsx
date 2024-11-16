export default function Home() {
  return (
    <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div class="flex flex-col items-center gap-8">
        <h1 class="text-6xl text-white font-bold font-['Leckerli_One']">ezTimer</h1>
        <p class="text-gray-300 text-xl">Create a new countdown timer</p>
        <form action="/timer/new" method="POST" class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <input
              type="number"
              name="minutes"
              placeholder="15"
              autoFocus
              class="px-2 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 text-xl w-24 text-center focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span class="text-gray-300">minutes</span>
          </div>
          <button 
            type="submit"
            class="px-8 py-2 bg-green-500 text-white text-xl rounded-lg hover:bg-green-600 transition-colors"
          >
            Create Timer
          </button>
        </form>
      </div>
    </div>
  );
}
