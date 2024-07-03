// reusable hook
import { useEffect, useRef } from "react";

const useAutoResizeTextarea = (value) => {
  const textareaRef = useRef(null);

  const autoResize = () => {
    // when this hook is assigned to a textarea ref attribute,
    // textarea will be equal to the <textarea> html element.
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return textareaRef;
};

export default useAutoResizeTextarea;
