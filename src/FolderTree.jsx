// FolderTree.js
import React from 'react';
import FolderTreeNode from './FolderTreeNode';

/*
 * The FolderTree component renders a hierarchical tree structure of folders, allowing for interaction and navigation through nested folder nodes. This component acts as a container for individual folder nodes and provides the structure for displaying them in a tree format.
 *
 * Props:
 * 1. **tree (Array)**: 
 *    - An array of folder nodes representing the hierarchical structure. Each node in the array contains information such as the folder name, parent reference, and any child nodes.
 *
 * 2. **onNodeSelect (Function)**:
 *    - A callback function triggered when a folder node is selected. It receives the selected node's name, allowing the parent component to update state or perform actions based on the selected node.
 *
 * 3. **onAction (Function)**:
 *    - A callback function used for performing actions on a node, such as adding, editing, or deleting folders. This function enables the parent component to manage these actions dynamically based on user interactions.
 *
 * 4. **view (Boolean)**:
 *    - A boolean prop that indicates whether the folder tree should be displayed in a read-only view mode (`true`) or an interactive mode (`false`). When in view mode, the component displays the tree without enabling editing actions.
 *
 * Component Structure:
 * - The component iterates over the `tree` array and renders each folder node using the `FolderTreeNode` component. Each `FolderTreeNode` receives the node data and callback functions (`onNodeSelect`, `onAction`) to handle interactions.
 * - The `key` prop is set to `index` for each node to ensure unique identification within the rendered list.
 *
 * Key Functionalities:
 * 1. **Tree Rendering**:
 *    - The component maps over the `tree` array, rendering each node recursively using the `FolderTreeNode` component. It builds the tree structure dynamically based on the provided folder data.
 * 
 * 2. **Node Interactivity**:
 *    - The component passes the `onNodeSelect` and `onAction` callback functions to each `FolderTreeNode`, allowing these child components to manage user interactions like node selection and folder actions.
 * 
 * 3. **View Mode**:
 *    - The `view` prop allows the parent component to set whether the tree is displayed in an interactive or view-only state. When in view-only mode, editing functionalities are disabled, making the tree a read-only representation.
 * 
 * This component is designed to be reusable and dynamic, capable of rendering folder structures with varying levels of depth and complexity, while providing the necessary hooks for managing folder interactions.
 */


const FolderTree = ({ tree, onNodeSelect, onAction, view}) => {
  return (
    <div>
      {tree.map((node, index) => (
        <FolderTreeNode key={index} node={node} onNodeSelect={onNodeSelect} onAction={onAction} view={view} />
      ))}
    </div>
  );
};

export default FolderTree;