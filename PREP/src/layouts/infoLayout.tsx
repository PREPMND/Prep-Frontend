import { Outlet } from "react-router-dom";

export default function InfoLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-[#050505] dark:text-neutral-100">
      {/* Animated ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 light:bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]" />

        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full light:bg-emerald-300/15 dark:bg-emerald-400/10 blur-[120px] animate-pulse" />

        <div className="absolute right-[-8rem] top-[15%] h-[24rem] w-[24rem] rounded-full light:bg-blue-300/15 dark:bg-blue-500/10 blur-[120px] animate-[float_10s_ease-in-out_infinite]" />

        <div className="absolute bottom-[-10rem] left-[-8rem] h-[26rem] w-[26rem] rounded-full light:bg-violet-300/15 dark:bg-violet-500/10 blur-[120px] animate-[float_12s_ease-in-out_infinite_reverse]" />

        <div className="absolute left-[15%] top-[35%] h-2 w-2 rounded-full bg-emerald-400/60 shadow-[0_0_25px_rgba(52,211,153,0.8)] animate-pulse" />

        <div className="absolute right-[20%] top-[25%] h-1.5 w-1.5 rounded-full bg-blue-400/60 shadow-[0_0_20px_rgba(96,165,250,0.8)] animate-pulse [animation-delay:1s]" />

        <div className="absolute bottom-[25%] left-[30%] h-1.5 w-1.5 rounded-full bg-violet-400/60 shadow-[0_0_20px_rgba(167,139,250,0.8)] animate-pulse [animation-delay:2s]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-50/80 dark:to-[#050505]/90" />
      </div>

      {/* Content */}
      <main className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-[fadeIn_1.0s_ease-out]">
          <Outlet />
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -25px, 0) scale(1.05);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
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