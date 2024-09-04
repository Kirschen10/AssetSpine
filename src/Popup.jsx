import React, { useEffect, useState } from 'react';
import './Modal.css';

const Popup = ({ title, content, onClose }) => {
  const [visible, setVisible] = useState(true);
  

  // If in the future I want a message for a certain period of time and then it disappears - this is the function
  /*
  const [countdown, setCountdown] = useState(3); // Initial countdown value in seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Automatically hide the Popup after 3 seconds
    const timeoutId = setTimeout(() => {
      setVisible(false);
      onClose(); // Callback to notify the parent component that the Popup is closed
    }, 3000);

    // Clear the interval and timeout on component unmount or when it is closed
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []); // The empty dependency array ensures that this effect runs only once
  */


  return (
    <>
      {visible && (
        <div className="modal">
          <div className="modal-content" >
            <h2>{title}</h2>
            <p>{content}</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => { setVisible(false); onClose(); }}>
              Close
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
