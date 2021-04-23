import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { useParams, useHistory} from "react-router-dom"
import Notification from '../../Notification'
import {fetchSlById, UpdateSl} from '../../../actions/SlAction'
// reactstrap components
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
// core components
import UserHeader from "../../Headers/UserHeader";
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Table from 'reactstrap/lib/Table';
import { Avatar } from "@material-ui/core";
import  '../../Users/user.css'

function EditSL ({sl, fetchSlById}) {



  const { id } = useParams()
  const [slToUpdate, setSlToTpdate] = useState(sl.serviceLine)
  useEffect(() => { setSlToTpdate(sl.serviceLine)}, [sl.serviceLine] )

  const [notify, setNotify] = useState({ isOpen: false, message:'', type:'' })

  const history = useHistory();
  const dispatch = useDispatch()



    const [ sslFields, setSslFields ] = useState ([''])
    useEffect(() => { setSslFields(sl.SubServiceLines)}, [sl.SubServiceLines] )


    
    



    const handleChangeInput = (index, event) => {
      const values = [ ...sslFields]
      values[index] = event.target.value
      setSslFields(values)

    }


    const handleAddFields = () => {
      setSslFields([...sslFields, ''])
    }

    const handleRemoveFields = (index) => {
      const values = [...sslFields]
      values.splice(index, 1)
      setSslFields(values)
    }

  const handleCloseNotify = (event) => {
    setNotify({isOpen:false})
  }

  useEffect(() => {
    fetchSlById(id)

  }, [id])

 
    const handleUpdate = (e) => {
      e.preventDefault();


      const SL =  {
        "serviceLine":slToUpdate,
        "SubServiceLines": sslFields     
      }
      // console.log("ssls", SL)
      // debugger
      
      dispatch(
        UpdateSl(id, SL)
      )
      .then(() => {
         
        setNotify({isOpen:true, message:'updated successfully', type:'success' })
        
      })
      .catch(() => {
        setNotify({isOpen:true, message:'updated failed', type:'error' })
      });
     
      
          // history.push('/admin/users')

         
      
    }

  

    
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Form onSubmit={handleUpdate} encType="multipart/form-data" >
          <Row>
          
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">SERVICELINE : {sl.serviceLine} </h3>
                    </Col>
                 
                  </Row>
                </CardHeader>
                <CardBody>
                    
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
                              value={slToUpdate}
                              id="input-username"
                              placeholder="Serviceline Name"
                              type="text"
                              onChange={(e) => setSlToTpdate(e.target.value)}
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
                    
                    { 
                    sslFields && sslFields.map( (ssl, index) => {
                      return(
                        // console.log("ssl", ssl + index)
                        <Table>
                        <div key={index}> 
                              <tr>
                                <td width="500">
                                  <Input
                                    className="form-control-alternative"
                                    value={ssl}
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
                          
                      </Table>
                      )
                                
                    }) 
                      
                    }
                    {/* <Table>
                      { sslFields.map((sslField, index) => (
                          <div key={index}> 
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
                      </Table> */}
                    
                      
                    
                    </div>

                    <Col className="text-right" >
                      <Button
                        type="submit"
                        color="info"
                        // onClick={handleUpdate}
                        size="md"
                      >
                        Update 
                      </Button> 
                    </Col>
    
                </CardBody>
              </Card>
            </Col>
          </Row>
          
          </Form>
        </Container>
        <Notification 
          notify={notify}
          setNotify = {setNotify}
         />
      </>
    );
  }


const mapDispatchToProps = dispatch => {
    return {
      fetchSlById : (id) => dispatch(fetchSlById(id)),
      onUpdate : (data) => dispatch(UpdateSl(data))
    }
  }
  const mapStateToProps = state => {
 
    return {
      
      sl : state.sl.data,
      
    }
    
  };

export default connect (mapStateToProps, mapDispatchToProps)(EditSL);
