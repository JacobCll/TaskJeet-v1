// particularly used for context menus or elements
// that could be either displayed or not.

import { useEffect, useRef } from "react";

const useCloseAndSaveTask = (enabler, saveTaskAndClose) => {
  const editingTaskRef = useRef(null);

  const closeAndSave = (e) => {
    if (enabler && !editingTaskRef.current?.contains(e.target)) {
      saveTaskAndClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAndSave);

    return () => {
      document.removeEventListener("mousedown", closeAndSave);
    };
  }, [enabler, saveTaskAndClose]);

  return editingTaskRef;
};

export default useCloseAndSaveTask;
