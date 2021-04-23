
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Sl from './SL'
import {connect } from 'react-redux'
import {fetchSl} from '../../../actions/SlAction'

import AddSL from './AddSL'


function SLs ({sls, fetchSl})  {



  useEffect(() => {
    fetchSl()
  }, [])

  const data = Array.from(sls);
  const [addDialog, setAddDialog] = useState ({ isOpen: false})
  const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })



    return (
      <>
     
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <table>
                    <tr>
                      <td width="170%">
                        <h3 className="mb-0">Servicelines Table</h3>
                      </td>
                      <td>
                        <Button
                        color="primary"
                        onClick={() => { 
                          setAddDialog({
                            isOpen:true,
                            // onConfirm: () => { handleAdd() } 
                           })
                         }}
                        size="md"
                        style={{
                            margin: "0 25px 0 ",
                            
                          }}
                        >
                        Add New 
                      </Button>
                      </td>
                    </tr>
                    
                  </table>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Servicelines</th>
                      <th scope="col">SubServicelines</th>
                      <th scope="col" />
                    </tr>
                    </thead>        
                  <tbody>
                  {
                                  
                    data && data.map( (sl) => {
                      return(
                        <Sl 
                          key={sl._id} 
                          sl={sl}
                        />
                                  )
                                
                    }) 
                  } 
                  
                    
                  </tbody>
                  
                </Table>

                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          
          <AddSL 
            addDialog={addDialog} 
            setAddDialog={setAddDialog}

             />
      </>
    );
  
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSl : () => dispatch(fetchSl()),
  }
}

function mapStateToProps(state) {
  return {
    sls: state.sl.data
  };

}
 




export default connect (mapStateToProps, mapDispatchToProps)(SLs);
