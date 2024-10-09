import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CsvGenerator from './CsvGenerator';
import { BuildTreeSpine } from './BuildTreeSpine';
import FolderTree from './FolderTree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './CSS/BridgeInfo.css';
import Popup from "./Popup";

/*
 * This component, BridgeInfo, displays detailed information about a specific bridge asset.
 * It fetches data about the bridge, its settings, and its structure from the backend,
 * and provides several actions like updating the details, deleting the asset, or creating/editing
 * the bridge spine (structure). 
 * 
 * The component is divided into several main sections:
 * 1. Data Fetching: Fetches data from the backend (bridge details, initial settings, and folders).
 * 2. Event Handlers: Defines various functions to handle actions such as navigation, deletion, and creation of the bridge spine.
 * 3. Tree Spine Structure: Displays the structure of the bridge in a tree format using the FolderTree component.
 * 4. Popup Modals: Shows confirmation popups for actions like editing or deleting the asset.
 * 5. Render: The render section contains the JSX layout, displaying the bridge details, buttons for actions, and conditionally rendered sections based on the existence of data.
 */

const BridgeInfo = () => {
    const { name, bid, id } = useParams();
    const history = useHistory();

    const [data,setData] = useState([]);
    const [dataEdit,setDataEdit] = useState([]);
    const [dataTblFolder, setDataTblFolder] = useState([]);
    const [loading, setLoading] = useState(true);
    
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
        .catch(err => console.log(err))

        fetch('http://localhost:8081/tbl_final_tree_spine')
        .then(res => res.json())
        .then(data => {
        setDataTblFolder(data);
    })
    .catch(err => console.log(err));
    }, []);

    const bridge = data.find((bridge) => parseInt(bridge.bid, 10) === parseInt(bid, 10));
    const isExist = dataEdit.find((bridge) => bridge.Bid === bid);

    const onClickCreateSpine = (bridgeName,lat,lon) => {
        if(isExist){
            history.push(`/Create/${bid}/${lat}/${lon}/${id}/Edit_mode`);
        }else{
            history.push(`/Create/${bid}/${lat}/${lon}/${id}`);
        }
      };

      const onClickEditSpine = (bridgeID) => {
        history.push(`/EditSpine/${bridgeID}/${id}/Edit_mode`);
      };

    //////////// Tree Spine //////////////////////////////

    const treeSpine = dataTblFolder.filter((asset) => asset.bridge_id === parseInt(bid, 10));
    const pathFoldersArray = treeSpine.map(item => item.path_folder);
    const treeTemp = BuildTreeSpine({values : pathFoldersArray, perviousPageData : null, Directories_values : null, edit : true});
    const [ tree, setTree] = useState([]);
    const [hasConditionBeenMet, setConditionMet] = useState(false);

    useEffect(() => {
        if (treeTemp.length > 0 && !hasConditionBeenMet) {
        setTree(treeTemp);
        setLoading(false);

        // Set the condition to true to prevent useEffect from running again
        setConditionMet(true);
        }
        if(!isExist && !hasConditionBeenMet){
            setLoading(false);
        }
    }, [treeTemp, hasConditionBeenMet]); 

    const [lastSelectedNodeName, setLastSelectedNodeName] = useState('');
    const [additionalText, setAdditionalText] = useState('');
    const handleNodeSelect = (nodeName) => {
    setLastSelectedNodeName(nodeName);
    };

    const [addAction, setAddAction] = useState(true);
    const [editAction, setEditAction] = useState(false);

    const handleActionSelect = (action) => {
        if( action === "Add"){
            setAddAction(true);
            setEditAction(false);
        }
        if( action === "Edit"){
            setAddAction(false);
            setEditAction(true);
        }
        if( action === "Delete"){
            setDeleteWarning(true);
        }
    };

    const [editWarning, setEditWarning] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState(false);

    const handleEditWarning  = () => {
      setEditWarning(!editWarning);
    }

    if(editWarning) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

      const handleConfirmation = (confirmed) => {
        if(confirmed){
            onClickCreateSpine(bridge.name, bridge.lat, bridge.lon);
        }
      }

      const handleDeleteAsset = () => {
        axios.delete(`http://localhost:8081/tbl_folders/${bid}`)
          .then((res) => {
            console.log("Deleted from tbl_folders");
          })
          .catch(err => console.log(err));
      
        axios.delete(`http://localhost:8081/tbl_initial_settings/${bid}`)
          .then((res) => {
            console.log("Deleted from tbl_initial_settings");
          })
          .catch(err => console.log(err));
      
        axios.delete(`http://localhost:8081/tbl_advanced_settings/${bid}`)
          .then((res) => {
            console.log("Deleted from tbl_advanced_settings");
          })
          .catch(err => console.log(err));

        axios.delete(`http://localhost:8081/tbl_asset_spine/${bid}`)
        .then((res) => {
        console.log("Deleted from tbl_asset_spine");
        })
        .catch(err => console.log(err));
      
        axios.delete(`http://localhost:8081/tbl_final_tree_spine/${bid}`)
          .then((res) => {
            console.log("Deleted from tbl_final_tree_spine");
            history.push(`/Home/${id}`);
          })
          .catch(err => console.log(err));
      };

      const handleNavigateToEdit = () => {
        history.push(`/EditAsset/${bid}/${id}`);
      };
    
    return (
        <div className="bridge-details">
    {loading ? (
        <p>Loading...</p>
    ) : bridge ? (
               <article>
               <h2>{bridge.name}</h2>
               <div className="table-button-container">
                    <table align="center" className="bridge-info-table" max-width="100%" style={{width:'100%', overflowX:'auto'}}>
                        <thead>
                            <tr>
                                <th style={{backgroundColor:"grey", color:"white"}}>Description</th>
                                <th style={{backgroundColor:"grey", color:"white"}}>Location</th>
                                <th style={{backgroundColor:"grey", color:"white"}}>Latitude</th>
                                <th style={{backgroundColor:"grey", color:"white"}}>Longitude</th>
                                <th style={{backgroundColor:"grey", color:"white"}}>Spans</th>
                                <th style={{backgroundColor:"grey", color:"white"}}>Structure Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{backgroundColor:"#E1E1E1"}}>
                                <td>{bridge.description}</td>
                                <td>{bridge.location}</td>
                                <td>{bridge.lat}</td>
                                <td>{bridge.lon}</td>
                                <td>{bridge.spans}</td>
                                <td>{bridge.structure_name}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="buttons-container">
                        <button style={{backgroundColor:"darkOrange"}} onClick={handleNavigateToEdit}>
                          <FontAwesomeIcon icon={faEdit} style={{marginRight: '8px'}} />
                          Update Details
                        </button>
                        <button style={{backgroundColor:"red"}} onClick={() =>setDeleteWarning(true)}>
                            <FontAwesomeIcon icon={faTrash} style={{marginRight: '8px'}} />
                            Delete Asset
                        </button>
                    </div>
                </div>
                   <br />
               <div className="container-bridgeInfo">
                   <div className="left-part">
                       <table>
                           <tr>
                               <td>
                               <img 
                                  src={`http://localhost:8081/image/${bridge.bid}?timestamp=${new Date().getTime()}`}  // Add a timestamp to the URL
                                  width={"500px"} 
                                  height={"250px"} 
                                  onError={(e) => e.target.src = '/images/No-Image-Available.png'}  // If there is an error, replace with a default image
                                  alt="Asset"
                                />
                               </td>
                               <td>
                               {!isExist && (
                                    <button className="button-common button-green" onClick={() => onClickCreateSpine(bridge.name, bridge.lat, bridge.lon)}>
                                        <span>Create Asset Spine</span>
                                    </button>
                                )}
                                {isExist && (
                                    <button className="button-common button-gray" onClick={() => onClickEditSpine(bridge.bid)}>
                                        <span>Edit Tree Spine</span>
                                    </button>
                                )}   
                                <br />
                                {isExist && (
                                    <button className="button-common button-orange" onClick={handleEditWarning}>
                                        <span>Recreate Asset Spine</span>
                                    </button>
                                )}   
                                <br />
                                   {isExist && <CsvGenerator CSVBridge={bridge} ImgOrButton='Button' />}
                               </td>
                           </tr>
                       </table>
                   </div>
                   <div className="separator"></div>
                   {isExist && <div className="right-part">
                   <br />
                   <h2>Folder Tree Spine </h2>
                   <br />
                   <FolderTree tree={tree} onNodeSelect={handleNodeSelect} onAction={handleActionSelect} view={true} /> 
                   <br />
                   </div>}
               </div>
               </article>
    ) : (
        <p>Asset not found</p>
    )}
          {editWarning && <Popup 
                              title="Edit Confirmation" 
                              content={
                                  <>
                                      <p>Editing the data will make irreversible changes, in addition all the changes you made manually will be deleted.</p>
                                      <p>Are you sure you want to proceed?</p>
                                  </>
                              }
                              onClose={() => setEditWarning(!editWarning)} 
                              onConfirm={() => handleConfirmation(true)} 
                          />}
      {deleteWarning && <Popup title="Deletion alert" content="This operation is irreversible. Are you sure you want to delete?" onClose={()=>setDeleteWarning(false)} onConfirm={handleDeleteAsset} />}
</div>
    )
}


export default BridgeInfo;