import type { ReactNode } from "react";

interface SectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function Section({ eyebrow, title, description, children, action }: SectionProps) {
  return (
    <section className="premium-card p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-blue-300">{eyebrow}</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold leading-none tracking-normal text-slate-950 dark:text-white">{title}</h2>
          {description ? <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
