import { Outlet } from "react-router-dom";

export default function InfoLayout() {
  return (
    <div className="min-h-screen light:bg-neutral-50 light:text-neutral-900 dark:bg-[#000000] dark:text-neutral-100">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10rem] h-96 w-96 rounded-full light:bg-blue-700 dark:bg-indigo-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full light:bg-indigo-200/20 dark:bg-blue-500/5 blur-3xl" />
      </div>

      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}