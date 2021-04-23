import {
    UPDATE_GRADE_ERROR,
    UPDATE_GRADE_SUCCESS,
    FETCH_GRADE_ERROR,
    FETCH_GRADE_LOADING,
    FETCH_GRADE_SUCCESS,
    ADD_GRADE_SUCCESS,
    ADD_GRADE_ERROR,
    DELETE_GRADE_SUCCESS,
    DELETE_GRADE_ERROR
} from '../Types/gradesTypes'
import {Redirect} from 'react-router-dom'
import axios from 'axios';


const url = 'http://localhost:5000/api/Grade';



/************************** FETCH **************************/
export const fetechGradesSuccess =  grades => {
    return {
        type : FETCH_GRADE_SUCCESS,
        payload : grades
        
    }
}
export function fetechGradesLoading() {
    return {
        type: FETCH_GRADE_LOADING,
    };
}
export const fetechGradesError = error => {
    return {
        type : FETCH_GRADE_ERROR,
        payload : error,
    }
}


export const fetchGrades = () => {
    // let isLoading = true; 
    return (dispatch) => {
        dispatch(fetechGradesLoading)
        axios.get(url)
        .then(response => { 
          const grades = response.data.data;
          
          dispatch(fetechGradesSuccess(grades))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechGradesError(errorMsg))

        })
    }
}




export const fetchGradeById = (id) => {
    // let isLoading = true; 
    return (dispatch) => {
        axios.get(url + "/search" + `/${id}`)
        .then(response => { 
          const Grade = response.data.data;
          dispatch(fetechGradesSuccess(Grade))
        })
        .catch( error => {
            // const errorMsg = error.message;
            // dispatch(fetechMemberError(errorMsg))
            console.log("erreuuuur")

        })
    
    }
}


/************************** DELETE **************************/



export const deleteGradeSuccess = (id) => {
    return {
        type : DELETE_GRADE_SUCCESS,
        payload : {
            id : id
        },
    }
}

export const deleteGradeError = (data) => {
    return {
        type : DELETE_GRADE_ERROR,
        payload : data,
    }
}


export const deleteGrade = (id) => {
    return (dispatch) => {
        return axios.delete(url + "/remove/" + `${id}`)
        .then (() => {
            dispatch(deleteGradeSuccess(id))
        }).catch ((error) => {
            const errorPayload = {};
            errorPayload['message'] = error.response.data.message;
            errorPayload['status'] = error.response.status;
            
            dispatch(deleteGradeError(errorPayload))
        })
    }
}


/************************** UPDATE **************************/
export const updateGradeSuccess = (data) => {
    return {
        type : UPDATE_GRADE_SUCCESS,
        payload : data,
    }
}

export const updateGradeError = (data) => {
    return {
        type : UPDATE_GRADE_ERROR,
        payload : data,
    }
}

export const updateGrade = (id, grade) => {

    const data = {
        id : id,
        grade_name: grade.grade_name,
        
    };


   
    return (dispatch) => {
        return axios.put(url + "/update/" + `${id}`, grade)
            .then(() => {
                dispatch(updateGradeSuccess(data));
                   
            }).catch ((error) => {
                const errorPayload = {};
                            errorPayload['message'] = error.response.data.message;
                            errorPayload['status'] = error.response.status;
                            dispatch(updateGradeError(errorPayload));

                    })
    }

}

/************************** ADD **************************/


// export const addGradeSuccess = (data) => {
//     return {
//         type : ADD_GRADE_SUCCESS,
//         payload : data,
//     }
// }

// export const addGradeError = (data) => {
//     return {
//         type : ADD_GRADE_ERROR,
//         payload : data,
//     }
// }


// export const addGrade = (grade) => {

 
   
//     return (dispatch) => {
//         return axios.put(url + "/add" , grade)
//             .then(() => {
//                 dispatch(addGradeSuccess(grade));
                   
//             }).catch ((error) => {
//                 const errorPayload = {};
//                             errorPayload['message'] = error.response.data.message;
//                             errorPayload['status'] = error.response.status;
//                             dispatch(addGradeError(errorPayload));

//                     })
//     }

// }

export const addGrade = (grade) => (dispatch) => {
    
    return axios.post(url + "/add", grade).then(
      (response) => {
          
        dispatch({
          type: ADD_GRADE_SUCCESS,
          payload : grade,
        });

        axios.get(url)
        .then(response => { 
          const grades = response.data.data;
          
          dispatch(fetechGradesSuccess(grades))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechGradesError(errorMsg))

        })
        
        // fetchGrades()
        // return Redirect(Request.UrlReferrer.ToString());
          
        return Promise.resolve();
        
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_GRADE_ERROR,
          payload : grade,
        });
  
        
  
        return Promise.reject();
      }
    );
}