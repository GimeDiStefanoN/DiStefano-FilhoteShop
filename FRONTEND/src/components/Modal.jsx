
const Modal = ({ title, content }) => {
  return (
    <div className="modales">
      <div className="modalDialog">
        <div>
          <a href="#close" title="Close" className="close">X</a>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;