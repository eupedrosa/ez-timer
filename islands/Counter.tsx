import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect, useState } from "preact/hooks";

interface CounterProps {
  count: Signal<number>;
}

export default function Counter(props: CounterProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [initialValue] = useState(props.count.value);

  const formatTime = (totalSeconds: number) => {
    const isNegative = totalSeconds < 0;
    const absSeconds = Math.abs(totalSeconds);
    
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const seconds = absSeconds % 60;
    
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return isNegative ? `-${timeString}` : timeString;
  };

  const saveTimer = async () => {
    try {
      const response = await fetch(globalThis.location.href, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seconds: props.count.value,
        }),
      });
      if (!response.ok) {
        console.error('Failed to save timer');
      }
    } catch (error) {
      console.error('Error saving timer:', error);
    }
  };

  const startTimer = () => {
    if (isRunning) return;
    
    const interval = setInterval(() => {
      props.count.value -= 1;
      saveTimer();
    }, 1000);
    
    setIntervalId(interval);
    setIsRunning(true);
  };

  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
      saveTimer();
    }
  };

  const resetTimer = () => {
    pauseTimer();
    props.count.value = initialValue;
    saveTimer();
  };

  return (
    <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div id="timer" class="flex flex-col items-center gap-8 py-6">
        <p 
          class={`text-7xl md:text-12xl lg:text-20xl tabular-nums ${
            props.count.value <= 0 ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {formatTime(props.count.value)}
        </p>
        <div class="flex gap-4">
          {!isRunning ? (
            <Button onClick={startTimer}>
              Start Timer
            </Button>
          ) : (
            <>
              <Button onClick={pauseTimer}>
                Pause
              </Button>
              <Button onClick={resetTimer}>
                Reset
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
