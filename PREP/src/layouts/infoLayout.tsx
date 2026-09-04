import { Outlet } from "react-router-dom";

export default function InfoLayout() {
  return (
    <div className="relative min-h-screen bg-neutral-50 text-neutral-900 dark:bg-[#050505] dark:text-neutral-100">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 light:bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.08),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(96,165,250,0.07),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(167,139,250,0.07),transparent_40%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(163,230,53,0.05),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.05),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(139,92,246,0.05),transparent_40%)]" />

        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[160px] light:bg-emerald-300/15 dark:bg-emerald-700 animate-pulse" />

        <div className="absolute right-[-8rem] top-[20%] h-[14rem] w-[14rem] rounded-full blur-[120px] light:bg-blue-300/10 dark:bg-blue-400 animate-[float_6s_ease-in-out_infinite]" />

        <div className="absolute bottom-[-10rem] left-[-8rem] h-[16rem] w-[16rem] rounded-full blur-[120px] light:bg-violet-300/10 dark:bg-violet-900 animate-[floatReverse_14s_ease-in-out_infinite]" />
      </div>

      <main className="relative z-10 min-h-screen">
        <div className="animate-[fadeIn_1s_ease-out]">
          <Outlet />
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-20px, -25px, 0) scale(1.05);
          }
        }

        @keyframes floatReverse {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, 20px, 0) scale(1.05);
          }
        }

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