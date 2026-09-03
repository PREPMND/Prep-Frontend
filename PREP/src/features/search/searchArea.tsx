// SearchArea.tsx

import { useEffect, useRef } from "react";

interface SearchAreaProps {
  onClose: () => void;
  onSearch?: (query: string) => void;
}

export function SearchArea({
  onClose,
  onSearch,
}: SearchAreaProps) {
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm dark:bg-black/40">
      <div
        ref={searchRef}
        className="absolute left-1/2 top-24 w-[min(700px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <svg
            className="h-5 w-5 shrink-0 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>

          <input
            autoFocus
            type="text"
            placeholder="Search organizations..."
            onChange={(event) => onSearch?.(event.target.value)}
            className="w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
          />

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            ESC
          </button>
        </div>

        <div className="border-t border-neutral-200 px-4 py-8 dark:border-neutral-800">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            Search organizations by name, type, or location.
          </p>
        </div>
      </div>
    </div>
  );
}