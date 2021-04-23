
import React, { useEffect, useState } from "react";

import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'

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
import Grade from './Grade'
import {connect } from 'react-redux'
import {fetchGrades} from '../../../actions/GradeAction'
import AddGrade from "./AddGrade";



function Grades({grade, fetchGrades})  {



  useEffect(() => {
     fetchGrades()
      
  }, [])

  
  
  const [addDialog, setAddDialog] = useState ({ isOpen: false})
  // const [grades , setGrades] = useState(grade)
  const grades = Array.from(grade);

    return (
      <>
    
          <Row className="mt-5">
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <table>
                    <tr>
                      <td width="170%">
                        <h3 className="mb-0"> Grades Table</h3>
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
                  
                      <th scope="col">Grade Name</th>
                      <th scope="col" />
                    </tr>
                    </thead>        
                  <tbody>
                  {
                                  
                    grades && grades.map( (grade) => {
                      return(
                        <Grade 
                          key={grade._id} 
                          grade={grade}
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
       
           <AddGrade 
            addDialog={addDialog} 
            setAddDialog={setAddDialog}

             /> 
      </>
      
    );
  
}

const mapDispatchToProps = dispatch => {
  return {
    fetchGrades : () => dispatch(fetchGrades()),
  }
}
function mapStateToProps(state) {
  return {
    grade: state.grade.data
  };

}
 




export default connect (mapStateToProps, mapDispatchToProps)(Grades);
