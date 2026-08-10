import { useEffect, useState } from "react";

// Tracks whether the viewport is below Tailwind's "lg" breakpoint (1024px).
// Used by DashboardLayout so the single sidebar-toggle button in the Navbar
// can do the right thing on both mobile (open/close the drawer) and
// desktop (collapse/expand the rail) without two separate buttons.
function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return isMobile;
}

export default useIsMobile;
