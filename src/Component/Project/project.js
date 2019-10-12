import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';


export default class Project extends Component {

    constructor(props){
        super(props)
        this.state={
            open:false,
        }
    }

    handleClickOpen = () => {
        this.setState({
            open:true
        })
    }

    handleClose = () => {
        this.setState({
            open:false,
            projectName:''
        })
    }

    addNewProject = () => {
        this.setState({
            open:false
        })
        this.props.addNewProject()
    }


render() {

      return (
        <div>
            <LibraryAddIcon onClick={this.handleClickOpen} style={{position: "absolute", bottom: 120, right: 120}}/>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
                <DialogContent >
                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={this.props.changeHandler}
                        id="project"
                        type="text"
                        placeholder="Project Name"
                        fullWidth
                    />
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.addNewProject} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
        )
    }
}
