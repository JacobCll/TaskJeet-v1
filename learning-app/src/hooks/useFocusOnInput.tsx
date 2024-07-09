import { useEffect, useRef } from "react";

// node (DOM) element referenced
export default function useFocus() {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return textareaRef;
}
