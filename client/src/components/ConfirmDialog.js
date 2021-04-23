import React from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
import Button from 'reactstrap/lib/Button'

const useStyles = makeStyles( theme => ({
    dialog: {
        padding:  theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
      },
      dialogContent: {
          textAlign: 'center'
      },
      dialogActions : {
          justifyContent : 'center'
      },
    
  }))
  

  export default function ConfirmDialog (props) {
    
      const { confirmDialog, setConfirmDialog } = props;  
      const classes = useStyles()
        // console.log("hhhhhhhhh",confirmDialog)
        // debugger

        return (
            <Dialog open={confirmDialog.isOpen} classes={{paper:classes.dialog}}>
                <DialogTitle>
                    
                </DialogTitle>
                <DialogContent className={classes.dialogContent}>
                    <Typography variant="h6" >
                        { confirmDialog.title }
                    </Typography>
                    <Typography variant="subtitle2" >
                        { confirmDialog.subtitle }
                    </Typography>
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                     <Button color="danger" 
                    onClick={confirmDialog.onConfirm}
                    >Yes</Button>
                     
                    <Button 
                        onClick={() => { setConfirmDialog({isOpen:false, title:'', subtitle:'' }) } }
                    >No</Button> 


                </DialogActions>

            </Dialog>
            
            
        )
        
    
}
