import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import "./Modal.css";
import FolderTree from './FolderTree';
import { BuildTreeSpine } from './BuildTreeSpine';

const EditSpine = () => {
  const { bridgeID , id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [dataTblFolder, setDataTblFolder] = useState([]);
  const [backOption, setBackOption] = useState(true);
  const [ tree, setTree] = useState([]);
  ////////// Modal - popup /////////////////

  const [remainingTime, setRemainingTime] = useState(5);
  const [modal, setModal] = useState(false);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [editWarning, setEditWarning] = useState(false);

  const handleDeleteWarning  = () => {
    setDeleteWarning(!deleteWarning);
  }
  
  const handleEditWarning  = () => {
    setEditWarning(!editWarning);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if(deleteWarning) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  if(editWarning) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  useEffect(() => {
    fetch('http://localhost:8081/tbl_asset_spine')
    .then(res => res.json())
    .then(data => {
        setData(data);
    })
    .catch(err => console.log(err));

    fetch('http://localhost:8081/tbl_final_tree_spine')
    .then(res => res.json())
    .then(data => {
      setDataTblFolder(data);

    })
    .catch(err => console.log(err));

}, []);


const bridge = data.find((bridge) => bridge.bid === parseInt(bridgeID, 10));

////////// BUILD TREE //////////////////////////////////
const treeSpine = dataTblFolder.filter((asset) => asset.bridge_id === parseInt(bridgeID, 10));
const pathFoldersArray = treeSpine.map(item => item.path_folder);
const treeTemp = BuildTreeSpine({values : pathFoldersArray, perviousPageData : null, Directories_values : null, edit : true});

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditWarning(false);
    setEditOption(false);
    setIsLoading(true);
    setModal(!modal);

    const isConfirmed = true; //window.confirm("Are you sure you want to submit the form?");
    if (isConfirmed) { 

      const Delete_values = {
        bridge_id : bridgeID
      };

        // If we have data in DB - We made an edit, so we will delete what we have in the DB before inserting the existing cell.
        axios.delete(`http://localhost:8081/tbl_final_tree_spine/${Delete_values.bridge_id}`)
        .then((res) => {
            // Handle the response as needed
        })
        .catch(err => console.log(err));


      axios.post('http://localhost:8081/tbl_final_tree_spine', convertDicToArrayoOfDic(tree))
      .then((res) => {
        createCSV(bridge.name);
        // Countdown for 5 seconds before moving to another page
        let countdown = 5;
        const countdownInterval = setInterval(() => {
          countdown -= 1;
          if (countdown === 0) {
            clearInterval(countdownInterval); // Stop the interval when countdown reaches 0
            setIsLoading(false);
            history.push(`/Home/${id}`);
          }
          // Update the remaining time on the screen
          setRemainingTime(countdown);
        }, 1000); // Update every 1000 milliseconds (1 second)
      })
      .catch(err => console.log(err));
  };
};

  const handleBack = () => {
    history.goBack(); // This function takes you back to the previous page
};


//////////////// ADD - EDIT - DELETE ////////////////////////

const [lastSelectedNodeName, setLastSelectedNodeName] = useState('');
const [additionalText, setAdditionalText] = useState('');
const handleNodeSelect = (nodeName) => {
  setLastSelectedNodeName(nodeName);
};

const handleNewFolderNameChange = (e) => {
  const typedCharacter = e.target.value.slice(-1); // Get the last typed character
  if (typedCharacter !== '/') {
    setAdditionalText(e.target.value);
  }
};

const [numberFolder, setNumberFolder] = useState('20');
const handleAddFolder = () => {
  // Perform your logic when adding to the selected node
  let newFolderName = `${lastSelectedNodeName}${additionalText}`;

  if (lastSelectedNodeName === '') {
    newFolderName = `0${numberFolder}-${additionalText}`;
    const newItem = { name: newFolderName, parent: '', items: [] };
    tree.push(newItem);

    setNumberFolder(parseInt(numberFolder,10) + 1);
  } else {
    const parts = lastSelectedNodeName.slice(0,-1).split('/');

    let parentNode = null;
    let demoTree = tree;
  
    for (let i = 0; i < parts.length; i++) {
      const nodeName = parts[i];
      parentNode = demoTree.find((item) => item.name === nodeName);
  
      if (!parentNode) {
        console.error('Parent node not found in the tree.');
        return;
      }
  
      // Update the demoTree with the items property of the parentNode
      demoTree = parentNode.items || [];
    }
    if(demoTree.find((item) => item.name === '')){
      parentNode.items.push({ name: additionalText, parent: lastSelectedNodeName.slice(0,-1), items: [] });
      // Remove items with an empty name
      parentNode.items = parentNode.items.filter((item) => item.name !== '');
    }else{
      parentNode.items.push({ name: additionalText, parent: lastSelectedNodeName.slice(0,-1), items: [] });
    }

  }
  setAdditionalText(''); // reset value
};


const handleEditFolder = () => {
  setTree((prevTree) => {
    // Create a copy of the tree to avoid mutating state directly
    const newTree = [...prevTree];

    if (lastSelectedNodeName) {
      const parts = lastSelectedNodeName.slice(0, -1).split('/');
      
      if (parts.length === 1) {
        const editedName = parts[0];
        // Find the node to edit
        const nodeToEdit = newTree.find((item) => item.name === editedName);

        if (nodeToEdit) {
          // Edit the name of the node
          nodeToEdit.name = additionalText;
        }
      } else {  
        // Find the parent node
        let parentNode = null;
        let demoTree = newTree;
        const editedName = parts.pop(); // Get the last part of the path
        for (let i = 0; i < parts.length; i++) {
          const nodeName = parts[i];
          parentNode = demoTree.find((item) => item.name === nodeName);

          // Update the demoTree with the items property of the parentNode
          demoTree = parentNode ? parentNode.items || [] : [];
        }

        // Find the node to edit
        const nodeToEdit = parentNode ? parentNode.items.find((item) => item.name === editedName) : null;

        if (nodeToEdit) {
          // Edit the name of the node
          nodeToEdit.name = additionalText;
        }
      }
    }
    setAdditionalText(''); // reset value
    setLastSelectedNodeName('');
    return newTree; // Return the new state
  });
};


const handleDeleteFolder = () => {
  setTree((prevTree) => {
    // Create a copy of the tree to avoid mutating state directly
    const newTree = [...prevTree];

    if (lastSelectedNodeName) {
      const parts = lastSelectedNodeName.slice(0, -1).split('/');

      if (parts.length === 1) {
        // Delete the item directly from the root
        const itemName = parts[0];
        const updatedTree = newTree.filter((item) => item.name !== itemName);
        return updatedTree;
      } else {
        // Find the parent node
        let parentNode = null;
        let demoTree = newTree;

        for (let i = 0; i < parts.length - 1; i++) {
          const nodeName = parts[i];
          parentNode = demoTree.find((item) => item.name === nodeName);

          // Update the demoTree with the items property of the parentNode
          demoTree = parentNode.items || [];
        }

        // Remove the item with the specified name
        if (parentNode) {
          parentNode.items = parentNode.items.filter((item) => item.name !== parts[parts.length - 1]);
        }
      }
    }
    setAdditionalText(''); // reset value
    return newTree; // Return the new state
  });
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

  const [isAccessible, setIsAccessible] = useState(false);
  const [editOption, setEditOption] = useState(true);
  const toggleAccessibility = () => {
    setIsAccessible(!isAccessible);
    setEditOption(false);
    setEditWarning(false);
    setBackOption(false);
  }

  const handleConfirmation = (confirmed) => {
    if(confirmed){
      toggleAccessibility();
    }else{
      handleSubmit(); // Call handleSubmit when not confirmed
    }
  }

  const handleDelete = (confirmed) => {
    if(confirmed){
      handleDeleteFolder();
      setLastSelectedNodeName('');
      setDeleteWarning(false);
    }
  }

//////////////// END   ADD - EDIT - DELETE ////////////////////////

  /////////////// CSV CREATE ////////////////////

  const createCSV = (name) => {
    // Data to be written to the CSV file
    // ("\n") = same column , (",") = different column
    const csvData = formatFoldersArray();

    // Create a Blob object with the CSV data
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);

    link.download = name + '.csv';

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the DOM
    document.body.removeChild(link);
  };

  const formatFoldersArray = () => {
    const folders = convertDicToArrayoOfDic(tree);
    let resultFoldersArray = [];
   
    for(let i =0; i< folders.length; i++){
      resultFoldersArray.push(folders[i].path_folder);
    }

    return formatArrayToString(resultFoldersArray);
  };

  // A function that builds for me the form of the string I am requesting, which I will insert into a CSV file
  const formatArrayToString = (arr) => {
    let result = '';

    for(let i =0; i< arr.length; i++){
      // Join the array items with a comma and add a newline character after each item
      result += arr[i];
      result += '\n';
    }  
    return result;
  };


  const convertDicToArrayoOfDic = (tree) => {
    const resultArray = [];
  
    const traverse = (node, parentPath = '') => {
      const currentPath = parentPath + node.name + '/';
      const dictionaryEntry = {
        bridge_id: bridgeID,
        path_folder: currentPath.slice(0, -1),
      };
  
      if (node.items.length === 0) {
        resultArray.push(dictionaryEntry);
      } else {
        node.items.forEach((childNode) => {
          traverse(childNode, currentPath);
        });
      }
    };
  
    tree.forEach((rootNode) => {
      traverse(rootNode);
    });
  
    return resultArray;
  };  

const [hasConditionBeenMet, setConditionMet] = useState(false);

  useEffect(() => {
    if (treeTemp.length > 0 && !hasConditionBeenMet) {
      setTree(treeTemp);
      setLoading(false);

      // Set the condition to true to prevent useEffect from running again
      setConditionMet(true);
    }
  }, [treeTemp, hasConditionBeenMet]); 

//////////////////// END CSV //////////////////////////////
  

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
              <div  style={{ display: "flex", flexDirection: "column", padding: "0px", alignItems: "center", width: "800px", backgroundColor: "#E1E1E1", margin: "auto" }}>
                <h1>Folder Tree Spine Demo - </h1>
                 <FolderTree tree={tree} onNodeSelect={handleNodeSelect} onAction={handleActionSelect} view={false} /> 
              <br />
              <div class="input-container">
                <input type="text" value={lastSelectedNodeName} readOnly onChange={() => {}} style={{width:"250px", backgroundColor:"#fafafa"}} />
                <input required="" placeholder="Enter folder name" type="text" value={additionalText} onChange={handleNewFolderNameChange} style={{width:"250px"}}/>
                {addAction && <button class="invite-btn" type="button" onClick={handleAddFolder}>Add Folder</button>}
                {editAction && <button class="invite-btn-edit" type="button" onClick={handleEditFolder}>Edit Folder</button>}
              </div>
              <br />
            </div>
          <div className='ConfirmForm'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {backOption && <button onClick={handleBack} style={{ background: "grey" }}>Back</button>}
                  {!isLoading && (
                    <button onClick={handleSubmit} style={{ background: "green" }}>Save</button>
                  )}
                  {isLoading && (
                    <button disabled style={{ background: "green" }}>Working...</button>
                  )}
                </div>
              </div>
        </div>
        
      ) : (
        <p>Asset not found</p>
      )}
      
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
      {editWarning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Confirmation</h2>
            <p>Editing the data will make irreversible changes.</p>
            <p> Are you sure you want to proceed?</p>
            <br />
            <p style={{fontSize:"12px"}}>- Clicking the finish button will lead to the end of the form</p>
            <br />
            <button className="close-modal" style={{ border: "none", backgroundColor: "#f1f1f1" }} onClick={handleEditWarning}>
              <img src="/images/clear.png" width={'20px'} alt="Close" />
            </button>
            <div className='ConfirmForm'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={() => handleConfirmation(true)} style={{backgroundColor:"darkorange"}}>Edit</button>
                  <button onClick={handleSubmit} style={{backgroundColor:"green"}}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
       {deleteWarning && (
        <div className="modal">
          <div className="modal-content">
            <h2>Delete Confirmation</h2>
            <p> Are you sure you want to proceed?</p>
            <br />
            <button className="close-modal" style={{ border: "none", backgroundColor: "#f1f1f1" }} onClick={handleDeleteWarning}>
              <img src="/images/clear.png" width={'20px'} alt="Close" />
            </button>
            <div className='ConfirmForm'>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <button onClick={() => handleDelete(true)} style={{backgroundColor:"red"}}>Delete</button>
                  <button onClick={handleDeleteWarning} style={{backgroundColor:"green"}}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default EditSpine;
