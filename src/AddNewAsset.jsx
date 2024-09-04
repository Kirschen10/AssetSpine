import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import "./Modal.css";
import axios from 'axios';

const AddNewAsset = () => {

  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/tbl_asset_spine')
    .then(res => res.json())
    .then(data => {
        setData(data);
    })
    .catch(err => console.log(err));
  }, []);



  const [name, setName] = useState(null);
  const [structureName, setStructureName] = useState(null);
  const [spans, setSpans] = useState(null);
  const [description, setDescription] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [assetType, setAssetType] = useState('Bridge');
  const [mainRoad, setMainRoad] = useState(null);
  const [location, setLocation] = useState(null);
  const [image, setImage] = useState(null);



  ////////// Modal - popup /////////////////

  const [remainingTime, setRemainingTime] = useState(5);

  const [modal, setModal] = useState(false);

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [elertWrning, setElertWrning] = useState(false);

  const toggleElertWrning = () => {
    setElertWrning(!elertWrning);
  };

  if(elertWrning) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  const [sameBidWrning, setSameBidWrning] = useState(false);

  const toggleSameBidWrning = () => {
    setSameBidWrning(!sameBidWrning);
  };

  if(elertWrning) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    const values = {
      name: name,
      structure_name: structureName,
      spans: spans,
      description: description,
      organization: organization,
      lon: longitude,
      lat: latitude,
      added_by_user: id,
      image: image,
      bridge_type: assetType,
      field1: mainRoad,
      location: location,
    };


    if(name === '' || name === null)
    {
      return setElertWrning(!elertWrning);
    }
    else{
      setModal(!modal);
      axios.post('http://localhost:8081/tbl_asset_spine', values)
      .then((res) => {
        history.push(`/Home/${id}`);
      })
      .catch(err => console.log(err));
    }
  };


  return (
    <div className="Directories">
      <div className='AddNewAsset'>
        <br />
        <p>Add new asset</p>
        <br />
        <table className='AddNewAssetTable'>
          <tbody>
            <tr>
              <td><p>Name <span className="required">*</span></p>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Asset segment</p>
              <input type="text" required value={structureName} onChange={(e) => setStructureName(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Spans</p>
              <input type="number" min="0" required value={spans} onChange={(e) => setSpans(e.target.value)} onKeyDown={(e) => { if (e.key === '-') { e.preventDefault(); }}} /></td>
            </tr>
            <tr>
              <td><p>Description</p>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Organization</p>
              <input type="text" required value={organization} onChange={(e) => setOrganization(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Location</p>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Longitude</p>
              <input type="number" required value={longitude} onChange={(e) => setLongitude(e.target.value)} /></td>
              <td><p>Latitude</p>
              <input type="number" required value={latitude} onChange={(e) => setLatitude(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Asset type</p>
              <select required value={assetType} onChange={(e) => setAssetType(e.target.value)} >
                <option value="Bridge">Bridge</option>
                <option value="Bulidings">Bulidings</option>
                <option value="Cellular">Cellular</option>
                <option value="Solar farm">Solar farm</option>
              </select>
              </td>
            </tr>
            <tr>
              <td><p>Main Road</p>
              <input type="text" value={mainRoad} onChange={(e) => setMainRoad(e.target.value)} /></td>
            </tr>
            <tr>
              <td><p>Image</p>
              <input type="file" disabled value={image} onChange={(e) => setImage(e.target.value)} /></td>
            </tr>
          </tbody>
        </table>

        <div className='ConfirmForm'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <br/>
        <br/>
      </div>
      
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thank You for Your Input!</h2>
            <p>
              Data was saved
            </p>
            <p style={{paddingTop:"10px"}}>Redirecting in <strong>{remainingTime}</strong> seconds...</p>
          </div>
        </div>
      )}
      {elertWrning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Warning</h2>
            <p>
            Please fill the name
            </p>
            <button className="close-modal" style={{border:"none", backgroundColor:"#f1f1f1"}} onClick={toggleElertWrning}>
            <img src = "/images/clear.png" width={'20px'}/>
            </button>
          </div>
        </div>
      )}
      {sameBidWrning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Warning</h2>
            <p>
            Bid ${bid} already exists. Please select a new one.
            </p>
            <button className="close-modal" style={{border:"none", backgroundColor:"#f1f1f1"}} onClick={toggleSameBidWrning}>
            <img src = "/images/clear.png" width={'20px'}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default AddNewAsset;
