import React, {useState} from 'react'
import { useDispatch, connect } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
  } from "reactstrap";
import Notification from '../../Notification'
import { addSL } from '../../../actions/SlAction';
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Table from 'reactstrap/lib/Table';



const useStyles = makeStyles( theme => ({
    dialog: {
        padding:  theme.spacing(2),
        width: '1000px',
        position: 'absolute',
        top: theme.spacing(2),
        backgroundColor: '#f6f9fc'
      },
      dialogContent: {
        //   textAlign: 'center'
      },
      dialogActions : {
          justifyContent : 'center'
      },
    
  }))
  
function AddSL (props) {
    
    const { addDialog, setAddDialog } = props;  
    const classes = useStyles()


    
    const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })

    const dispatch = useDispatch()
    const [ sl, setSl ] = useState('')
    const [ sslFields, setSslFields ] = useState ([''])

    const handleChangeInput = (index, event) => {
      const values = [ ...sslFields]
      values[index] = event.target.value
      setSslFields(values)

    }


    const handleAddFields = () => {
      setSslFields([...sslFields, {ssl: ''}])
    }

    const handleRemoveFields = (index) => {
      const values = [...sslFields]
      values.splice(index, 1)
      setSslFields(values)
    }

    
    

    const handleAdd = (e) => {
      e.preventDefault();
      setAddDialog({isOpen:false})
    
      const SL =  {
        "serviceLine":sl,
        "SubServiceLines": sslFields     
      }
      // console.log("ssls", SL)
      // debugger
     
      dispatch(
        addSL(SL)
      )
      .then(() => {
         
        setNotify({isOpen:true, message:'Added successfully', type:'success' })
        
      })
      .catch(() => {
        setNotify({isOpen:true, message:'Added failed', type:'error' })
      });
   
    }


    

    

    

       

        return (
          <>
            <Dialog open={addDialog.isOpen} classes={{paper:classes.dialog}}>
            
                <DialogContent className={classes.dialogContent}>
                <CardBody>
                  <Form>
                
                    <h6 className="heading-small text-muted mb-4">
                      Serviceline
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Serviceline Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={sl}
                              id="input-username"
                              placeholder="Serviceline Name"
                              type="text"
                              onChange={(e) => setSl(e.target.value)}
                            />
                          </FormGroup>
                          
                        </Col>
                     
                      </Row>
                     
                     
                     
                    </div>
                    {/* <hr className="my-4" /> */}
                    {/* Subservicelines */}
                    <h6 className="heading-small text-muted mb-4">
                      Subservicelines
                    </h6>
                    <div className="pl-lg-4">
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Subserviceline Name
                     </label>
                     <Table>
                      { sslFields.map((sslField, index) => (
                          <div key={index}> 
                            {/* <TextField name="ssl"
                                       label="ssl"
                                       value={sslField.ssl}
                                       variant="filled"
                            /> */}
                          
                              <tr>
                                <td width="500">
                                  <Input
                                    className="form-control-alternative"
                                    value={sslField.ssl}
                                    id="input-ssl"
                                    placeholder="Subserviceline Name"
                                    type="text"
                                    onChange={event => handleChangeInput(index, event)}
                                  />
                                </td>
                            
                                <td>
                                  <IconButton
                                    onClick={() => {handleRemoveFields(index)}}
                                  >
                                    <RemoveIcon/>
                                  </IconButton>

                                </td>
                                <td>
                                  <IconButton 
                                    onClick={() => {handleAddFields()}}
                                  >
                                    <AddIcon />
                                  </IconButton>
                                </td>
                              </tr>
                

                          </div>
                          
                      ))}
                      </Table>
                     
                      
                     
                    </div>
     
                  </Form>
                </CardBody>
                   
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                     <Button color="success" 
                    onClick={handleAdd}
                    >Ajouter</Button>
                     
                    <Button 
                        onClick={() => { setAddDialog({isOpen:false}) } }
                    >Annuler</Button> 


                </DialogActions>

            </Dialog>
            <Notification 
            notify={notify}
            // onClose={this.handleCloseNotify}
            setNotify = {setNotify}
           />
           </>
            
            
        )
        
    
}

const mapStateToProps = state => {
  // console.log("usersssssss",state.user.data)

  return {
    grades : state.user.data
    
  }
};

export default connect (mapStateToProps, "")(AddSL);
