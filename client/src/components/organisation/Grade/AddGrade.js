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
import { addGrade, fetchGrades } from '../../../actions/GradeAction'




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
  
function AddGrade (props) {
    
    const { addDialog, setAddDialog } = props;  
    const classes = useStyles()


    
    const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })

    const dispatch = useDispatch()

    const [ gradeName , setGradeName ] = useState('')

    

    const handleAdd = (e) => {
      e.preventDefault();
      setAddDialog({isOpen:false})
      

      let grade = {
        "grade_name" : gradeName
      }
      
     
      dispatch(
        addGrade(grade),
        // fetchGrades()
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
                      Grade
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                             Grade Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={gradeName}
                              id="input-grade"
                              placeholder="Grade Name"
                              type="text"
                              onChange={(e) => setGradeName(e.target.value)}
                            />
                          </FormGroup>
                          
                        </Col>
                     
                      </Row>
                     
                     
                     
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
            setNotify = {setNotify}
           />
           </>
            
            
        )
        
    
}

const mapStateToProps = state => {

  return {
    grades : state.grade.data
    
  }
};

export default connect (mapStateToProps, "")(AddGrade);
