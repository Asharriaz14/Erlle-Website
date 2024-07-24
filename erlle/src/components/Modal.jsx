import { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Logo from '../assets/erlleLogo.png';
import { IoCloseOutline } from "react-icons/io5";

function Modal({ onClose, songData }) {
    const modalRef = useRef();
    const [randomString, setRandomString] = useState('');

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const generateRandomString = (length) => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
        };

        setRandomString(generateRandomString(15));

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    };

    return (
        <div 
            ref={modalRef} 
            onClick={closeModal} 
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
            style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%' }}
        >
            <div className="bg-black rounded-lg shadow-xl p-6 w-2/4 mx-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-2 items-center text-sm text-white">
                        <img src={Logo} alt="Company Logo" className="w-24 h-10" />
                    </div>
                    <div onClick={onClose} className="rounded-md text-white p-2 cursor-pointer flex items-center hover:bg-gray-300">
                        <IoCloseOutline className="h-6 w-6"/>
                    </div>
                </div>

                <div className="divide-y divide-gray-300 py-2">
                    <div className="text-base leading-7 space-y-4 text-left flex flex-col text-white">
                        <h1 className="text-3xl font-bold text-center">PAYMENT SUCCESSFUL</h1>
                        <div className="success-container text-white">
                            <h1>Payment Successfully Done</h1>
                            <p>Thank you for your purchase! Your payment was processed successfully.</p>
                            <h1>Song Detail</h1>
                            <p>Song Name: {songData?.name || 'No song name available'}</p>
                            <p>Artist Name: {songData?.artist || 'No artist information available'}</p>
                            <p>Price : {songData?.allow_listen || 'Price Hidden'}</p> 
                            <h1>Random String:</h1>
                            <p>{randomString}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    songData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        artist: PropTypes.string,
        allow_listen: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
};

export default Modal;
