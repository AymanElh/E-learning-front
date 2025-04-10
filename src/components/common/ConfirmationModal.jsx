import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({isOpen, onClose, onConfirm, title, message, confirmText, cancelText, isLoading}) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={onClose} disabled={isLoading}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <p>{message}</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn cancel-btn"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelText || "Cancel"}
                    </button>
                    <button
                        className="btn confirm-btn delete-btn"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner"></span>
                                Processing...
                            </>
                        ) : (
                            confirmText || "Confirm"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;