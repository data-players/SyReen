import React, { useState  } from 'react';
import { AutocompleteArrayInput, useGetList, getResources } from "react-admin";
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogActions, makeStyles, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { TreeView } from '@material-ui/lab';
import { generateTreeItem, buildTreeData } from './TreeItemUtils';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

/*
* Exemple :
*   <ReferenceArrayInput label="Sujet de" reference="Theme" source="pair:hasTopic" fullWidth >
*   <TreeAutocompleteArrayInput 
*       optionText="pair:label" // define the text render for each item render
*       parentProperty="pair:broader"  // define the parent of a node in tree
*       treeReference="Theme" // same as reference from ReferenceArrayInput, but react admin transform the reference to choices aray and don't call TreeAutocompleteArrayInput whit reference props. treeReference specify resource used to build tree.
*       shouldRenderSuggestions={value => false} // shouldRenderSuggestions RA . can be set to common shouldRenderSuggestions function if you want user use sugestion
*       defaultExpanded={true} // boolean to default expand or not the treeItem selector when modal opening
*   />
*   </ReferenceArrayInput>
*/

const useStyles = makeStyles(theme => ({
    editIcon: { 
        backgroundColor:"#026a63", 
        borderRadius: "25%", 
        color: "white",
        height: "25px",
        cursor: 'pointer'
    },
    TreeStyle: {
        paddingLeft: "15px"
    }
}));

const TreeAutocompleteArrayInput = (props) => {
    const style = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { data } = useGetList(props.treeReference, { page: 1, perPage: Infinity });
    const resources = useSelector(getResources);
    const treeRessource = resources.find(r => r.name === props.treeReference);

    const isFullWidth = props.fullWidth === true;

    const handleSelect = (event, nodes) => {
        if (props.input.value === undefined) {
            props.input.onChange([nodes.id]);
        } else if (!props.input.value.includes(nodes.id)){
            const newVal = [...(props.input.value), nodes.id]
            props.input.onChange(newVal)
        }
        handleClose();
    };

    const treeData = buildTreeData(data, props.parentProperty, props.defaultExpanded);

    return (
        <div style={{display: "flex", alignItems: "top"}}>
            <div style={{flexGrow: isFullWidth ? 1 : 0}}>
                <AutocompleteArrayInput {...props} />
            </div>
            <div style={{paddingTop: "32px", paddingLeft: "10px"}}>
                <EditIcon className={style.editIcon} onClick={handleOpen} />
            </div>           
            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle >Choix du {treeRessource.options.label}</DialogTitle>
                <TreeView 
                    defaultExpanded={treeData.expendedNodes}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    className={style.TreeStyle}
                >
                    {generateTreeItem(props.parentProperty, props.optionText, treeData.allItems, treeData.routeTree, false, [], handleSelect)}
                </TreeView>
                <DialogActions >
                    <Button label="ra.action.close" variant="text" onClick={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TreeAutocompleteArrayInput;