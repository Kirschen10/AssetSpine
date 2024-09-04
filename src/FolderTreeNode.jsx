// FolderTreeNode.js
import React, { useState, useEffect } from 'react';
import './FolderTreeNode.css'; // Import your CSS file

const FolderTreeNode = ({ node, onNodeSelect, onAction, view }) => {
  const hasChildren = node.items && node.items.filter((item) => item.name !== '').length > 0;
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleToggleIcon = (e) => {
    e.stopPropagation(); // Prevent event propagation
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectName = (e) => {
    e.stopPropagation(); // Prevent event propagation
    setIsSelected(!isSelected); // Toggle isSelected

    if (!hasBeenClicked) {
      setHasBeenClicked(true);

      if (hasChildren) {
        setIsOpen(true); // Open the folder on the first click
      }
    }

    if (!isSelected) {
      const path = calculateNodePath(node);
      onNodeSelect(path);
    } else {
      onNodeSelect('');
    }
  };

  const calculateNodePath = (currentNode) => {
    let path = currentNode.name;
    let parent = currentNode.parent; // Assuming you have a 'parent' property in your node objects
    while (parent) {
      path = `${parent}/${path}`;
      parent = parent.parent;
    }

    return path + "/";
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent event propagation
    onAction("Delete");
  };

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent event propagation
    onAction("Add");
  };

  const handleEdit = (e) => {
    e.stopPropagation(); // Prevent event propagation
    onAction("Edit");
  };


  const [showTooltipAdd, setShowTooltipAdd] = useState(false);

  const handleMouseEnterAdd = () => {
    setShowTooltipAdd(true);
  };

  const handleMouseLeaveAdd = () => {
    setShowTooltipAdd(false);
  };

  const [showTooltipEdit, setShowTooltipEdit] = useState(false);

  const handleMouseEnterEdit = () => {
    setShowTooltipEdit(true);
  };

  const handleMouseLeaveEdit = () => {
    setShowTooltipEdit(false);
  };

  const [showTooltipDelete, setShowTooltipDelete] = useState(false);

  const handleMouseEnterDelete = () => {
    setShowTooltipDelete(true);
  };

  const handleMouseLeaveDelete = () => {
    setShowTooltipDelete(false);
  };

  return (
    <div className={`folder-node-container ${isSelected ? 'selected' : ''}`}>
      <div className={`folder-node ${isSelected ? 'selected' : ''} ${hasChildren && isOpen ? 'open' : ''}`} onClick={handleToggleIcon}>
        {hasChildren ? (isOpen ? <img src='/images/folder_plus.png' width={'20px'} onClick={handleToggleIcon} /> : <img src='/images/folder_plus.png' width={'20px'} onClick={handleToggleIcon} />) : <img src='/images/folder.png' width={'20px'} />}
        <span onClick={handleSelectName}>{node.name}</span>
        {isSelected && !view && (
          <div className="folder-buttons">
            <button name='Add' style={{ marginLeft: '5px', backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer" }} onMouseEnter={handleMouseEnterAdd} onMouseLeave={handleMouseLeaveAdd} onClick={handleAdd}>
              <img src='/images/new-folder.png' width={"20px"} height={"20px"} style={{ backgroundColor: "#E1E1E1" }} />
              {/* Show tooltip conditionally */}
              {showTooltipAdd && <div className="tooltip">Add Folder</div>}
            </button>
            <button name='Edit' style={{ marginLeft: '5px', backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer" }} onMouseEnter={handleMouseEnterEdit} onMouseLeave={handleMouseLeaveEdit} onClick={handleEdit}>
              <img src='/images/editing.png' width={"20px"} height={"20px"} style={{ backgroundColor: "#E1E1E1" }} />
                 {/* Show tooltip conditionally */}
                 {showTooltipEdit && <div className="tooltip">Edit Folder</div>}
            </button>
            <button name='Delete' style={{ marginLeft: '5px', backgroundColor: "transparent", border: "none", padding: "0", cursor: "pointer" }} onMouseEnter={handleMouseEnterDelete} onMouseLeave={handleMouseLeaveDelete} onClick={handleDelete}>
              <img src='/images/delete.png' width={"20px"} height={"20px"} style={{ backgroundColor: "#E1E1E1" }} />
                               {/* Show tooltip conditionally */}
                               {showTooltipDelete && <div className="tooltip">Delete Folder</div>}
            </button>
          </div>
        )}
      </div>
      {hasChildren && isOpen && (
        <ul>
          {node.items.map((child, index) => (
            <li key={index}>
              {/* Pass onAction prop to child nodes */}
              <FolderTreeNode node={child} onNodeSelect={onNodeSelect} onAction={onAction} view={view} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FolderTreeNode;
