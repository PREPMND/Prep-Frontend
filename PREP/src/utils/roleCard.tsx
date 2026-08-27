import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";

interface DirectionalRoleCardProps {
  children: ReactNode;
}

type Direction = "top" | "right" | "bottom" | "left";

const directionClasses: Record<Direction, string> = {
  top: "-translate-y-full",
  right: "translate-x-full",
  bottom: "translate-y-full",
  left: "-translate-x-full",
};

export function DirectionalRoleCard({
  children,
}: DirectionalRoleCardProps) {
  const [overlayClass, setOverlayClass] =
    useState("-translate-y-full");

  const overlayRef = useRef<HTMLDivElement>(null);

  const getDirection = (
    event: MouseEvent<HTMLElement>,
  ): Direction => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    if (Math.abs(x) > Math.abs(y)) {
      return x > 0 ? "right" : "left";
    }

    return y > 0 ? "bottom" : "top";
  };

  const handleEnter = (
    event: MouseEvent<HTMLElement>,
  ) => {
    const direction = getDirection(event);

    setOverlayClass(directionClasses[direction]);

    requestAnimationFrame(() => {
      setOverlayClass("translate-x-0 translate-y-0");
    });
  };

  const handleLeave = (
    event: MouseEvent<HTMLElement>,
  ) => {
    const direction = getDirection(event);
    setOverlayClass(directionClasses[direction]);
  };

  return (
    <section
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-950"
    >
      <div
        ref={overlayRef}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-mauve-700/25 via-mauve-500/10 to-transparent transition-transform duration-300 ease-out ${overlayClass}`}
      />

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}