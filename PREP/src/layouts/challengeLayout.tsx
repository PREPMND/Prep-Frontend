import { Outlet, useLocation } from "react-router-dom";

export default function ChallengeLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen light:bg-neutral-50 light:text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10rem] h-64 w-44 rounded-full light:bg-amber-200/20 dark:bg-amber-400 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-44 w-64 rounded-full light:bg-fuchsia-400/20 dark:bg-emerald-300 blur-3xl" />
      </div>

      <main className="relative z-10 min-h-screen">
        <div
          key={location.pathname}
          className="animate-[fadeIn_1s_ease-out]"
        >
          <Outlet />
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}