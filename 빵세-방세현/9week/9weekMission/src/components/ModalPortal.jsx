import reactDom from "react-dom";

const ModalPortal = ({ children }) => {
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal");
  if (!node) {
    console.error("Portal DOM node not found!");
    return null;
  }

  return reactDom.createPortal(children, node);
};

export default ModalPortal;
