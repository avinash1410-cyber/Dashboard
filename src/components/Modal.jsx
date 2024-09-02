import React from 'react';

const Modal = ({ title, content, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Popup */}
            <div className="relative bg-gray-800 text-white rounded-lg overflow-y-auto w-1/3 h-2/3 p-6 z-60 max-h-screen">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                >
                    &times; {/* Close button */}
                </button>
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                {content}
            </div>
        </div>
    );
};

export default Modal;
