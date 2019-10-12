import React from 'react';
import {Grid, TextField,Paper} from "@material-ui/core";

function Todo(props){
    
    return(
        <Paper style={{ margin: 16, padding: 14}} >
                <Grid container>
                    <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Add Your Todo Here"
                            id="todo"
                            onChange={props.changeHandler}
                            onKeyPress={props.addtodo}
                            value={props.todo}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Assigned To"
                            id="assignedto"
                            onChange={props.changeHandler}
                            value={props.assigned}
                            type="email"
                            onKeyPress={props.addtodo}
                            // onKeyPress={}
                            fullWidth
                        />
                    </Grid>
                </Grid>
        </Paper>
        
    )
}
export default Todo