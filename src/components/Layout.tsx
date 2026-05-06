import type { ReactNode } from "react";

interface LayoutProps {
  header: ReactNode;
  left: ReactNode;
  preview: ReactNode;
  bottomBar?: ReactNode;
}

export function Layout({ header, left, preview, bottomBar }: LayoutProps) {
  return (
    <div className="app-shell min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      <div className={`mx-auto flex w-full max-w-[1480px] flex-col gap-4 px-3 py-3 sm:gap-6 sm:px-6 sm:py-4 lg:px-8 lg:py-6 ${bottomBar ? "pb-28 sm:pb-32 lg:pb-32" : ""}`}>
        {header}
        <main className="grid gap-4 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_420px] 2xl:grid-cols-[minmax(0,1fr)_460px]">
          <div className="order-2 flex min-w-0 flex-col gap-5 lg:order-1">{left}</div>
          <aside className="order-1 lg:order-2 lg:self-start">{preview}</aside>
        </main>
      </div>
      {bottomBar}
    </div>
  );
}
