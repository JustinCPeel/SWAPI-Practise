const Modal = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="modal-background">
      <div className="modal-container max-width">
        <div className="image-overlay"></div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;