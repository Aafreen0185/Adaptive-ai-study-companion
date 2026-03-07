import { Sidebar } from "@/components/sidebar";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    /* Full-height flex: sidebar + scrollable content */
    <div className="flex min-h-screen bg-background">
      {/* ── Desktop sidebar ───────────────────────────────────── */}
      <Sidebar />

      {/* ── Main content column ───────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {/* Centered content container with consistent padding */}
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile bottom nav (hidden on md+) ─────────────────── */}
      <BottomNav />
    </div>
  );
}
