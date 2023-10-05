import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const overlays = document.querySelector("#overlays");

const Toast = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [props.toastOpen]);

  return createPortal(
    <div
      className={`fixed z-10 left-4 bg-black text-white rounded-2xl px-2 py-4 w-64 transition-all duration-500 ${
        visible ? "bottom-4 opacity-100" : "-bottom-12 opacity-0"
      }`}
    >
      {props.children}
    </div>,
    overlays
  );
};

export default Toast;
