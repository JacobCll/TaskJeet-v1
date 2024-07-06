// particularly used for context menus or elements
// that could be either displayed or not.

import { useEffect, useRef } from "react";

const useCloseAndSaveTask = (addTaskEnabled, saveTaskAndClose) => {
  const editingTaskRef = useRef(null);

  const closeAndSave = (e) => {
    if (addTaskEnabled && !editingTaskRef.current?.contains(e.target)) {
      saveTaskAndClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeAndSave);

    return () => {
      document.removeEventListener("mousedown", closeAndSave);
    };
  }, [addTaskEnabled, saveTaskAndClose]);

  return editingTaskRef;
};

export default useCloseAndSaveTask;
