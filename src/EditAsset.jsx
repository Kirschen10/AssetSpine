import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './CSS/EditAsset.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

/*
 * The EditAsset component allows users to edit details of an existing asset, such as a bridge or building. Users can modify fields like name, location, organization, and spans, as well as upload, replace, or delete an associated image.
 *
 * Key Functionalities:
 * 1. **Data Fetching and Initialization**:
 *    - Fetches the existing asset details from the backend using Axios (`axios.get`).
 *    - Initializes state values based on the fetched data (name, location, spans, image, etc.).
 *
 * 2. **Image Handling**:
 *    - Allows users to either keep the current image, replace it with a new upload, or delete it:
 *        - If the image exists, it displays the image with options to edit or delete.
 *        - If a new image is uploaded, it replaces the existing one.
 *        - Users can also cancel the upload action.
 *
 * 3. **Form Submission**:
 *    - On form submission (`handleSubmit`), the component sends an update request with the modified asset details and the image (if present).
 *    - Uses `FormData` for sending multipart/form-data to handle image upload efficiently.
 *
 * 4. **Form Fields**:
 *    - Includes fields for the asset's name, structure name, spans, description, organization, longitude, latitude, asset type, and image.
 *    - Validates certain inputs (e.g., preventing negative spans).
 *
 * 5. **Utilities**:
 *    - `urlToFile`: Converts an image URL to a file for appending to `FormData`.
 *    - `handleCancelUpload`: Cancels the image upload process.
 *    - `handleDeleteImage`: Marks the image for deletion from the database.
 *
 * The component provides a simple, intuitive interface for editing asset details while ensuring that updates, including image changes, are managed effectively.
 */


const EditAsset = () => {
  const { bid, id } = useParams();
  const history = useHistory();

  const [name, setName] = useState('');
  const [structureName, setStructureName] = useState('');
  const [spans, setSpans] = useState(1);
  const [description, setDescription] = useState('');
  const [organization, setOrganization] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [assetType, setAssetType] = useState('Bridge');
  const [mainRoad, setMainRoad] = useState('');
  const [location, setLocation] = useState('');

  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8081/tbl_asset_spine/${bid}`)
      .then((res) => {
        const data = res.data[0];
        setName(data.name);
        setStructureName(data.structure_name);
        setSpans(data.spans);
        setDescription(data.description);
        setOrganization(data.organization);
        setLongitude(data.lon);
        setLatitude(data.lat);
        setAssetType(data.bridge_type);
        setMainRoad(data.field1);
        setLocation(data.location);

        if (data.image) {
          setCurrentImageUrl(`http://localhost:8081/image/${data.bid}`);
        }
      })
      .catch(err => console.log(err));
  }, [bid]);

  // Convert URL to File
  const urlToFile = async (url, filename, mimeType) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('structure_name', structureName);
    formData.append('spans', spans);
    formData.append('description', description);
    formData.append('organization', organization);
    formData.append('lon', longitude);
    formData.append('lat', latitude);
    formData.append('bridge_type', assetType);
    formData.append('field1', mainRoad);
    formData.append('location', location);

    if (newImageFile) {
      formData.append('image', newImageFile);
    } else if (deleteImage) {
      formData.append('image', '');
    } else if (currentImageUrl && !deleteImage) {
      const file = await urlToFile(currentImageUrl, 'existing-image.jpg', 'image/jpeg');
      formData.append('image', file);
    }

    axios.put(`http://localhost:8081/tbl_asset_spine/${bid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      console.log('Asset updated:', res.data);
      history.push(`/Home/${id}`);
    })
    .catch(err => console.log(err));
  };

  const handleCancelUpload = () => {
    setNewImageFile('');
    setIsUploading(false);
  };

  const handleDeleteImage = () => {
    setDeleteImage(true);
    setNewImageFile(null);
    setIsUploading(false);
  };

  return (
    <div className="EditAsset">
      <p>Edit Asset</p>
      <table className='EditAssetTable'>
        <tbody>
          <tr>
            <td>
              <p>Name <span className="required">*</span></p>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Asset segment</p>
              <input type="text" value={structureName} onChange={(e) => setStructureName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Spans</p>
              <input type="number" min="0" value={spans} onChange={(e) => setSpans(e.target.value)} onKeyDown={(e) => { if (e.key === '-') { e.preventDefault(); }}} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Description</p>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Organization</p>
              <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Location</p>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Longitude</p>
              <input type="number" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Latitude</p>
              <input type="number" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
            </td>
          </tr>
          <tr>
            <td>
              <p>Asset type</p>
              <select value={assetType} onChange={(e) => setAssetType(e.target.value)} >
                <option value="Bridge">Bridge</option>
                <option value="Buildings">Buildings</option>
                <option value="Cellular">Cellular</option>
                <option value="Solar farm">Solar farm</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <p>Image</p>
                {currentImageUrl && !isUploading && !deleteImage ? (
                          <>
                            <div className="image-container-EditAsset">
                              <img
                                src={currentImageUrl}
                                alt="Current Asset"
                                className="current-image-EditAsset"
                              />
                              <div className="button-container-EditAsset">
                                <button type="button" className="custom-button" onClick={() => setIsUploading(true)}>
                                  <FontAwesomeIcon icon={faEdit} style={{marginRight: '8px'}} />
                                  <span>Upload New Image</span>
                                </button>
                                <button type="button" className="custom-button" onClick={handleDeleteImage} style={{backgroundColor:'red'}}>
                                  <FontAwesomeIcon icon={faTrash} style={{marginRight: '8px'}} />
                                  <span>Delete Image</span>
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                           <input type="file" accept="image/*" onChange={(e) => setNewImageFile(e.target.files[0])} />
                            {(isUploading || newImageFile) && (
                              <button type="button" className="custom-button" onClick={handleCancelUpload} style={{backgroundColor:'red'}}>Cancel</button>
                            )}
                          </>
                        )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className='ConfirmForm'>
        <button onClick={handleSubmit} style={{backgroundColor:'green'}}>Submit</button>
      </div>
    </div>
  );
};

export default EditAsset;
