import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation} from 'react-router-dom';
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Create = () => {
  // Extract the state (including values) from the location object
  const { state } = useLocation();

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { bid, lat, lon, id} = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataEdit,setDataEdit] = useState([]);
  const [dataSurvey,setdataSurvey] = useState([]);
  const { values ,perviousPageData } = state || {};
  const [isImageVisible, setImageVisible] = useState(false);
  ////////// Modal - popup /////////////////

   // New state for confirmation popup
  const [modalDirection, setModalDirection] = useState(false);

  const toggleModalDirection = () => {
    setModalDirection(!modalDirection);
  };

  if(modalDirection) {
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

  const [changeWarning, setChangeWarning] = useState(false);

  const toggleChangeWarning = () => {
    setChangeWarning(!changeWarning);
    setIsLoading(false);
  };

  if(changeWarning) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  ////////////////////////////
  
  useEffect(() => {
    fetch('http://localhost:8081/tbl_asset_spine')
    .then(res => res.json())
    .then(data => {
        setData(data);
    })
    .catch(err => console.log(err));

    fetch('http://localhost:8081/tbl_initial_settings')
    .then(res => res.json())
    .then(dataEdit => {
        setDataEdit(dataEdit);
    })
    fetch('http://localhost:8081/tbl_survey')
    .then(res => res.json())
    .then(dataSurvey => {
        setdataSurvey(dataSurvey);
        setLoading(false);
    })
    .catch(err => console.log(err))
}, []);

    const bridge = data.find((bridge) => parseInt(bridge.bid, 10) === parseInt(bid, 10));
    const isExist = dataEdit.find((bridge) => bridge.Bid === bid);

  const allSurveyID = dataSurvey.find((bridge1) => parseInt(bridge1.bid, 10) === parseInt(bridge.bid, 10) && bridge1.process_template_name === 'Initial inspection');


    const [spanCount, setSpanCount] = useState('0');
    const [abutmentCount, setAbutmentCount] = useState('0');
    const [setOfColumns, setSetOfColumns] = useState('0');
    const [archesCount, setArchesCount] = useState('0');
    const [archesConnectors, setArchesConnectors] = useState('0');
    const [lanes, setLanes] = useState('0');
    const [parapetsCount, setParapetsCount] = useState('0');
    const surveyID = allSurveyID?.id || "";
    const [direction, setDirection] = useState("")
    const [firstTime,setFirstTime ] = useState(true);

    useEffect(() => {
        if(values && firstTime === true){
            setSpanCount(parseInt(values.Span_Count, 10));
            setAbutmentCount(parseInt(values.Abutment_Count, 10));
            setSetOfColumns(parseInt(values.Set_Of_Columns, 10));
            setArchesCount(parseInt(values.Arches_Count, 10));
            setArchesConnectors(parseInt(values.Arches_Connectors, 10));
            setLanes(parseInt(values.Lanes, 10));
            setParapetsCount(parseInt(values.Parapets_Count, 10));
            setDirection(values.Direction);
            setFirstTime(false);
        }
        else if(isExist && firstTime === true){
            setSpanCount(parseInt(isExist.Span_Count, 10));
            setAbutmentCount(parseInt(isExist.Abutment_Count, 10));
            setSetOfColumns(parseInt(isExist.Set_Of_Columns, 10));
            setArchesCount(parseInt(isExist.Arches_Count, 10));
            setArchesConnectors(parseInt(isExist.Arches_Connectors, 10));
            setLanes(parseInt(isExist.Lanes, 10));
            setParapetsCount(parseInt(isExist.Parapets_Count, 10));
            setDirection(isExist.Direction);
            setFirstTime(false);
        }
    });


  
  const onClickspanCountPlus = (e) => {
    e.preventDefault();
    if (spanCount === null || spanCount === '') {
        setSpanCount('0');
    } else {
        setSpanCount(parseInt(spanCount, 10) + 1);
    }
};

const onClickspanCountMinus = (e) => {
    e.preventDefault();
    if (spanCount === null || spanCount === '' || parseInt(spanCount, 10) === 0) {
    setSpanCount('0');
    } else {
    setSpanCount(parseInt(spanCount, 10) - 1);
    }
};



const onClickAbutmentCountPlus = (e) => {
    e.preventDefault();
    if (abutmentCount === null || abutmentCount === '') {
        setAbutmentCount('0');
    } else {
        setAbutmentCount(parseInt(abutmentCount, 10) + 1);
    }
};

const onClickAbutmentCountMinus = (e) => {
    e.preventDefault();
    if (abutmentCount === null || abutmentCount === '' || parseInt(abutmentCount, 10) === 0) {
        setAbutmentCount('0');
    } else {
        setAbutmentCount(parseInt(abutmentCount, 10) - 1);
    }
};



const onClickSetOfColumnsPlus = (e) => {
    e.preventDefault();
    if (setOfColumns === null || setOfColumns === '') {
        setSetOfColumns('0');
    } else {
        setSetOfColumns(parseInt(setOfColumns, 10) + 1);
    }
};

const onClickSetOfColumnsMinus = (e) => {
    e.preventDefault();
    if (setOfColumns === null || setOfColumns === '' || parseInt(setOfColumns, 10) === 0) {
        setSetOfColumns('0');
    } else {
        setSetOfColumns(parseInt(setOfColumns, 10) - 1);
    }
};



const onClickArchesCountPlus = (e) => {
    e.preventDefault();
    if (archesCount === null || archesCount === '') {
        setArchesCount('0');
    } else {
        setArchesCount(parseInt(archesCount, 10) + 1);
    }
};

const onClickArchesCountMinus = (e) => {
    e.preventDefault();
    if (archesCount === null || archesCount === '' || parseInt(archesCount, 10) === 0) {
        setArchesCount('0');
    } else {
        setArchesCount(parseInt(archesCount, 10) - 1);
    }
};



const onClickArchesConnectorsPlus = (e) => {
    e.preventDefault();
    if (archesConnectors === null || archesConnectors === '') {
        setArchesConnectors('0');
    } else {
        setArchesConnectors(parseInt(archesConnectors, 10) + 1);
    }
};

const onClickArchesConnectorsMinus = (e) => {
    e.preventDefault();
    if (archesConnectors === null || archesConnectors === '' || parseInt(archesConnectors, 10) === 0) {
        setArchesConnectors('0');
    } else {
        setArchesConnectors(parseInt(archesConnectors, 10) - 1);
    }
};



const onClicksetLanesPlus = (e) => {
    e.preventDefault();
    if (lanes === null || lanes === '') {
        setLanes('0');
    } else {
        setLanes(parseInt(lanes, 10) + 1);
    }
};

const onClicksetLanesMinus = (e) => {
    e.preventDefault();
    if (lanes === null || lanes === '' || parseInt(lanes, 10) === 0) {
        setLanes('0');
    } else {
        setLanes(parseInt(lanes, 10) - 1);
    }
};


const onClickParapetsCountPlus = (e) => {
    e.preventDefault();
    if (parapetsCount === null || parapetsCount === '') {
        setParapetsCount('0');
    } else {
        setParapetsCount(parseInt(parapetsCount, 10) + 1);
    }
};

const onClickParapetsCountMinus = (e) => {
    e.preventDefault();
    if (parapetsCount === null || parapetsCount === '' || parseInt(parapetsCount, 10) === 0) {
        setParapetsCount('0');
    } else {
        setParapetsCount(parseInt(parapetsCount, 10) - 1);
    }
};


const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const values_edit = {
      Bid: bridge.bid,
      name: name,
      Survey_ID: surveyID,
      Bridge_Type: bridge.bridge_type,
      Structure_Name: bridge.structure_name,
      Main_Road: bridge.field1,
      Span_Count: spanCount,
      Abutment_Count: abutmentCount,
      Set_Of_Columns: setOfColumns,
      Arches_Count: archesCount,
      Arches_Connectors: archesConnectors,
      Lanes: lanes,
      Parapets_Count: parapetsCount,
      Direction : direction
    };
    if(direction === "")
    {
        setModalDirection(!modalDirection);
        return setIsLoading(false);
    }
    if(parseInt(spanCount, 10) === 0 && parseInt(abutmentCount, 10) === 0 && parseInt(setOfColumns, 10) === 0 && parseInt(lanes, 10) === 0)
    {
        setElertWrning(!elertWrning);
        return setIsLoading(false);
    }
    if(!isExist){
        const nextPath = determineNextPath(values_edit);
        history.push(nextPath, { values : values_edit });
    }else{
        if(parseInt(isExist.Span_Count, 10) != spanCount ||
        parseInt(isExist.Abutment_Count, 10) != abutmentCount ||
        parseInt(isExist.Set_Of_Columns, 10) != setOfColumns ||
        parseInt(isExist.Arches_Count, 10) != archesCount ||
        parseInt(isExist.Arches_Connectors, 10) != archesConnectors ||
        parseInt(isExist.Lanes, 10) != lanes ||
        parseInt(isExist.Parapets_Count, 10) != parapetsCount ||
        isExist.Direction != direction
        ){
            setChangeWarning(true);
        }
        else{
            const nextPath = determineNextPath(values_edit);
            history.push(nextPath, { values : values_edit, perviousPageData });
            }
        }
    };

// Function to determine the next path based on values
const determineNextPath = (values) => {
    if(isExist){
        if (values.Span_Count != 0) {
            return `/SpanCountForm/${values.Bid}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`;
          } else if (values.Abutment_Count != 0) {
            return `/AbutmentCountForm/${values.Bid}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`;
          } else if (values.Set_Of_Columns != 0) {
            return `/SetOfColumnsForm/${values.Bid}/${values.Set_Of_Columns}/${values.Lanes}/${id}/Edit_mode`;
          } else if (values.Lanes != 0) {
            return `/Lanes/${values.Bid}/${values.Lanes}/${id}/Edit_mode`;
          } else {
            return `/Folders/${values.Bid}/${id}/Edit_mode`;
          }
    }else{
        if (values.Span_Count != 0) {
            return `/SpanCountForm/${values.Bid}/${values.Span_Count}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}`;
          } else if (values.Abutment_Count != 0) {
            return `/AbutmentCountForm/${values.Bid}/${values.Abutment_Count}/${values.Set_Of_Columns}/${values.Lanes}/${id}`;
          } else if (values.Set_Of_Columns != 0) {
            return `/SetOfColumnsForm/${values.Bid}/${values.Set_Of_Columns}/${values.Lanes}/${id}`;
          } else if (values.Lanes != 0) {
            return `/Lanes/${values.Bid}/${values.Lanes}/${id}`;
          } else {
            return `/Folders/${values.Bid}/${id}`;
          }
    }
};


const handleConfirmation = (confirmed) => {
    setIsLoading(true);
  
    const values_edit = {
      Bid: bridge.bid,
      name: name,
      Survey_ID: surveyID,
      Bridge_Type: bridge.bridge_type,
      Structure_Name: bridge.structure_name,
      Main_Road: bridge.field1,
      Span_Count: spanCount,
      Abutment_Count: abutmentCount,
      Set_Of_Columns: setOfColumns,
      Arches_Count: archesCount,
      Arches_Connectors: archesConnectors,
      Lanes: lanes,
      Parapets_Count: parapetsCount,
      Direction : direction
    };

    // Handle user's response from the confirmation popup
    if (confirmed) {
      // User clicked OK, redirect to the home page
      const nextPath = determineNextPath(values_edit);
      history.push(nextPath, { values : values_edit, perviousPageData });
    } else {
      // User clicked Cancel
      setIsLoading(false);
    }
    // Close the confirmation popup
    setChangeWarning(false);
  };
  /* Google Map */
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAFQOvZvXyFknkXTButx5u9jd3UXVgNBs8", // Manam Applications API key
  });
  
  return (
    <div className="create">
      {loading ? (
        <p>Loading...</p>
      ) : bridge ? (
        <div>
          <h2>Asset Spine - {bridge.name}</h2>
          <div className="flex-container">
            <div className="left-container">
              <div className='createSpineHead'>
                <table style={{  backgroundColor: "#E1E1E1" }}>
                  <tbody>
                  <tr>
                                <td colSpan="6">
                                    <img
                                    src={bridge.image_url ? bridge.image_url : "/images/No-Image-Available.png"}
                                    width={"600px"}
                                    height={"250px"}
                                    alt={bridge.name}
                                    />
                                    <div className="text-overlay">
                                        <h3>{bridge.name}</h3>
                                    </div>
                                </td>
                                </tr>
                                <tr>
                                    <th align='left'><p>Bid:</p></th>
                                    <td><p>{bridge.bid}</p></td>
                                    <th align='left'><p>Survey ID:</p></th>
                                    <td><p>{surveyID}</p></td>
                                    <th><p>Asset Type:</p></th>
                                    <td><p>{bridge.bridge_type}</p></td>
                                </tr>
                                <tr>
                                    <th align='left'><p>Structure Name:</p></th>
                                    <td><p>{bridge.structure_name}</p></td>
                                    <th align='left'><p>Main Road:</p></th>
                                    <td ><p>{bridge.field1}</p></td>
                                </tr>
                                <tr>
                                    <td style={{width: "100%", 
                                                height: "1px",
                                                backgroundColor: "white",
                                                margin: "10px 0"
                                                }} colSpan="6"></td>
                                </tr>
                  </tbody>
                </table>
              </div>
              <div className='createSpineHead1' style={{ padding: "0px", alignItems: "center" }}>
                <table style={{ width: "600px", backgroundColor: "#E1E1E1" }}>
                  <tbody>
                  <tr>
                                        <td style={{width:"150px"}}>
                                            <label>Span Count:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={spanCount}
                                                onChange={(e) => setSpanCount(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px'}}
                                                />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClickspanCountPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}} />
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                        <   button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>  
                                                <img src="/images/minus.png" alt="my image" onClick={onClickspanCountMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <label style={{ marginRight: '8px' }}>Abutment Count:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={abutmentCount}
                                                onChange={(e) => setAbutmentCount(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                            <img src="/images/plus.png" alt="my image" onClick={onClickAbutmentCountPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                        <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClickAbutmentCountMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <label style={{ marginRight: '8px' }}>Set Of Columns:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={setOfColumns}
                                                onChange={(e) => setSetOfColumns(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClickSetOfColumnsPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClickSetOfColumnsMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <label style={{ marginRight: '8px' }}>Arches Count:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={archesCount}
                                                onChange={(e) => setArchesCount(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClickArchesCountPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClickArchesCountMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"200px"}}>
                                            <label style={{ marginRight: '8px' }}>Arches Connectors:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={archesConnectors}
                                                onChange={(e) => setArchesConnectors(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClickArchesConnectorsPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClickArchesConnectorsMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <label style={{ marginRight: '8px' }}>Carriageways:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={lanes}
                                                onChange={(e) => setLanes(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClicksetLanesPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClicksetLanesMinus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{width:"150px"}}>
                                            <label style={{ marginRight: '8px' }}>Parapets Count:</label>
                                        </td>
                                        <td style={{width:"200px"}}>
                                            <input
                                                type="number"
                                                min="0"
                                                required
                                                value={parapetsCount}
                                                onChange={(e) => setParapetsCount(e.target.value)}
                                                onKeyDown={(e) => {
                                                if (e.key === '-') {
                                                    e.preventDefault();
                                                }
                                                }}
                                                style={{ marginRight: '8px' }}
                                            />  
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/plus.png" alt="my image" onClick={onClickParapetsCountPlus} style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/> 
                                            </button>
                                        </td>
                                        <td style={{width:"30px", textAlign:'center'}}>
                                            <button style={{backgroundColor: "transparent", border: "none", padding: "0" ,cursor: "pointer"}}>
                                                <img src="/images/minus.png" alt="my image" onClick={onClickParapetsCountMinus}  style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                                            </button>
                                        </td>
                                    </tr>
                                    <br></br>
                                    <tr>
                                        <td colSpan={3}>
                                            <p style={{fontSize:"15px",fontWeight:"bold"}}>bridge components  <span
                                                onMouseEnter={() => setImageVisible(true)}
                                                onMouseLeave={() => setImageVisible(false)}
                                                style={{ color: 'darkorange', display: 'inline', cursor: 'pointer' }}
                                                >
                                                <button className="hover-button" id="showHelp" style={{borderRadius:"7px", border:"none", fontWeight:"bold", width:"25px", height:"25px"}}>?</button>
                                                </span></p>
                                        </td>
                                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
            <div className="right-container">
              {/* Content for the right side (map) */}
              <div className="googleMaps" style={{ width: '80%', height: '92%'}}>
                {!isLoaded ? (
                  <h1>Loading...</h1>
                ) : (
                  <GoogleMap
                    mapContainerClassName="map-container"
                    center={{ lat: parseFloat(lat), lng: parseFloat(lon) }}
                    zoom={18}
                    mapTypeId='satellite'
                  >
                  </GoogleMap>
                )}
              </div>
                <div className="radio-buttons" style={{float: 'right'}}>
                    <img src="/images/compass.png" alt="compass" style={{width:'30px', height:'30px', backgroundColor:"#E1E1E1"}}/>
                    <label>Cardinal directions (sides) for structure:</label>
                    <input type="radio" id="N/S" name="direction" value="N/S" checked={direction === "N/S"} onChange={(e) => setDirection(e.target.value)}></input>  
                    <label>N/S</label>
                    <input type="radio" id="E/W" name="direction" value="E/W" checked={direction === "E/W"} onChange={(e) => setDirection(e.target.value)} />
                    <label>E/W</label>
                </div>
            </div>
          </div>
          <div className='ConfirmForm'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
      {modalDirection && (
        <div className="modal">
          <div className="modal-content">
            <h2>Warning</h2>
            <p>
                Please set Cardinal directions (sides) for structure
            </p>
            <button className="close-modal" style={{border:"none", backgroundColor:"#f1f1f1"}} onClick={toggleModalDirection}>
            <img src = "/images/clear.png" width={'20px'}/>
            </button>
          </div>
        </div>
      )}
       {elertWrning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Warning</h2>
            <p>
            The form cannot be submitted when - Span Count, Abutment Count, Set Of Columns and Lanes are equal to 0 
            </p>
            <button className="close-modal" style={{border:"none", backgroundColor:"#f1f1f1"}} onClick={toggleElertWrning}>
            <img src = "/images/clear.png" width={'20px'}/>
            </button>
          </div>
        </div>
      )}
{changeWarning && (
  <div className="modal">
    <div className="modal-content">
      <h2>Confirmation</h2>
      <p>Are you sure you want to submit the form?</p>
      <button className="close-modal" style={{ border: "none", backgroundColor: "#f1f1f1" }} onClick={toggleChangeWarning}>
        <img src="/images/clear.png" width={'20px'} alt="Close" />
      </button>
      <div className='ConfirmForm'>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button onClick={() => handleConfirmation(false)} style={{backgroundColor:"darkorange"}}>Cancel</button>
            <button onClick={() => handleConfirmation(true)} style={{backgroundColor:"green"}}>OK</button>
        </div>
      </div>
    </div>
  </div>
)}
{isImageVisible && (
        <img
          src="/images/bridge_elements_3.png"
          alt="Centered Image"
          style={{
            display: 'block',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
    
  );
}

export default Create;
