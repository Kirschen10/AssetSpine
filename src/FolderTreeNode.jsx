import React, { useState } from 'react';
import './CSS/FolderTreeNode.css'; // Import the CSS file for styles

/*
 * The FolderTreeNode component represents an individual node (folder) within a folder tree structure, providing functionalities for expanding/collapsing folders, selecting nodes, and performing actions such as adding, editing, or deleting folders.
 *
 * Props:
 * 1. **node (Object)**:
 *    - An object representing the current folder node. This object includes properties such as `name`, `parent`, and `items` (children of the node).
 *
 * 2. **onNodeSelect (Function)**:
 *    - A callback function that triggers when a node (folder) is selected. It receives the calculated path of the selected node, which can be used by the parent component for further actions.
 *
 * 3. **onAction (Function)**:
 *    - A callback function for managing actions on the node (e.g., Add, Edit, Delete). This function is triggered when the respective button for the action is clicked.
 *
 * 4. **view (Boolean)**:
 *    - A boolean indicating whether the tree should be displayed in a view-only mode (`true`) or in an editable mode (`false`). When `view` is `true`, editing functionalities like add, edit, and delete are disabled.
 *
 * Component Structure:
 * - The component is structured with the main folder node as a container (`folder-node-container`), which includes the folder icon, name, and action buttons (if applicable).
 * - It manages whether the folder is expanded/collapsed, selected, or hovered over through various states (`isOpen`, `isSelected`, etc.).
 *
 * Key Functionalities:
 * 1. **Folder Expansion/Collapse**:
 *    - The component checks if a folder node has children (`hasChildren`). If it does, clicking the folder toggles its expanded (`isOpen`) state, allowing users to view or hide nested folders.
 *
 * 2. **Node Selection**:
 *    - When a node is clicked, the component toggles its selection state (`isSelected`). It also calculates the full path of the node using the `calculateNodePath` function, which is passed to the `onNodeSelect` callback.
 *
 * 3. **Add, Edit, and Delete Actions**:
 *    - Action buttons (`Add`, `Edit`, `Delete`) are displayed when a node is selected, and the component is not in view-only mode. Clicking any of these buttons triggers the corresponding function (`handleAdd`, `handleEdit`, or `handleDelete`), which calls the `onAction` callback with the action type.
 *    - Tooltips are shown when hovering over action buttons, providing a visual cue for each button’s purpose.
 *
 * 4. **Child Node Rendering**:
 *    - If the folder node has children, the component renders a nested list (`ul`) of `FolderTreeNode` components for each child node when the folder is expanded (`isOpen`).
 *
 * Component States:
 * - **isOpen (Boolean)**: Manages whether the folder node is expanded to show its children.
 * - **isSelected (Boolean)**: Manages whether the node is currently selected.
 * - **hasBeenClicked (Boolean)**: Tracks if the node has been clicked before to ensure that the folder expands only on the first click when it has children.
 * - **showTooltipAdd, showTooltipEdit, showTooltipDelete (Booleans)**: Manage the visibility of tooltips for the respective action buttons when hovered.
 *
 * Styles:
 * - The component uses CSS classes such as `folder-node`, `selected`, and `folder-buttons` to manage visual appearance, with additional tooltip styling for user interaction feedback.
 *
 * This component is designed to be flexible and interactive, providing essential functionalities for managing and navigating a hierarchical folder structure with ease.
 */


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
    let parent = currentNode.parent;
    while (parent) {
      path = `${parent}/${path}`;
      parent = parent.parent;
    }
    return path + "/";
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    onAction("Delete");
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    onAction("Add");
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onAction("Edit");
  };

  const [showTooltipAdd, setShowTooltipAdd] = useState(false);
  const handleMouseEnterAdd = () => setShowTooltipAdd(true);
  const handleMouseLeaveAdd = () => setShowTooltipAdd(false);

  const [showTooltipEdit, setShowTooltipEdit] = useState(false);
  const handleMouseEnterEdit = () => setShowTooltipEdit(true);
  const handleMouseLeaveEdit = () => setShowTooltipEdit(false);

  const [showTooltipDelete, setShowTooltipDelete] = useState(false);
  const handleMouseEnterDelete = () => setShowTooltipDelete(true);
  const handleMouseLeaveDelete = () => setShowTooltipDelete(false);

  return (
    <div className={`folder-node-container ${isSelected ? 'selected' : ''}`}>
      <div className={`folder-node ${isSelected ? 'selected' : ''} ${hasChildren && isOpen ? 'open' : ''}`} onClick={handleToggleIcon}>
        {hasChildren ? (isOpen ? <img src='/images/folder_plus.png' width={'20px'} onClick={handleToggleIcon} /> : <img src='/images/folder_plus.png' width={'20px'} onClick={handleToggleIcon} />) : <img src='/images/folder.png' width={'20px'} />}
        <span onClick={handleSelectName}>{node.name}</span>
        {isSelected && !view && (
          <div className="folder-buttons">
            <button name='Add' onMouseEnter={handleMouseEnterAdd} onMouseLeave={handleMouseLeaveAdd} onClick={handleAdd}>
              <img src='/images/new-folder.png' />
              {showTooltipAdd && <div className="tooltip">Add Folder</div>}
            </button>
            <button name='Edit' onMouseEnter={handleMouseEnterEdit} onMouseLeave={handleMouseLeaveEdit} onClick={handleEdit}>
              <img src='/images/editing.png' />
              {showTooltipEdit && <div className="tooltip">Edit Folder</div>}
            </button>
            <button name='Delete' onMouseEnter={handleMouseEnterDelete} onMouseLeave={handleMouseLeaveDelete} onClick={handleDelete}>
              <img src='/images/delete.png' />
              {showTooltipDelete && <div className="tooltip">Delete Folder</div>}
            </button>
          </div>
        )}
      </div>
      {hasChildren && isOpen && (
        <ul>
          {node.items.map((child, index) => (
            <li key={index}>
              <FolderTreeNode node={child} onNodeSelect={onNodeSelect} onAction={onAction} view={view} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FolderTreeNode;
