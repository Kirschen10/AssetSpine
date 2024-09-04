import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

const Folders = () => {
    // Destructure the data from the state object
  const { state } = useLocation();
  const { values, perviousPageData } = state;

  const { bridgeID, id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);

  const [general, setGeneral] = useState(true);
  const [circles, setCircles] = useState(true);
  const [nadir, setNadir] = useState(true);
  const [sides, setSides] = useState(true);
  const [guardRails, setGuardRails] = useState(true);
  const [angle_360, setAngle_360] = useState(false);
  const [thermal, setThermal] = useState(false);
  const [toDelete, setToDelete] = useState(false); 
  const [subFolders, setSubFolders] = useState(false);

  const handleCheckboxGeneral = () => {
    setGeneral(!general);
  };

  const handleCheckboxCircles = () => {
    setCircles(!circles);
  };

  const handleCheckboxNadir = () => {
    setNadir(!nadir);
  };

  const handleCheckboxSides = () => {
    setSides(!sides);
  };

  const handleCheckboxGuardRails = () => {
    setGuardRails(!guardRails);
  };

  const handleCheckboxAngle_360 = () => {
    setAngle_360(!angle_360);
  };

  const handleCheckboxThermal = () => {
    setThermal(!thermal);
  };

  const handleCheckboxToDelete = () => {
    setToDelete(!toDelete);
  };

  const handleCheckboxSubFoldes = () => {
    setSubFolders(!subFolders);
  };

  const [dataTblFolder, setDataTblFolder] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/tbl_asset_spine')
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
        .catch(err => console.log(err));
  
        fetch('http://localhost:8081/tbl_folders')
        .then(res => res.json())
        .then(dataAdvanced => {
          setDataTblFolder(dataAdvanced);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);


const bridge = data.find((bridge) => bridge.bid === parseInt(bridgeID, 10));
const [firstTime,setFirstTime ] = useState(true);
const FoldersSettings = dataTblFolder.find((bridge) => parseInt(bridge.Bid, 10) === parseInt(bridgeID, 10));

useEffect(() => {
  if(FoldersSettings && firstTime === true){
    setGeneral(parseInt(FoldersSettings.General, 10) === 1);
    setCircles(parseInt(FoldersSettings.Circles, 10) === 1);
    setNadir(parseInt(FoldersSettings.Nadir, 10) === 1);
    setSides(parseInt(FoldersSettings.Sides, 10) === 1);
    setGuardRails(parseInt(FoldersSettings.GuardRails, 10) === 1);
    setAngle_360(parseInt(FoldersSettings.Angle_360, 10) === 1);
    setThermal(parseInt(FoldersSettings.Thermal, 10) === 1);
    setToDelete(parseInt(FoldersSettings.To_Delete, 10 === 1));
    setSubFolders(parseInt(FoldersSettings.Sub_Folders,10) === 1);
    setFirstTime(false);
  }
});


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const Directories_values = {
      Bid : bridgeID,
      To_Delete : toDelete,
      General: general,
      Circles: circles,
      Nadir: nadir,
      Sides: sides,
      GuardRails: guardRails,
      Angle_360: angle_360,
      Thermal: thermal,
      Sub_Folders : subFolders
    };

    // Assuming "values" is defined somewhere in your code
    const nextPath = determineNextPath();

    // Pass both "values" and "formData" & Directories_values
    history.push(nextPath, { values, perviousPageData , Directories_values });

};

  // Function to determine the next path based on values
  const determineNextPath = () => {
    if(FoldersSettings){
      return `/TreeFolderConfirm/${bridgeID}/${id}/Edit_mode`;
    }else{
      return `/TreeFolderConfirm/${bridgeID}/${id}`;
    }
  };

  const handleBack = () => {
    if(FoldersSettings){
      if ( values.Lanes != 0){
        history.push(`/Lanes/${values.Bid}/${values.Lanes}/${id}/Edit_mode`, { values, perviousPageData });
      }
      else if (values.Set_Of_Columns != 0 ){
        history.push(`/SetOfColumnsForm/${bridgeID}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`, { values, perviousPageData });
        }
      else if (values.Abutment_Count != 0 ){
        history.push(`/AbutmentCountForm/${bridgeID}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`, { values, perviousPageData });
        }
         else if (values.Span_Count != 0 ){
          history.push(`/SpanCountForm/${bridgeID}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`, { values, perviousPageData });
        }
        else {
          history.push(`/Create/${bridge.name}/${bridge.lat}/${bridge.lon}/${id}/Edit_mode`, { values ,perviousPageData });
        }
    }else{
      if ( values.Lanes != 0){
        history.push(`/Lanes/${values.Bid}/${values.Lanes}/${id}`, { values, perviousPageData });
      }
      else if (values.Set_Of_Columns != 0 ){
        history.push(`/SetOfColumnsForm/${bridgeID}/${values.Set_Of_Columns}/${values.Lanes}/${id}`, { values, perviousPageData });
        }
      else if (values.Abutment_Count != 0 ){
        history.push(`/AbutmentCountForm/${bridgeID}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}`, { values, perviousPageData });
        }
         else if (values.Span_Count != 0 ){
          history.push(`/SpanCountForm/${bridgeID}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}`, { values, perviousPageData });
        }
        else {
          history.push(`/Create/${bridge.name}/${bridge.lat}/${bridge.lon}/${id}`, { values ,perviousPageData });
        }
    }
  }; 

  return (
    <div className="Directories">
      {loading ? (
        <p>Loading...</p>
      ) : bridge ? (
        <div>
          <h2>Asset Spine - {bridge.name}</h2>
              {/* Content for the left side (table) */}
            <div className='createSpineHead'>
                <table style={{ width: "800px", backgroundColor: "#E1E1E1" }}>
                    <tbody>
                        <tr>
                            <td colSpan="6">
                                <img
                                src={bridge.image_url ? bridge.image_url : "/images/No-Image-Available.png"}
                                width={"800"}
                                height={"250px"}
                                alt={bridge.name}
                                />
                                <div className="text-overlay">
                                    <h3>{bridge.name}</h3>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <div className='Directories_table' style={{ padding: "0px", alignItems: "center" }}>
                <table style={{ width: "806px", backgroundColor: "#E1E1E1" }}>
                  <tbody>
                    <tr >
                        <td align='center' colSpan={4}><p>Please provide additional folders you need:</p></td>
                    </tr>
                    <br/>   
                    <tr>
                        <td align='right' > <label>General&nbsp;</label></td>
                        <td align='center'><input type="checkbox" checked={general} onChange={handleCheckboxGeneral} class="sc-gJwTLC ikxBAC"/></td>  
                        <td><label>Circles</label></td>
                        <td><input type="checkbox" checked={circles} onChange={handleCheckboxCircles} class="sc-gJwTLC ikxBAC"/></td>
                    </tr>
                    <tr>
                        <td align='right'> <label>Nadir&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></td>
                        <td align='center'><input type="checkbox" checked={nadir} onChange={handleCheckboxNadir} class="sc-gJwTLC ikxBAC"/></td>  
                        <td><label>360&deg; Images</label></td>
                        <td><input type="checkbox" checked={angle_360} onChange={handleCheckboxAngle_360} class="sc-gJwTLC ikxBAC"/></td>
                    </tr>
                    <tr>
                        <td align='right'> <label>Sides&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label></td>
                        <td align='center'><input type="checkbox" checked={sides} onChange={handleCheckboxSides}  class="sc-gJwTLC ikxBAC" /></td>  
                        <td><label>Guard Rails</label></td>
                        <td><input type="checkbox" checked={guardRails} onChange={handleCheckboxGuardRails} class="sc-gJwTLC ikxBAC"/></td>
                    </tr>
                    <tr>
                        <td align='right'> <label>Thermal </label></td>
                        <td align='center'><input type="checkbox" checked={thermal} onChange={handleCheckboxThermal} class="sc-gJwTLC ikxBAC"/></td>
                        <td> <label>To Delete </label></td>
                        <td><input type="checkbox" checked={toDelete} onChange={handleCheckboxToDelete} class="sc-gJwTLC ikxBAC"/></td>  
                    </tr>
                    <br />
                    <tr alignItems="center">
                      <td colSpan={4} style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <label>Create sub-folders for bearings: </label>
                        <input type="checkbox" checked={subFolders} onChange={handleCheckboxSubFoldes} style={{marginLeft:'30px'}} class="sc-gJwTLC ikxBAC"/>
                      </div>
                      </td>
                    </tr>
                    <br />
                  </tbody>
                </table>
              </div>
          <div className='ConfirmForm'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={handleBack} style={{ background: "grey" }}>Back</button>
                  {!isLoading && (
                    <button onClick={handleSubmit}>Next</button>
                  )}
                  {isLoading && (
                    <button disabled>Working...</button>
                  )}
                </div>
              </div>
        </div>
        
      ) : (
        <p>Asset not found</p>
      )}
      
    </div>
    
  );
}

export default Folders;
