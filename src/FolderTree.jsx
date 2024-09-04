// FolderTree.js
import React from 'react';
import FolderTreeNode from './FolderTreeNode';

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