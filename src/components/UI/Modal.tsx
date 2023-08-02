import React from 'react';
import ReactModal from 'react-modal';
import './Modal.scss';

ReactModal.setAppElement('#root');

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
}) => {
  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={() => onClose()}
        style={{
          overlay: {
            zIndex: 15000,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
          content: {
            padding: 5,
            height: '75%',
          },
        }}
      >
        <h3>{ title }</h3>
        <div style={{ padding: 15 }}>
          { children }
        </div>
      </ReactModal>
    </div>
  );
};

export default Modal;
