import React, { useState } from 'react';
import './CSS/Modal.css';

const Popup = ({ title, content, onClose, onConfirm }) => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      {visible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{content}</p>
            <div className="button-container">
              <button className="button-cancel" onClick={() => { setVisible(false); onClose(); }}>
                Cancel
              </button>
              <button className="button-confirm" onClick={() => { setVisible(false); onConfirm(); }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;

/*
 * The Popup component is a reusable modal (popup) designed for displaying messages with options for user confirmation and cancellation. It is intended to provide a consistent and simple way to present information and obtain user feedback throughout the application.
 *
 * Props:
 * 1. **title (String)**:
 *    - The title displayed at the top of the popup, giving context to the content or action requested.
 * 
 * 2. **content (String)**:
 *    - The main content or message displayed inside the popup. It typically explains the action or information the user needs to confirm or cancel.
 * 
 * 3. **onClose (Function)**:
 *    - A callback function that gets executed when the "Cancel" button is clicked. This function allows the parent component to handle the cancellation action (e.g., closing the popup without performing any further actions).
 * 
 * 4. **onConfirm (Function)**:
 *    - A callback function that gets executed when the "Confirm" button is clicked. This function allows the parent component to handle the confirmation action (e.g., proceeding with a deletion or saving changes).
 *
 * State:
 * 1. **visible (Boolean)**:
 *    - A state variable that controls the visibility of the popup. It is set to `true` initially, making the popup visible when the component mounts.
 *    - It is toggled to `false` when either the "Cancel" or "Confirm" button is clicked, causing the popup to disappear.
 *
 * Component Structure:
 * - The popup renders only when the `visible` state is `true`.
 * - It includes:
 *   1. **Title**: Displayed as an `<h2>` element.
 *   2. **Content**: Displayed as a `<p>` element, providing the main message or explanation.
 *   3. **Buttons**: Two buttons for user interaction:
 *      - "Cancel": Closes the popup and triggers the `onClose` function.
 *      - "Confirm": Closes the popup and triggers the `onConfirm` function.
 *
 * CSS:
 * - The component uses CSS classes like `modal`, `modal-content`, `button-container`, `button-cancel`, and `button-confirm` for styling, which are defined in the `Modal.css` file.
 *
 * Usage:
 * - This component can be used wherever a confirmation or alert popup is required. The parent component needs to provide the appropriate `title`, `content`, and functions for `onClose` and `onConfirm` to define the popup's behavior.
 *
 * Example:
 * ```jsx
 * <Popup
 *   title="Delete Confirmation"
 *   content="Are you sure you want to delete this item?"
 *   onClose={() => console.log("Cancel clicked")}
 *   onConfirm={() => console.log("Confirm clicked")}
 * />
 * ```
 *
 * This example will display a popup with a title, content message, and two buttons. Clicking "Cancel" or "Confirm" will trigger the respective callback functions and close the popup.
 */
