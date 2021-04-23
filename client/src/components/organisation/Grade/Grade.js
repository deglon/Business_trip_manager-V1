
import React, { useState, useEffect } from "react";
import {
 
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Input,


} from "reactstrap";
import {Link} from 'react-router-dom'

import { deleteGrade, updateGrade } from '../../../actions/GradeAction'
import { connect } from 'react-redux'
import Notification from '../../Notification'
import ConfirmDialog from '../../ConfirmDialog'
import Button from 'reactstrap/lib/Button'




function Grade (props) {

  const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })
  const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })
  const [updateMode, setUpdateMode] = useState(false)
  const [ gradeName, setGradeName ] = useState(props.grade.grade_name)
  // useEffect(() => { setGradeName(props.grade.grade_name)}, [props.grade.grade_name] )


  const handleDelete = () => {
    setConfirmDialog({isOpen:false})
    props.onDelete(props.grade._id)   
    setNotify({isOpen:true, message:'Deleted successfully', type:'error' })
  }

  const handleUpdate = () => {
    props.onUpdate(props.grade._id, {"grade_name" : gradeName})
    
    setUpdateMode(false)
    
}
  
  


    return (
      <>
        {!updateMode ? (
          <>
              <tr>
                              
                <td>
                  {props.grade.grade_name}            
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
                        onClick={()=>setUpdateMode(true)}
                        
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => { 
                          setConfirmDialog({
                            isOpen:true,
                            title:'Are you sure to delete  this Grade ?', 
                            subtitle:"You can't undo this operation !",
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
              </>
        ) : (
          <>
          <tr>
              <td>
                 <div className="">
                    <div className="col-md-10">
                        <Input type="text" className="form-control"  name="grade_name" value={gradeName}
                                            onChange={(e) => setGradeName(e.target.value)}
                         />
                    </div>
                  </div>
              </td>
              <td>
                <Button className="btn btn-success" onClick={handleUpdate}>Mettre à jour</Button>
             
                <Button  className="btn btn-white" onClick={()=>setUpdateMode(false)}>Cancel</Button>
              </td>
            </tr>
          </>
        )}
        <Notification 
          notify={notify}
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
    onDelete : (id) => dispatch(deleteGrade(id)),
    onUpdate : (id,grade) => dispatch(updateGrade(id,grade))
  }
}

export default  connect ("", mapDispatchToProps)(Grade);
