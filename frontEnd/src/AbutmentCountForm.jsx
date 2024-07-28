import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

const AbutmentCountForm = () => {
  const { state } = useLocation();

  // Destructure the data from the state object
  const { values, perviousPageData } = state;
  const [isImageVisible, setImageVisible] = useState(false);
  const { bridgeID, AbutmentCount, SetOfColumns, Lanes, id } = useParams();
  const [loading, setLoading] = useState(true); // To loading data
  const [isLoading, setIsLoading] = useState(false); // To confirm button
  const [numberOfInputs, setNumberOfInputs] = useState(AbutmentCount);
  const history = useHistory();
  console.log(perviousPageData);
  const [formData, setFormData] = useState(() => {
    const initialFormData = [];
    for (let i = 0; i < numberOfInputs; i++) {
      initialFormData.push({
        bridge_id: bridgeID,
        element_number: i,
        element_type1: "abutment",
        element_type2: "Number Of Wall Wings",
        element_type2_quantity: 0, 
        element_type3: "bearings",
        element_type3_quantity: 0, 
        element_type4: null,
        element_type4_quantity: null, 
      });
    }
    return initialFormData;
  });

  useEffect(() => {
    const AbutmentCountTemp = parseInt(AbutmentCount, 10);
    setNumberOfInputs(AbutmentCountTemp || 0);
  }, [AbutmentCount]);

  const [data,setData] = useState([]);
  const [dataTblInitialSettings, setDataTblInitialSettings] = useState([]); 
  const [dataTblAdvancedSettings, setDataTblAdvancedSettings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/tbl_asset_spine')
        .then(res => res.json())
        .then(data => {
            setData(data);
        })
        .catch(err => console.log(err));

        fetch('http://localhost:8081/tbl_initial_settings')
        .then(res => res.json())
        .then(dataInitial => {
          setDataTblInitialSettings(dataInitial);
        })
        .catch(err => console.log(err));
  
        fetch('http://localhost:8081/tbl_advanced_settings')
        .then(res => res.json())
        .then(dataAdvanced => {
          setDataTblAdvancedSettings(dataAdvanced);
          setLoading(false);
        })
        .catch(err => console.log(err));
    }, []);

    useEffect(() => {
      // Flag to check if ChangeFromBackPage() has been called
      let changeFromBackPageCalled = false;
    
      // Check if the fetch operation has completed and then call the Change function
      if (dataTblInitialSettings.length > 0) {
        if(perviousPageData){
        for (let k = 0; k < perviousPageData.length; k++) {
          if (perviousPageData[k].element_type1 === "abutment") {
            console.log("ChangeFromBackPage() called");
            ChangeFromBackPage();
            changeFromBackPageCalled = true; // Set the flag to true
            break;
          }
        }
      }
        // Execute Change() only if ChangeFromBackPage() hasn't been called
        if (!changeFromBackPageCalled) {
          Change();
        } else {
        }
      }
    }, [dataTblInitialSettings, perviousPageData]);

    const handleBack = () => {
      if(isExist){
        if( values.Span_Count != 0 ){
        history.push(`/SpanCountForm/${values.Bid}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`, { values, perviousPageData });
        }
        else{
          history.push(`/Create/${bridge.name}/${bridge.lat}/${bridge.lon}/${id}/Edit_mode`, { values ,perviousPageData });
        }
      }else{
        if( values.Span_Count != 0 ){
          history.push(`/SpanCountForm/${values.Bid}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}`, { values, perviousPageData });
          }
          else{
            history.push(`/Create/${bridge.name}/${bridge.lat}/${bridge.lon}/${id}`, { values ,perviousPageData });
          }
      }
    }; 

    const bridge = data.find((bridge) => bridge.bid === parseInt(bridgeID, 10));
    const isExist = dataTblInitialSettings.find((bridge) => parseInt(bridge.Bid, 10) === parseInt(bridgeID, 10));
    const AdvancedSettings = dataTblAdvancedSettings.filter((bridge) => parseInt(bridge.bridge_id, 10) === parseInt(bridgeID, 10) && bridge.element_type2 === "Number Of Wall Wings");

    const ChangeFromBackPage = () => {
       
      // Create a copy of the current formData
      const updatedFormData = [...formData];
  
      for (let i = 0; i < numberOfInputs; i++) {
        for (let j = 0; j < perviousPageData.length; j++) {
          if (i === perviousPageData[j].element_number && perviousPageData[j].element_type1 === "abutment") {
            // Update the corresponding element in the copied formData
            updatedFormData[i] = {
              bridge_id: bridgeID,
              element_number: i,
              element_type1: "abutment",
              element_type2: "Number Of Wall Wings",
              element_type2_quantity: perviousPageData[j].element_type2_quantity,
              element_type3: "bearings",
              element_type3_quantity: perviousPageData[j].element_type3_quantity,
              element_type4: null,
              element_type4_quantity: null,
            };
          }
        }
      }
      // Set the updated formData to the state
      setFormData(updatedFormData);
    }

    const Change = () => {
          // Create a copy of the current formData
          const updatedFormData = [...formData];
          for (let i = 0; i < numberOfInputs; i++) {
            for (let j = 0; j < AdvancedSettings.length; j++) {
              if (i === AdvancedSettings[j].element_number) {
                // Update the corresponding element in the copied formData
                updatedFormData[i] = {
                  bridge_id: bridgeID,
                  element_number: i,
                  element_type1: "abutment",
                  element_type2: "Number Of Wall Wings",
                  element_type2_quantity: AdvancedSettings[j].element_type2_quantity,
                  element_type3: "bearings",
                  element_type3_quantity: AdvancedSettings[j].element_type3_quantity,
                  element_type4: null,
                  element_type4_quantity: null,
                };
              }
            }
          }
        // Set the updated formData to the state
        setFormData(updatedFormData);
    };


  // Functions to change manually and not by pressing the buttons 

  const handleInputChangeWallWings = (index, value) => {
    // Update the form data based on the input index and the DB form
    const updatedFormData = [...formData];
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2: "Number Of Wall Wings", element_type2_quantity:  value
                              , element_type3: "bearings", element_type3_quantity:  (parseInt(updatedFormData[index]?.element_type3_quantity, 10) || 0), element_type4: null, element_type4_quantity:  null };
    setFormData(updatedFormData);
  };

  const handleInputChangeBearings = (index, value) => {
    // Update the form data based on the input index and the DB form
    const updatedFormData = [...formData];
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2: "Number Of Wall Wings", element_type2_quantity:  (parseInt(updatedFormData[index]?.element_type2_quantity, 10) || 0)
                              , element_type3: "bearings", element_type3_quantity:  value, element_type4: null, element_type4_quantity:  null };
    setFormData(updatedFormData);
  };
  const [newArray, setNewArray ] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Assuming "values" is defined somewhere in your code
    const nextPath = determineNextPath();
      
    // Pass both "values" and "formData" along with the route

    // Pass both "values" and "formData" along with the route
    const newArray = perviousPageData.filter(item => item.element_type2 != "Number Of Wall Wings");
    const temp = Array.from(new Set((newArray || []).concat(formData).map(JSON.stringify))).map(JSON.parse);
    history.push(nextPath, { values, perviousPageData : temp });
    };

  // Function to determine the next path based on values
  const determineNextPath = () => {
    if(isExist){
      if (SetOfColumns != 0) {
        return `/SetOfColumnsForm/${bridgeID}/${SetOfColumns}/${Lanes}/${id}/Edit_mode`;
      } else if ( Lanes != 0){
        return `/Lanes/${bridgeID}/${Lanes}/${id}/Edit_mode`;
      } else {
        return `/Folders/${bridgeID}/${id}/Edit_mode`;
      }
    }else{
      if (SetOfColumns != 0) {
        return `/SetOfColumnsForm/${bridgeID}/${SetOfColumns}/${Lanes}/${id}`;
      } else if ( Lanes != 0){
        return `/Lanes/${bridgeID}/${Lanes}/${id}`;
      } else {
        return `/Folders/${bridgeID}/${id}`;
      }
    }

  };


  const renderInputs = () => {
    const inputs = [];
  
    for (let i = 0; i < numberOfInputs; i++) {
      inputs.push(
        <div key={i} className="input-row-abutment">
          <label className="input-label-abutment">
            Abutment {i + 1}:
          </label>
          <div className="input-group">
            <div className="input-item" >
              <p>Number of Wall Wings:</p>
              <div className="input-controls">
                <input
                  type="number"
                  min="0"
                  placeholder="Enter quantity..."
                  required
                  value={formData[i]?.element_type2_quantity}
                  onChange={(e) => handleInputChangeWallWings(i, e.target.value)}
                />
                <button type="button" onClick={() => handleIncrement(i)} style={{ backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer",  marginLeft: "10px" }}>
                  <img src="/images/plus.png" alt="plus" style={{ width: '30px', height: '30px', backgroundColor: "#E1E1E1" }} />
                </button>
                <button type="button" onClick={() => handleDecrement(i)} style={{ backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer",  marginLeft: "10px" }}>
                  <img src="/images/minus.png" alt="minus" style={{ width: '30px', height: '30px', backgroundColor: "#E1E1E1" }} />
                </button>
              </div>
            </div>
            <div className="input-item">
              <p>Number of Bearings:</p>
              <div className="input-controls">
                <input
                  type="number"
                  min="0"
                  placeholder="Enter quantity..."
                  required
                  value={formData[i]?.element_type3_quantity}
                  onChange={(e) => handleInputChangeBearings(i, e.target.value)}
                />
                <button type="button" onClick={() => handleIncrementBearings(i)} style={{ backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer",  marginLeft: "10px" }}>
                  <img src="/images/plus.png" alt="plus" style={{ width: '30px', height: '30px', backgroundColor: "#E1E1E1" }} />
                </button>
                <button type="button" onClick={() => handleDecrementBearings(i)} style={{ backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer",  marginLeft: "10px" }}>
                  <img src="/images/minus.png" alt="minus" style={{ width: '30px', height: '30px', backgroundColor: "#E1E1E1" }} />
                </button>
              </div>
              { i < numberOfInputs - 1 && (
                  <p style={{ width: "100%", height: "1px", backgroundColor: "white", margin: "10px 0" }}></p>
              )}

            </div>
          </div>
        </div>
        
      );
    }
    return <div className="centered-container">{inputs}</div>;
  };
  
  
  // Functions to change values ​​by pressing the buttons

  const handleIncrement = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2_quantity: (parseInt(updatedFormData[index]?.element_type2_quantity, 10) || 0) + 1,
                                element_type2: "Number Of Wall Wings", element_type3: "bearings", element_type3_quantity: (parseInt(updatedFormData[index]?.element_type3_quantity, 10) || 0),
                                element_type4: null, element_type4_quantity:  null  };
    setFormData(updatedFormData);
  };
  
  const handleDecrement = (index) => {
    const updatedFormData = [...formData];
    const currentValue = parseInt(updatedFormData[index]?.element_type2_quantity, 10) || 0;
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2_quantity:  Math.max(currentValue - 1, 0),
                                element_type2: "Number Of Wall Wings", element_type3: "bearings", element_type3_quantity: (parseInt(updatedFormData[index]?.element_type3_quantity, 10) || 0),
                                element_type4: null, element_type4_quantity:  null };
    setFormData(updatedFormData);
  };

  const handleIncrementBearings = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2_quantity: (parseInt(updatedFormData[index]?.element_type2_quantity, 10) || 0),
            element_type2: "Number Of Wall Wings", element_type3: "bearings", element_type3_quantity:  (parseInt(updatedFormData[index]?.element_type3_quantity, 10) || 0) + 1,
            element_type4: null, element_type4_quantity:  null  };
    setFormData(updatedFormData);
  };
  
  const handleDecrementBearings = (index) => {
    const updatedFormData = [...formData];
    const currentValue = parseInt(updatedFormData[index]?.element_type3_quantity, 10) || 0;
    updatedFormData[index] = { bridge_id: bridgeID,element_number: index, element_type1: "abutment", element_type2_quantity:  (parseInt(updatedFormData[index]?.element_type2_quantity, 10) || 0),
            element_type2: "Number Of Wall Wings", element_type3: "bearings", element_type3_quantity: Math.max(currentValue - 1, 0),
            element_type4: null, element_type4_quantity:  null };
    setFormData(updatedFormData);
  };

  return (
    <div className="spanForm">
      {loading ? (
      <p>Loading...</p>
        ) : bridge ? (
          <div>
          <h2>Abutment Info - {bridge.name}</h2>
          <div className='spanFormTable'>
            <table style={{ width: "800px", backgroundColor: "#E1E1E1"}}>
              <tbody>
                <tr>
                  <td colSpan="6">
                    <img
                      src={bridge.image_url ? bridge.image_url : "/images/No-Image-Available.png"}
                      width={"800"}
                      height={"250px"}
                      alt={bridge.name}
                      />
                  </td>
                </tr>
                <tr>
                  <td >{renderInputs()}</td>
                </tr>
                <br />
          <tr>
              <td colSpan={3}>
                  <p style={{fontSize:"15px", fontWeight:"bold"}}>bridge components  <span
                      onMouseEnter={() => setImageVisible(true)}
                      onMouseLeave={() => setImageVisible(false)}
                      style={{ color: 'darkorange', display: 'inline', cursor: 'pointer' }}
                      >
                      <button className="hover-button" id="showHelp" style={{borderRadius:"7px", border:"none", fontWeight:"bold", width:"25px", height:"25px"}}>?</button>
                      </span></p>
              </td>
          </tr>
          <br />
              </tbody>
            </table> 
          </div>
          <div className='ConfirmForm'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <button onClick={handleBack} style={{background:"grey"}}>Back</button>
              {!isLoading &&  (
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
                {isImageVisible && (
        <img
          src="/images/bridge_elements_3.png"
          alt="Centered Image"
          style={{
            display: 'block',
            position: 'fixed',
            top: '40%',
            left: '85%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
      </div>
  );  
};

export default AbutmentCountForm;
