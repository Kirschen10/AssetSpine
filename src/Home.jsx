import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import CsvGenerator from './CsvGenerator';
import "./CSS/Home.css"; // ייבוא ה-CSS הייעודי לעמוד זה

function Home() {
  const [data, setData] = useState([]);
  const [haveSpineBridge, setHaveSpineBridge] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clearValue = () => {
    setValue('');
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const onClickBridgeInfo = (bridgeName, bid) => {
    history.push(`/BridgeInfo/${bridgeName}/${bid}/${id}`);
  };

  useEffect(() => {
    fetch('http://localhost:8081/tbl_asset_spine')
      .then(res => res.json())
      .then(data => setData(data.filter((bridge) => bridge.added_by_user === parseInt(id, 10))))
      .catch(err => console.log(err));

    fetch('http://localhost:8081/tbl_advanced_settings')
      .then(res => res.json())
      .then(dataEdit => {
        setHaveSpineBridge(dataEdit);
      })
      .catch(err => console.log(err));
  }, [id]);

  /* Google Map */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  
  const [center, setCenter] = useState({ lat: 32.484398675882346, lng: 34.949290038691394 });

  const onClickChangeMap = (bridge) => {
    setCenter({ lat: bridge.lat, lng: bridge.lon });
  };

  return (
    <div className='home'>
      <div className='left-side'>
        <h2>Asset Information</h2>
        <div className="search-container">
          <div className="search-inner">
            <img src="/images/searchicon.png" alt="search icon" />
            <input
              type="text"
              value={value}
              onChange={onChange}
              placeholder="Search by Asset name..."
              className='searchBox'
            />
            <button onClick={clearValue} style={{border:"none", backgroundColor:"white"}}>
              <img src="/images/clear.png" className="clear-icon" alt="clear" />
            </button>
          </div>
          <div className="dropdown">
            {data
              .filter((bridge) => {
                const searchTerm = value.toLowerCase();
                const fullName = bridge.name.toLowerCase();
                return (
                  searchTerm &&
                  fullName.includes(searchTerm) &&
                  fullName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((bridge) => (
                <div
                  onClick={() => onSearch(bridge.name)}
                  className="dropdown-row"
                  key={bridge.name}
                >
                  {bridge.name}
                </div>
              ))}
          </div>
        </div>
        <div className='mainTable'>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Asset Type</th>
                <th>Longitude</th>    
                <th>Latitude</th>
                <th>Photo</th>
                <th>More Information</th>
                <th>Go Location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((bridge, i) => (
                <tr key={i} className="table-row">
                  {(value && bridge.name === value) || !value ? (
                    <>
                      <td style={{ textAlign: "left" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {haveSpineBridge.find((bridge1) => bridge1.bridge_id === parseInt(bridge.bid, 10)) &&
                            <CsvGenerator CSVBridge={bridge} ImgOrButton='Image' />
                          }
                          {bridge.name}
                        </div>
                      </td>
                      <td>{bridge.bridge_type}</td>
                      <td>{bridge.lon}</td>
                      <td>{bridge.lat}</td>
                      <td>
                      <img 
                        src={`http://localhost:8081/image/${bridge.bid}?timestamp=${new Date().getTime()}`}  // Add a timestamp to the URL
                        width={"100px"} 
                        height={"100px"} 
                        onError={(e) => e.target.src = '/images/No-Image-Available.png'}  // If there is an error, replace with a default image
                        alt="Asset"
                      />
                      </td>
                      <td>
                        <button
                          onClick={() => onClickBridgeInfo(bridge.name, bridge.bid)}
                          className="info-button"
                        >
                          Information
                        </button>
                      </td>
                      <td>
                        <button
                          className="location-button"
                          onClick={() => onClickChangeMap(bridge)}
                        >
                          <img
                            src='/images/google-maps.png'
                            alt="google maps"
                            width={"30px"}
                            height={"30px"}
                          />
                        </button>
                      </td>
                    </>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='right-side'>
        <div className="googleMaps">
          {!isLoaded ? (
            <h1>Loading...</h1>
          ) : (
            <GoogleMap
              mapContainerClassName="map-container"
              center={center}
              zoom={14}
            >
              <MarkerF position={center} />
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;


/*
 * The Home component is a React component that serves as the main dashboard for viewing and interacting with asset information on a map. It displays a table of assets, allows users to search for assets by name, and provides map integration to visualize asset locations.
 *
 * State Variables:
 * 1. **data (Array)**:
 *    - Stores the list of assets fetched from the database (`tbl_asset_spine`). This array is filtered to include only assets added by the logged-in user.
 *
 * 2. **haveSpineBridge (Array)**:
 *    - Stores the list of advanced settings related to each asset (`tbl_advanced_settings`). This helps determine if an asset has a related spine structure.
 *
 * 3. **value (String)**:
 *    - Holds the current value of the search input field, used for filtering assets by name.
 *
 * 4. **center (Object)**:
 *    - Defines the current center position of the Google Map. It changes dynamically based on user interaction (clicking an asset in the table).
 *
 * 5. **isLoaded (Boolean)**:
 *    - A boolean that checks if the Google Maps API has successfully loaded.
 *
 * Functions:
 * 1. **onChange (Function)**:
 *    - Updates the `value` state as the user types in the search input field.
 *
 * 2. **clearValue (Function)**:
 *    - Clears the search input field, resetting the `value` state to an empty string.
 *
 * 3. **onSearch (Function)**:
 *    - Sets the `value` state to the clicked search term from the dropdown, enabling quick selection of assets.
 *
 * 4. **onClickBridgeInfo (Function)**:
 *    - Navigates to the bridge information page when a user clicks the "Information" button for an asset.
 *
 * 5. **onClickChangeMap (Function)**:
 *    - Updates the center of the map to the location (latitude and longitude) of the clicked asset.
 *
 * 6. **useEffect**:
 *    - Fetches asset and advanced settings data from the API when the component is mounted. Filters the asset data to show only those added by the current user (based on the `id` parameter).
 *
 * Google Maps Integration:
 * - The component uses `@react-google-maps/api` for Google Maps integration. It sets up the map with a marker indicating the location of the selected asset. The `isLoaded` state ensures the map is displayed only when the Google Maps API has fully loaded.
 *
 * JSX Structure:
 * 1. **Left-side**:
 *    - Displays the asset information table and search bar.
 *    - The search input field filters the assets by name, showing a dropdown with matching results.
 *    - The table shows details about each asset, including its name, type, coordinates, photo, and action buttons for further interaction.
 *    - Action buttons include:
 *      - **Information**: Navigates to the detailed information page for the selected asset.
 *      - **Go Location**: Centers the map on the asset’s location.
 *      - **CSV Download**: If an asset has a spine structure, a CSV download option is displayed via the `CsvGenerator` component.
 *
 * 2. **Right-side**:
 *    - Displays the Google Map centered on the current `center` state. It updates dynamically when the user clicks on different assets in the table.
 *
 * This component provides an interactive way to view and manage assets, integrating search and map visualization to enhance user experience.
 */

