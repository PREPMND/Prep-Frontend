import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden light:bg-white light:text-neutral-900 dark:bg-[#100d10] dark:text-neutral-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full light:bg-blue-200/40 dark:bg-neutral-950 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full light:bg-indigo-200/40 dark:bg-fuchsia-200 blur-3xl" />
        <idb></idb>
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full light:bg-violet-100/30 dark:bg-neutral-900 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}