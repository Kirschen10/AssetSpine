// Navbar.js
import {React, useState} from 'react';
import { Link, useLocation, useHistory  } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const history = useHistory();
    
    // Use the pathname or any other logic to determine if it's an "Edit mode" page
    const isEditMode = location.pathname.includes('/Edit_mode');
    
    // A function that will always return the ID number of the user so that I can maintain his permissions as I move between pages
    const extractLastNumberFromURL = (url) => {
        const reversedParts = url.split('/').reverse();
        const lastNumber = reversedParts.find(part => /^\d+$/.test(part));
  
        return lastNumber ? parseInt(lastNumber, 10) : null;
      };
    
    // Example usage:
    const currentURL = window.location.href;
    const id = extractLastNumberFromURL(currentURL);
    const [isHovered, setIsHovered] = useState(false);

    const handleConfirmation = () => {
        history.push(`/AddNewAsset/${id}`);
      };

    return (
        <nav className="navbar" style={{ backgroundColor: "darkorange" }}>
            <Link to={`/Home/${id}`}><img src='/images/Manam_White_Icon.png' width={40} alt="Manam Logo" /></Link>
            <h1>{isEditMode ? 'Manam Applications - Asset Spine Builder - Edit mode' : 'Manam Applications - Asset Spine Builder'}</h1>
            <div className="links">
            <button style={{ 
                display: 'inline-block',
                width: '120px',
                color: 'white', 
                backgroundColor: '#69a311',
                borderRadius: '8px',
                padding: '6px',
                textDecoration: 'none',
                border: ' none',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleConfirmation}
                >
                <img src="/images/add-file.png" alt="New Asset" width={'25px'} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                New Asset
            </button>
            {isHovered &&  (
                // Additional content to show on hover
                <div style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "white", borderRadius: "7px", padding: "10px", position: "absolute"}}>
                Add New Asset
                </div>
            )}
            </div>
        </nav>
    );
}

export default Navbar;
