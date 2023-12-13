import React from "react";
import PropTypes from "prop-types";
import "./TicketModal.less"; 

const TicketModal = ({ src, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        {src.endsWith(".pdf") ? (
          <embed src={src} type="application/pdf" width="100%" height="100%" />
        ) : (
          <img src={src} alt="ticket" />
        )}
      </div>
    </div>
  );
};

TicketModal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TicketModal;