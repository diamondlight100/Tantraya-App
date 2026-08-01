import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { useRoles } from "@/lib/use-role";
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  NotebookPen,
  Calendar,
  MessagesSquare,
  User,
  LogOut,
  GraduationCap,
  LogIn,
  ClipboardList,
  TrendingUp,
  Shield,
  Library,
  Sparkles,
  HandHeart,
  Bell,
  BellRing,
  Flame,
  Image as ImageIcon,
  Users,
  Layers,
  ListTree,
} from "lucide-react";
import { useNotifications } from "@/lib/use-notifications";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/schedule", label: "Practice", icon: Calendar },
  { to: "/pathways", label: "Pathways", icon: Compass },
  { to: "/core", label: "Core Curriculum", icon: Layers },
  { to: "/courses", label: "Courses", icon: GraduationCap },
  { to: "/homework", label: "Homework", icon: ClipboardList },
  { to: "/material", label: "Material", icon: BookOpen },
  { to: "/library", label: "Library", icon: Library },
  { to: "/directory", label: "Index", icon: ListTree },
  { to: "/images", label: "Images", icon: ImageIcon },
  { to: "/events", label: "Live Events", icon: Sparkles },
  { to: "/journal", label: "Journal", icon: NotebookPen },
  { to: "/seva", label: "Seva", icon: HandHeart },
  { to: "/bhakti", label: "Bhakti", icon: Flame },
  { to: "/timer", label: "Timer", icon: Bell },
  { to: "/forum", label: "Forum", icon: MessagesSquare },
  { to: "/groups", label: "Groups", icon: Users },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { isTeacher } = useRoles();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { unreadCount } = useNotifications();

  return (
    <div className="flex min-h-dvh">
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar p-5 lg:flex lg:flex-col">
        <Link to="/dashboard" className="block pb-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold">Tantraya</p>
          <p className="mt-1 font-serif text-xl text-sidebar-foreground">Student Portal</p>
        </Link>
        {user && (
          <Link
            to="/notifications"
            className="mb-4 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
          >
            <span className="relative">
              <BellRing className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-gold-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </span>
            Notifications
          </Link>
        )}
        <nav className="flex-1 space-y-1">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = path === to || path.startsWith(to + "/");
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                  active
                    ? "bg-sidebar-accent text-gold"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
          {isTeacher && (
            <Link
              to="/teach/homework"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                path.startsWith("/teach/homework")
                  ? "bg-sidebar-accent text-gold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Shield className="h-4 w-4" />
              Teach
            </Link>
          )}
          {isTeacher && (
            <Link
              to="/teach/students"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                path.startsWith("/teach/students")
                  ? "bg-sidebar-accent text-gold"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Users className="h-4 w-4" />
              Students
            </Link>
          )}
        </nav>
        {user ? (
          <button
            onClick={() => signOut().then(() => navigate({ to: "/" }))}
            className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/60"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        ) : (
          <Link
            to="/login"
            className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gold hover:bg-sidebar-accent/60"
          >
            <LogIn className="h-4 w-4" /> Sign in
          </Link>
        )}
      </aside>

      {/* Mobile top bar */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/60 bg-sidebar px-4 py-3 lg:hidden">
          <Link to="/dashboard" className="font-serif text-lg text-primary">
            Tantraya
          </Link>
          <div className="flex items-center gap-3">
            {user && (
              <Link to="/notifications" className="relative text-muted-foreground hover:text-gold">
                <BellRing className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[9px] font-semibold text-gold-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            )}
            {user ? (
              <button
                onClick={() => signOut().then(() => navigate({ to: "/" }))}
                className="text-sm text-muted-foreground"
              >
                Sign out
              </button>
            ) : (
              <Link to="/login" className="text-sm text-gold">
                Sign in
              </Link>
            )}
          </div>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-border/60 bg-sidebar px-2 py-2 text-xs lg:hidden">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = path === to;
            return (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5",
                  active ? "bg-sidebar-accent text-gold" : "text-sidebar-foreground/70",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </Link>
            );
          })}
          {isTeacher && (
            <Link
              to="/teach/homework"
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5",
                path.startsWith("/teach/homework")
                  ? "bg-sidebar-accent text-gold"
                  : "text-sidebar-foreground/70",
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              Teach
            </Link>
          )}
          {isTeacher && (
            <Link
              to="/teach/students"
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5",
                path.startsWith("/teach/students")
                  ? "bg-sidebar-accent text-gold"
                  : "text-sidebar-foreground/70",
              )}
            >
              <Users className="h-3.5 w-3.5" />
              Students
            </Link>
          )}
        </nav>
        <main className="flex-1 p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}

export function AppLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="mb-8">
      <h1 className="heading-ornament break-words font-serif text-4xl text-primary sm:text-5xl">
        {title}
      </h1>
      {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
