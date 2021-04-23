import React from 'react'
import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useState } from 'react';

const useStyles = makeStyles( theme => ({
    root : {
        top: theme.spacing(9)
    }
}))

export default function Notification(props) {

    const { notify, setNotify } = props;

    const classes = useStyles()

    const handleClose = (event, reason) => {

        if (reason === 'clickaway'){
            return;
        }
        
        setNotify({
            ...notify,
            isOpen: false

        })
    }


    return (
        <div>
            <Snackbar
            className={classes.root}
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'top', horizontal:'right'}}
            onClose={handleClose}
            >
                <Alert 
                    severity = {notify.type} 
                    onClose={handleClose}>
                    { notify.message }
                </Alert>
            </Snackbar>
        </div>
    )
}


// import React from 'react'
// import { makeStyles, Snackbar } from '@material-ui/core'
// import { Alert } from '@material-ui/lab'
// // import { useState } from 'react';

// const useStyles = makeStyles( theme => ({
//     root : {
//         top: theme.spacing(9)
//     }
// }))

// class Notification extends React.Component {

    

//   constructor(props) {
//     super(props);
//     this.state = {
//       notify : props
//     };
//   }


//     // const { notify, setNotify } = props;
//     // const [ notify , setNotify] = useState(props.notify)
//     // console.log("hhhhhhhh", notify)

//     // console.log("llllll", notify)
//     // debugger
//     // const classes = useStyles()

//     handleClose = (event, reason) => {
//         // alert(id)
//         // this.setState({ notify: {isOpen:true, message:'submitted successfully', type:'success' } })
//         if (reason === 'clickaway'){
//             return;
//         }
        
//       }
     

//     render() {

//         const  {notify}  = this.props;

//         // handleClose = (event, reason) => {
//         //     // this.setState({ notify: {isOpen:false} })
//         //     console.log("notify", notify)
//         //     // this.setState({ notify: {isOpen:false} })
//         //     // setNotify({isOpen: false, message:'', type:''  })
    
//         //     // notify.isOpen = false;
//         //     console.log("notify", notify)
//         //     // setNotify({
//         //     //     ...notify,
//         //     //     isOpen: false
    
//         //     // })
//         // }


//     return (
//         <div>
//             <Snackbar
//             // className={classes.root}
//             open={notify.isOpen}
//             autoHideDuration={3000}
//             anchorOrigin={{vertical: 'top', horizontal:'right'}}
//             onClose={this.props.onClose}
//             >
//                 <Alert 
//                     severity = {notify.type} 
//                     onClose={this.props.onClose}
//                     >
//                     { notify.message }
//                 </Alert>
//             </Snackbar>
//         </div>
//     )
// }
// }
// export default Notification;
