const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-screen h-screen z-20 bg-black bg-opacity-75"
    ></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="modal fixed w-3/5 max-w-[400px] inset-1/2 -translate-x-1/2 -translate-y-1/2 h-2/3 z-30 rounded-lg flex justify-center items-center">
      {props.children}
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>
    </>
  );
};

export default Modal;
