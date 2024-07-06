// particularly used for context menus or elements
// that could be either displayed or not.

import { useRef, useEffect } from "react";
const useCloseOnOutside = (state, setState) => {
  const componentRef = useRef(null);

  const closeComponent = (e) => {
    if (
      state &&
      componentRef.current &&
      !componentRef.current.contains(e.target)
    ) {
      setState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeComponent);

    return () => {
      document.removeEventListener("mousedown", closeComponent);
    };
  }, [state, setState]);

  return componentRef;
};

export default useCloseOnOutside;
