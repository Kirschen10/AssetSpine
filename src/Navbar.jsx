import { React, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './CSS/Navbar.css';

const Navbar = () => {
    const location = useLocation(); // Get the current location (URL path)
    const history = useHistory(); // Provides navigation functionality

    // Determine if the current page is an "Edit mode" page by checking the pathname
    const isEditMode = location.pathname.includes('/Edit_mode');

    // A function that extracts the last number from the URL, used to retrieve the user ID for permissions
    const extractLastNumberFromURL = (url) => {
        const reversedParts = url.split('/').reverse();
        const lastNumber = reversedParts.find(part => /^\d+$/.test(part));
        return lastNumber ? parseInt(lastNumber, 10) : null;
    };

    // Get the current URL and extract the user ID
    const currentURL = window.location.href;
    const id = extractLastNumberFromURL(currentURL);

    // States to manage hover effects for the logo and button
    const [isHovered, setIsHovered] = useState(false);
    const [isIconHovered, setIsIconHovered] = useState(false);

    // Function to navigate to the Add New Asset page with the user ID
    const handleConfirmation = () => {
        history.push(`/AddNewAsset/${id}`);
    };

    return (
        <nav className="navbar">
            {/* Logo section with tooltip */}
            <div
                className="navbar-icon-container"
                onMouseEnter={() => setIsIconHovered(true)}
                onMouseLeave={() => setIsIconHovered(false)}
            >
                {/* Link to the Home page */}
                <Link to={`/Home/${id}`}>
                    <img src='/images/Manam_White_Icon.png' width={60} alt="Manam Logo" />
                </Link>
                {isIconHovered && (
                    // Tooltip for the Home Page link
                    <div className="icon-hover-tooltip">
                        Home Page
                    </div>
                )}
            </div>
            
            {/* Title changes based on whether the user is in "Edit mode" */}
            <h1>{isEditMode ? 'Manam Applications - Asset Spine Builder - Edit mode' : 'Manam Applications - Asset Spine Builder'}</h1>
            
            {/* Add New Asset button section with tooltip */}
            <div className="links">
                <button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleConfirmation}
                >
                    <img src="/images/add-file.png" alt="New Asset" width={'25px'} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                </button>
                {isHovered && (
                    // Tooltip for the Add New Asset button
                    <div className="button-hover-tooltip">
                        Add New Asset
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

/*
 * The Navbar component is a navigation bar for the Manam Applications - Asset Spine Builder application. It provides navigation links, including a home icon that links to the home page and a button to add a new asset. It also dynamically displays whether the user is in "Edit mode" based on the URL path.

 * State Variables:
 * 1. **isHovered (Boolean)**:
 *    - Controls the hover state of the "Add New Asset" button to show or hide the tooltip.
 *
 * 2. **isIconHovered (Boolean)**:
 *    - Controls the hover state of the home icon (logo) to show or hide the tooltip.
 *
 * Functions:
 * 1. **extractLastNumberFromURL (Function)**:
 *    - Extracts the last number from the current URL, which is used to determine the user ID for permissions.
 *    - It splits the URL by '/', reverses the array, and searches for the last numeric segment.
 *
 * 2. **handleConfirmation (Function)**:
 *    - Redirects the user to the "Add New Asset" page, including the user ID extracted from the URL.
 *
 * Hooks:
 * 1. **useLocation**:
 *    - Obtains the current URL path to determine if the user is in "Edit mode".
 *
 * 2. **useHistory**:
 *    - Provides navigation functionality for redirecting the user to different pages.
 *
 * Conditional Rendering:
 * 1. **isEditMode**:
 *    - The title dynamically changes to indicate whether the user is in "Edit mode" based on the URL path.
 *
 * 2. **Tooltip Display**:
 *    - When hovering over the logo or the "Add New Asset" button, tooltips appear to provide additional information to the user.
 *
 * JSX Structure:
 * 1. The logo, which links to the home page and shows a tooltip on hover.
 * 2. The dynamic title that changes based on the edit state of the application.
 * 3. The "Add New Asset" button, which navigates to the asset addition page when clicked and displays a tooltip on hover.
 *
 * CSS:
 * - The component uses CSS classes like `navbar`, `navbar-icon-container`, `icon-hover-tooltip`, `links`, and `button-hover-tooltip` for styling, defined in the `Navbar.css` file.
 *
 * This component provides a user-friendly and interactive navigation bar with clear visual cues and responsive elements that aid the user in navigating the application efficiently.
 */

