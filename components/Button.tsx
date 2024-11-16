import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="px-8 py-4 bg-blue-400 text-white text-xl rounded-lg hover:bg-blue-600 transition-colors"
    />
  );
}
