import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { useParams} from "react-router-dom"
import {fetchGradeById, UpdateGrade} from '../../../actions/GradeAction'
import Notification from '../../Notification'
import Grade from '../Grade/Grade'


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

function DetailsGrade ({grade, fetchGradeById}) {

  const [gradeToUpdate, setgradeToUpdate] = useState(grade.username)
  useEffect(() => { setgradeToUpdate(Grade.username)}, [grade.username] )
  const { id } = useParams()
 // useEffect(() => { setGradeToUpdate(user.username)}, [user.username] )


  
  const dispatch = useDispatch()

  useEffect(() => {
    fetchGradeById(id)
    // const fetchData = async () => {
    //   const result = await fetchMemberById(memberId)
    //   setMember(result)
    //   console.log("result: ",result);
    //   debugger;
    // }
    // fetchData()
  }, [id])

 
    const handleUpdate = (e) => {
      e.preventDefault();
      const fromData = new FormData();
      let data = {
          id: Grade.id,
          Grade: gradeToUpdate,
          }
     
      
     
      
         
      
    }

  
    
    return (
      <>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    {/* <div className="wrapper">
                      <Input type="file" className="my_file" />
                    </div> */}
                   
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  
                  <div className="d-flex justify-content-between">

                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button> */}
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        {/* <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div> */}
                      </div>
                    </div>
                   
                    {/* <div>
                      <label>
                        <i className="material-icons">add_photo_alternance</i>
                      </label>
                    </div> */}

                  </Row>
                  <div className="text-center">
                    <h3>
                      { gradeToUpdate }
                      {/* <span className="font-weight-light">, { Grade.Gradename }</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      { Grade.website    }
                    </div>
                    {/* <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Software Engineer
                    </div> */}
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                                        {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Grade:  {gradeToUpdate}</h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Grade information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Gradename"
                            >
                              Gradename
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={gradeToUpdate}
                              id="input-Gradename"
                              placeholder="Gradename"
                              type="text"
                              onChange={(e) => setgradeToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                           
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    <Col className="text-right" >
                      <Button
                          color="info"
                          onClick={handleUpdate}
                          size="md"
                        >
                          Edit profile
                        </Button> 
                      </Col>
                    {/* <hr className="my-4" />
                 
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>*/}
                    </div> 
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
             </>
    );
  }


const mapDispatchToProps = dispatch => {
    return {
      fetchGradeById : (id) => dispatch(fetchGradeById(id)),
      onUpdate : (grade) => dispatch(UpdateGrade(grade))
    }
  }
  const mapStateToProps = state => {
    // console.log("Gradesssssss",state.Grade.data)
  
    return {
      
      Grade : state.Grade.data
      
    }
  } 
 

export default connect (mapStateToProps, mapDispatchToProps)(DetailsGrade);
