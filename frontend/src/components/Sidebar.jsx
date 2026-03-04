import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboard,
  BarChart3,
  ClipboardList,
  User,
  Menu,
  X,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [mobileOpen]);
    
  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <>
      {/* MOBILE MENU TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-lg p-2.5 sm:p-3 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
      </button>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
    bg-gradient-to-b from-gray-50 to-gray-100
    h-[50vh] md:h-screen
    fixed left-0 z-50 md:z-40
    transition-all duration-300 ease-in-out
    shadow-2xl md:shadow-xl
    border-r border-gray-200
    
    /* Mobile: start exactly below navbar + rounded corners */
    top-[80px] rounded-tr-2xl rounded-br-2xl
    w-[70%] max-w-[280px]

    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
    
    /* Desktop: unchanged */
    md:translate-x-0 md:top-[80px] md:w-64 md:rounded-none
  `}
        aria-label="Main navigation"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-200/30 to-transparent pointer-events-none" />

        {/* SIDEBAR CONTENT CONTAINER */}
        <div className="relative h-full flex flex-col p-4 sm:p-6 mt-0 md:mt-4">
          {/* MOBILE CLOSE BUTTON */}
          <button
            className="md:hidden self-end mb-4 text-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-all duration-300"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* BRAND SECTION */}
          <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-gray-800 font-bold text-base sm:text-lg truncate">
                  MedicareAI
                </h2>
                <p className="text-gray-500 text-xs truncate">
                  Prediction System
                </p>
              </div>
            </div>
          </div>

          {/* NAVIGATION MENU */}
          <nav className="flex-1 flex flex-col gap-1.5 sm:gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <SidebarItem
              to="/dashboard"
              icon={<LayoutDashboard />}
              text="Dashboard"
              path={location.pathname}
            />

            <SidebarItem
              to="/profile"
              icon={<User />}
              text="Profile"
              path={location.pathname}
            />

            <SidebarItem
              to="/metrics"
              icon={<BarChart3 />}
              text="Predictors"
              path={location.pathname}
            />

            <SidebarItem
              to="/history"
              icon={<ClipboardList />}
              text="History"
              path={location.pathname}
            />

            <SidebarItem
              onClick={handleLogout}
              icon={<LogOut />}
              text="Sign Out"
              path={location.pathname}
              // isSignOut={true}
            />
          </nav>

          {/* BOTTOM DECORATION */}
          <div className="mt-4 sm:mt-6 pt-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
              <p className="text-gray-500 text-xs text-center font-medium">
                Powered by Advanced ML
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* SPACER for desktop layout (prevents content from going under sidebar) */}
      <div className="hidden md:block w-64 flex-shrink-0" aria-hidden="true" />
    </>
  );
}

function SidebarItem({ to, icon, text, path, isSignOut, onClick }) {
  const active = path === to;

  const classes = `
    relative flex items-center gap-3 sm:gap-4 
    px-3 sm:px-4 py-3 sm:py-3.5 
    rounded-xl transition-all duration-300
    group overflow-hidden
    ${
      isSignOut
        ? "text-red-600 hover:bg-red-50 hover:translate-x-1 border border-transparent hover:border-red-200"
        : active
        ? "bg-gradient-to-r from-zinc-500 to-zinc-600 text-white shadow-lg shadow-indigo-200"
        : "text-gray-700 hover:bg-gray-200 hover:translate-x-1"
    }
  `;

  // SIGN OUT BUTTON
  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        <span className="w-5 h-5 sm:w-6 sm:h-6">{icon}</span>
        <span className="text-sm sm:text-base font-medium">{text}</span>
      </button>
    );
  }

  // NORMAL LINK
  return (
    <Link to={to} className={classes}>
      <span className="w-5 h-5 sm:w-6 sm:h-6">{icon}</span>
      <span className="text-sm sm:text-base font-medium">{text}</span>
    </Link>
  );
}