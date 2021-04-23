
import React, { useState, useEffect } from "react";
import {
 
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,

} from "reactstrap";
import {Link} from 'react-router-dom'

import { deletesl } from '../../../actions/SlAction'
import { connect } from 'react-redux'
// import { confirmAlert } from 'react-confirm-alert'; 
import Notification from '../../Notification'
import ConfirmDialog from '../../ConfirmDialog'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from '@material-ui/core'
import Button from 'reactstrap/lib/Button'




function Sl (props) {

  const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })
  const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })
  const ssls = props.sl.SubServiceLines



  const handleDelete = () => {

    setConfirmDialog({isOpen:false})

    props.onDelete(props.sl._id)   
    // console.log(props.Sl.id) ; 
    setNotify({isOpen:true, message:'deleted successfully', type:'error' })

  }
  
  


    return (
      <>
          
        <tr>
      
                   
          <td>
            {props.sl.serviceLine}            
          </td>
          
          <td>
          {
                                  
            ssls &&  ssls.map( (index, ssl) => {
              return(
                ssls[ssl] + " / "   
              )
                                              
            }) 
          } 
          
                        
          </td>
         
                     
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href={`/admin/edit/sl/${props.sl._id}`}
                  
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => { 
                    setConfirmDialog({
                      isOpen:true,
                      title:'Are you sure to delete  this Grade ?', 
                      subtitle:'Are you sure to delete  this Grade ?',
                      onConfirm: () => { handleDelete() } 
                     })
                   }}
                >
                  Delete
                </DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <Notification 
          notify={notify}
          // onClose={this.handleCloseNotify}
          setNotify = {setNotify}
         />

         <ConfirmDialog 
            confirmDialog={confirmDialog} 
            setConfirmDialog={setConfirmDialog}

             />

                                             
                  
      </>
    );
  }


const mapDispatchToProps = dispatch => {
  return {
    onDelete : (id) => dispatch(deletesl(id))
  }
}
  //same name as function
export default  connect ("", mapDispatchToProps)(Sl);
