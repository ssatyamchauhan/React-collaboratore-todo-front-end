import React, { Component } from 'react';
import Project from './Component/Project/project';
import Projectlist from './Component/Project/listofproject'
import ls from 'local-storage'
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert'
import axios from 'axios'
import './App.css';

class Projects extends Component {
      
  constructor(props){
    super(props)

    this.state = {
      projectName:null,
      projectList:[],
      isLoggedIn:false,
      isCardClick:false,
      cardId:null
    }

  }


  UNSAFE_componentWillMount(){

    if(ls.get('credentials')){
      this.setState({
        isLoggedIn:true
      })
    }

    axios.get('/project',{params:{token:ls.get('credentials')}})
      .then(data => {
        console.log(data)
        this.setState({projectList:data.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeHandler = (e) =>  {
    this.setState({
        projectName:e.target.value
    })
}

  addNewProject = () => {

    if(this.state.projectName){     

       axios.post('/project',{token:ls.get('credentials'),name:this.state.projectName})
            .then(data => {
              this.setState({
                projectList:data.data
              })
              console.log(data)
            })
            .catch(err => {
              console.log(err)
            })
          }
    else{
      swal("Name Is Empty", "You have not entered then project name...!","error")
    }
  }

  cardClick = (e) => {
    console.log(e)
    this.setState({
      isCardClick:true,
      cardId:e
    })
   
  }

  render() {

      if(!this.state.isLoggedIn){
        return <Redirect to="/login" />
      }
      if(this.state.isCardClick){
        return <Redirect to={`/projects/view/${this.state.cardId}`} />
      }
        return (
            <React.Fragment>
              <Project addNewProject={this.addNewProject} changeHandler={this.changeHandler} />
              <Projectlist projectList={this.state.projectList} cardClick={this.cardClick}/>
            </React.Fragment>
        )
  }
}


export default Projects;
