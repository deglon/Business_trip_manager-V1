import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { useParams, useHistory} from "react-router-dom"
import Notification from '../Notification'
import {fetchSlById, UpdateSl} from '../../actions/SlActions'
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
import SlHeader from "../Headers/SlHeader.js";
//import { Avatar } from "@material-ui/core";
//import  './Sl.css'

function DetailsSl ({Sl, fetchSlById}) {



  const { id } = useParams()
  const [SlToUpdate, setSlToUpdate] = useState(Sl.sl)
  useEffect(() => { setSlnameToUpdate(Sl.sl)}, [Sl.sl] )

  const [nameToUpdate, setNameToUpdate] = useState(Sl.name)
  useEffect(() => { setNameToUpdat
    e(Sl.name)}, [Sl.name] )

  const [pnameToUpdate, setPnameToUpdate] = useState(Sl.name)
  useEffect(() => { setPnameToUpdate(Sl.name)}, [Sl.name] )



  const [gradeToUpdate, setGradeToUpdate] = useState(Sl.Slname)
  useEffect(() => { setGradeToUpdate(Sl.Slname)}, [Sl.Slname] )


  const [notify, setNotify] = useState({ isOpen: false, message:'', type:'' })

  const history = useHistory();
  const dispatch = useDispatch()

  const handleCloseNotify = (event) => {
    setNotify({isOpen:false})
  }

  useEffect(() => {
    fetchSlById(id)
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
          id: Sl.id,
          Slname: SlnameToUpdate,
          email : emailToUpdate
      }
      fromData.append("photo", photoToUpdate)
      fromData.append("data",JSON.stringify(data)) 

      dispatch(
        UpdateSl(fromData, Sl.id)
      )
      .then(() => {
         
        setNotify({isOpen:true, message:'updated successfully', type:'success' })
        
      })
      .catch(() => {
        setNotify({isOpen:true, message:'updated failed', type:'error' })
      });
     
      UpdateSl(fromData, Sl.id)
          // history.push('/admin')
          setNotify({isOpen:true, message:'updated successfully', type:'success' })
          // history.push('/admin/Sls')

         
      
    }

    const photoHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () =>{
        if (reader.readyState === 2){
          setPhotoToUpdate(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }

    
    return (
      <>
        <SlHeader />
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
                    <div className="card-profile-image">
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={photoToUpdate}

                        />
                      <Input className="my_file" type="file" name="image-upload" id="photo" accept="image/*"
                           onChange={photoHandler} />
                    </div>
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
                      { nameToUpdate }
                      {/* <span className="font-weight-light">, { Sl.Slname }</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      { Sl.website    }
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Software Engineer
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p>
                     {emailToUpdate}<br/>
                     {SlnameToUpdate }
                    </p>
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
                      <h3 className="mb-0">Profile de {nameToUpdate}</h3>
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
                      Sl information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-Slname"
                            >
                              Slname
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={SlnameToUpdate}
                              id="input-Slname"
                              placeholder="Slname"
                              type="text"
                              onChange={(e) => setSlnameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email 
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              value={emailToUpdate}
                              placeholder="Sl@example.com"
                              type="email"
                              onChange= {(e) => setEmailToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Nom
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Prénom
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Grade
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Immatriculation
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              SL
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              SSL
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={nameToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Adresse
                            </label>
                            <Input
                              className="form-control-alternative"
                              value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Téléphone
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Ariana"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ville
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Ariana"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Pays
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Tunisia"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Code postal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              defaultValue="2073"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
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
                      </FormGroup>
                    </div> */}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
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
      onUpdate : (Sl) => dispatch(UpdateSl(Sl))
    }
  }
  const mapStateToProps = state => {
    // console.log("Slsssssss",state.Sl.data)
  
    return {
      
      Sl : state.Sl.data,
      
    }
    
  };

export default connect (mapStateToProps, mapDispatchToProps)(DetailsSl);
