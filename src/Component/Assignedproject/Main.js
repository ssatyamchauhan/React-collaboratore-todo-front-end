import React from 'react'
import Header from './header'
import Todo from './Todo'
import Listoftodo from './listoftodo'
import ls from 'local-storage'
import axios from 'axios'
import _ from 'underscore'
import swal from 'sweetalert'
import { Redirect } from 'react-router-dom'


// import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


export default class Main extends React.Component {

    constructor(props) {
        super(props)

        this.state={
            todo:'',
            assignedto:null,
            isLoggedIn:false,
            projectid:null,
            listoftodo:[],
            editId:null,
            editText:null,
            isEdit:false,
            isProfile:false
        }
    }

    UNSAFE_componentWillMount(){

       axios.get('/todo', {params:{token:ls.get('credentials'),projectid:Number(this.props.match.params.cardId)}})
            .then(data => {
                console.log(data)
                this.setState({
                    listoftodo:data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }


    changeHandler = (e) => {
        console.log('changeHandler is called', e.target.id)
        if(e.target.id === 'todo'){
            this.setState({
                todo:e.target.value
            })
        }
        else if(e.target.id === 'assignedto'){
            this.setState({
                assignedto:e.target.value
            })
        }
    }

    edittodo = (e) => {
        this.setState({
            editText:e.target.value
        })
    }

    addtodo = (e) => {
        console.log('addtodo function is called!')
        if(e.key==='Enter'){
            // console.log('Enter is pressed')

            console.log('Enter is pressed')
            if(this.state.isEdit){

                console.log(this.state.isEdit)
                var projectid = this.props.match.params.cardId;
                console.log('projectid',projectid)
                axios.put('/todo', {
                        projectid:projectid,
                        todo:this.state.editText,
                        id:this.state.editId,
                        token:ls.get('credentials')
                    })
                    .then(data => {
                        console.log('posted successfully!')
                        this.setState({
                            isEdit:false,
                            editText:null,
                            editId:null,
                            listoftodo:data.data})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

            else{
                if(this.state.assignedto && this.state.todo){
                    projectid = this.props.match.params.cardId;
                    console.log('projectid',projectid)
                    axios.post('/todo', {
                            projectid:Number(projectid),
                            assignedto:this.state.assignedto, 
                            todo:this.state.todo,
                            done:false ,
                            token:ls.get('credentials')
                        })
                        .then(data => {
                            if(data.data === 'invalid'){
                                swal("This user does not exists!", "No user exists to this email...!", "error")
                            }
                            else{
                                this.setState({
                                    todo:null,
                                    assignedto:null,
                                    listoftodo:data.data
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }
                }
            }
        }
    

    delete = (e) => {
        
        axios.post('/delete/'+e+'', {
            token:ls.get('credentials'),
            projectid: this.props.match.params.cardId
            })
            .then(data => {
                this.setState({
                    listoftodo:data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    checkbox = (e) => {
        console.log(e.target.id)
        axios.post('/done/'+Number(e.target.id)+'',{
                done:e.target.checked,
                token:ls.get('credentials'),
                projectid:Number(this.props.match.params.cardId)
            })
            .then(data => {
                this.setState({
                    listoftodo:data.data
                })
            })
            .catch(err => console.log(err))
    }

    DoubleClick = (e) => {
        var {listoftodo} = this.state;

        var dict = _.findWhere(listoftodo,{id:e})
        console.log('done it is okay')

        this.setState({
            editId: dict.id,
            editText:dict.todo,
            isEdit:true
        })
    }

    profile = () => {
        this.setState({
            isProfile:true
        })
    }
    logout = () => {
        ls.clear('credentials')
        this.setState({
            isLoggedIn: true
        })
    }

    render() {
        if(!ls.get('credentials')){
            return <Redirect to="/login" />
        }
            return (
                <React.Fragment>
                    <Header todo={this.state.listoftodo} profile={this.profile} isProfile={this.state.isProfile} logout={this.logout} isLoggedIn={this.state.isLoggedIn}/>
                    <Todo changeHandler={this.changeHandler} todo={this.todo} addtodo={this.addtodo} assignedto={this.state.assignedto} />
                    <Listoftodo edittodo={this.edittodo} DoubleClick={this.DoubleClick} editId={this.state.editId} editText={this.state.editText} todo={this.state.listoftodo} checkbox={this.checkbox} addtodo={this.addtodo}  delete = {this.delete}/>
                </React.Fragment>
            )
    }

}