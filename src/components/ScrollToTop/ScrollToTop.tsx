import { useEffect } from "react";
import { useLocation } from "react-router";
import { usePrevious } from "../../helpers/common";

type ScrollToTopProps = {
  children: React.ReactNode;
};

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  useEffect(() => {
    setTimeout(() => {
      if (prevLocation?.pathname !== location.pathname) {
        window.scrollTo(0, 0);
      }
    });
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
