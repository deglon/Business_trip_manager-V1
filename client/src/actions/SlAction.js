import {
    UPDATE_SL_ERROR,
    UPDATE_SL_SUCCESS,
    FETCH_SL_ERROR,
    FETCH_SL_LOADING,
    FETCH_SL_SUCCESS,
    ADD_SL_SUCCESS,
    ADD_SL_ERROR,
    DELETE_SL_SUCCESS,
    DELETE_SL_ERROR
} from '../Types/slTypes'
import axios from 'axios';
const url = 'http://localhost:5000/api/serviceline/';
// const url = 'https://jsonplaceholder.typicode.com/users';



/************************** FETCH **************************/
export const fetechSlSuccess =  sls => {
    return {
        type : FETCH_SL_SUCCESS,
        payload : sls
        
    }
}
export function fetechSlLoading() {
    return {
        type: FETCH_SL_LOADING,
    };
}
export const fetechSlError = error => {
    return {
        type :  FETCH_SL_ERROR,
        payload : error,
    }
}


   

export const fetchSl = () => {
    // let isLoading = true; 
    return (dispatch) => {
        dispatch(fetechSlLoading)
        axios.get(url)
        .then(response => { 
          const sls = response.data.data;
  
          dispatch(fetechSlSuccess(sls))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechSlError(errorMsg))
            console.log("errrrrrrrrrrrr")

        })
    }
}




export const fetchSlById = (id) => {
    // let isLoading = true; 
    return (dispatch) => {
        axios.get(url + "search" + `/${id}`)
        .then(response => { 
          const sls= response.data.data;
          dispatch(fetechSlSuccess(sls))
        })
        .catch( error => {
            // const errorMsg = error.message;
            // dispatch(fetechMemberError(errorMsg))
            console.log("erreuuuur")

        })
    
    }
}


/************************** DELETE **************************/



export const deleteslSuccess = (id) => {
    return {
        type : DELETE_SL_SUCCESS,
        payload : {
            id : id
        },
    }
}

export const deleteslError = (data) => {
    return {
        type : DELETE_SL_ERROR,
        payload : data,
    }
}


export const deletesl = (id) => {
    // console.log("deleteeed", id)
    // debugger
    return (dispatch) => {
        return axios.delete(url + "remove/" + `${id}`)
        .then (() => {
            dispatch(deleteslSuccess(id))
        }).catch ((error) => {
            const errorPayload = {};
            errorPayload['message'] = error.response.data.message;
            errorPayload['status'] = error.response.status;
            
            dispatch(deleteslError(errorPayload))
        })
    }
}








/************************** UPDATE **************************/
export const updateSlSuccess = (data) => {
    return {
        type : UPDATE_SL_SUCCESS,
        payload : data,
    }
}

export const updateslError = (data) => {
    return {
        type : UPDATE_SL_ERROR,
        payload : data,
    }
}

export const UpdateSl = (id, SL) => {

    
    // console.log("object", SL)
    // console.log("id", id)
    // debugger
    return (dispatch) => {
        return axios.put(url + 'update/' + `${id}`, SL)
            .then(() => {
                // return axios.get(`${url}/{data.id}`)
                dispatch(updateSlSuccess(SL));
                   
            }).catch ((error) => {
                const errorPayload = {};
                            errorPayload['message'] = error.response.data.message;
                            errorPayload['status'] = error.response.status;
                            dispatch(updateslError(errorPayload));

                    })
    }

}

export const addSL = (SL) => (dispatch) => {
  
// console.log("added", SL)
// debugger
    return axios.post(url + "add", SL).then(
        
        
      (response) => {
        dispatch({
          type: ADD_SL_SUCCESS,
          payload : SL
        });

        axios.get(url)
        .then(response => { 
          const sls = response.data.data;
          
          dispatch(fetechSlSuccess(sls))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechSlError(errorMsg))

        })
  
          
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
          type: ADD_SL_ERROR,
        });
  
        
  
        return Promise.reject();
      }
    );}