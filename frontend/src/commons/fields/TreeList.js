import React from 'react';
import { TreeView } from '@material-ui/lab';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { buildTreeData, generateTreeItem } from '../inputs/TreeItemUtils';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  treeView: {
    paddingLeft: 20,
    '& .MuiTreeItem-root': {
      listStyleType: 'disc',
      '& .MuiTreeItem-content': {
        cursor: 'unset',
        '& .MuiTreeItem-iconContainer': {
          display: 'none'
        },
        '& .MuiTreeItem-label': {
          lineHeight: '150%'
        },
      }
    }
  },
}));

const TreeList =({data, source, label, defaultExpanded = true}) => {
  
  const classes = useStyles();

  const handleSelect = (event, nodes) => {
    return;
  }

  const treeListData = buildTreeData(data, source, defaultExpanded)
  
  return (
    <TreeView
      defaultCollapseIcon={<SubdirectoryArrowRightIcon />}
      defaultExpandIcon={<ArrowForwardIcon />}
      defaultExpanded={treeListData.expendedNodes}
      className={classes.treeView}
    >
        {generateTreeItem(source, label, treeListData.allItems, treeListData.routeTree, false, [], handleSelect)}
    </TreeView>
  )
}

export default TreeList;