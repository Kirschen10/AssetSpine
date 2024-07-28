import React, { useEffect, useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { GoogleMap, MarkerF , useLoadScript } from "@react-google-maps/api";
import CsvGenerator from './CsvGenerator';



function Home() {
  const [data,setData] = useState([]);
  const [haveSpineBridge,setHaveSpineBridge] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();


  const { id } = useParams();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const handleTextClick = () => {
    setText('');
  };
  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const clearValue = () => {
    setValue('');
  }
  const onClickBridgeInfo = (bridgeName, bid) => {
    console.log(bid);
    // Use history.push to navigate programmatically
    history.push(`/BridgeInfo/${bridgeName}/${bid}/${id}`);
      
  };

  useEffect(() => {
    fetch('http://localhost:8081/tbl_asset_spine')
    .then(res => res.json())
    .then(data => setData(data.filter((bridge) => bridge.added_by_user === parseInt(id,10))))
    .catch(err => console.log(err));

    fetch('http://localhost:8081/tbl_advanced_settings')
    .then(res => res.json())
    .then(dataEdit => {
      setHaveSpineBridge(dataEdit);
    })
    .catch(err => console.log(err))
  }, [])

  /* Google Map */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFQOvZvXyFknkXTButx5u9jd3UXVgNBs8",
  });
  const [center, setCenter] = useState({ lat: 32.484398675882346, lng: 34.949290038691394 });

  const onClickChangeMap = (bridge) => {
    setCenter({ lat: bridge.lat, lng: bridge.lon });
  };



return (
  <div className='home' style={{ display: 'flex', height: '100vh'}}>
  <div style={{ flex: '60%', paddingRight: '10px' }}> {/* 70% width with a right padding of 10px */}
        {/* Left side: Table */}
        <h2>Asset Information</h2>
        <div className="search-container">
        <div className="search-inner" style={{justifyContent: 'space-between'}}>
          <img src = "/images/searchicon.png" /> 
          <input type="text" value={value} onChange={onChange} onClick={handleTextClick}
        placeholder="Search by Asset name..." className='searchBox' />
        <button onClick={clearValue} style={{border:"none", backgroundColor:"white"}}><img src = "/images/clear.png" style={{marginLeft:"70%"}} className="clear-icon"/></button>
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
        <div className='mainTable' style={{ overflowY: 'auto', height: 'calc(100vh - 220px)'}}>
        <table className="styled-table">
        <thead>
            <tr>
                <th width="220px">Name</th>
                <th width="100px">Asset Type</th>
                <th>Longitude</th>    
                <th>Latitude</th>
                <th>Photo</th>
                <th>More Information</th>
                <th>Go Location</th>
          </tr>
        </thead>
        <tbody>
        {data.map((bridge, i) => (
  <tr key={i} style={{backgroundColor:"#E1E1E1"}}>
    {(value && bridge.name === value) || !value ? (
      <>
        <td style={{ textAlign: "left" }}>
  <div style={{ display: "flex", alignItems: "center" }}>
    {haveSpineBridge.find((bridge1) => bridge1.bridge_id === parseInt(bridge.bid, 10)) && 
      <CsvGenerator CSVBridge={bridge} ImgOrButton='Image' />}
    {bridge.name}
  </div>
</td>
        <td>{bridge.bridge_type}</td>
        <td>{bridge.lon}</td>
        <td>{bridge.lat}</td>
        <td><img 
        src={bridge.image_url ? bridge.image_url :  '/images/No-Image-Available.png'} 
        width={"100px"} 
        height={"100px"} /></td>
        <td>
          <button onClick= { () => onClickBridgeInfo(bridge.name, bridge.bid)} style={{background:"green", borderRadius: '8px', color:"white", border:"none",cursor: "pointer"}}>
            Information
          </button>
        </td>
        <td>
          <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}} onClick={ () => onClickChangeMap(bridge)}>
            <img 
              src='/images/google-maps.png' 
              width={"30px"} 
              height={"30px"}
              style={{backgroundColor:"#E1E1E1"}} />
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
      <div style={{ flex: '40%' }}> {/* 30% width */}
      <div className="googleMaps" style={{ width: '100%', height: 'calc(100vh - 220px)', marginTop: '80px' }}>
            {!isLoaded ? (
              <h1>Loading...</h1>
            ) : (
              <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={14}
              >
                <MarkerF  position={center}/>
              </GoogleMap>
            )}
          </div>
      </div>
    </div>
  );
}

export default Home;