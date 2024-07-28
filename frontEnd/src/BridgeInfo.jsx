import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import CsvGenerator from './CsvGenerator';
import { BuildTreeSpine } from './BuildTreeSpine';
import FolderTree from './FolderTree';
import "./Modal.css";

const BridgeInfo = () => {
    const { name, bid, id } = useParams();
    const history = useHistory();
console.log(bid);
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
    console.log(bridge);
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
    return (
        <div className="bridge-details">
    {loading ? (
        <p>Loading...</p>
    ) : bridge ? (
               <article>
               <h2>{bridge.name}</h2>
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
                       <tr style={{backgroundColor:"#E1E1E1"}}>
                           <td>{bridge.description}</td>
                           <td>{bridge.location}</td>
                           <td>{bridge.lat}</td>
                           <td>{bridge.lon}</td>
                           <td>{bridge.spans}</td>
                           <td>{bridge.structure_name}</td>
                       </tr>
                   </table>
                   <br />
               <div className="container-bridgeInfo">
                   <div className="left-part">
                       <table>
                           <tr>
                               <td><img src={bridge.image_url ? bridge.image_url : '/images/No-Image-Available.png'} width={"500px"} height={"250px"} /></td>
                               <td>
                                   {!isExist && <button className="button" onClick={() => onClickCreateSpine(bridge.name, bridge.lat, bridge.lon)} ><span>Create Asset Spine</span></button>}
                                   {isExist && <button className="button"  onClick={() => onClickEditSpine(bridge.bid)} style={{ backgroundColor: "gray", verticalAlign:"middle"}}><span>Edit Tree Spine</span></button>}   
                                   <br />
                                   {isExist && <button className="button"  onClick={handleEditWarning} style={{ backgroundColor: "darkorange", verticalAlign:"middle"}}><span>Recreate Asset Spine</span></button>}   
                                   <br />
                                   {isExist && <CsvGenerator CSVBridge={bridge} ImgOrButton='Button' />}
                               </td>
                           </tr>
                       </table>
                   </div>
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
          {editWarning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Confirmation</h2>
            <p>Editing the data will make irreversible changes, in addition all the changes you made manually will be deleted.</p>
            <br />
            <p> Are you sure you want to proceed?</p>
            <br />
            <button className="close-modal" style={{ border: "none", backgroundColor: "#f1f1f1" }} onClick={handleEditWarning}>
              <img src="/images/clear.png" width={'20px'} alt="Close" />
            </button>
            <div className='ConfirmForm'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={() => handleConfirmation(true)} style={{backgroundColor:"darkorange"}}>Edit</button>
                  <button onClick={() => setEditWarning(!editWarning)} style={{backgroundColor:"green"}}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
</div>
    )
}


export default BridgeInfo;