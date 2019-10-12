import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ls from 'local-storage'
import Header from './projectheader'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    margin: 10,
    color: 'black',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  var isProfile=false
  var isLoggedIn=false

  const profile = () => {
    isProfile = true;
    console.log('profile is clicked!')
    }

  const logout = () => {
      ls.clear('credentials')
      console.log('logout button is clicked!')
      isLoggedIn=true
      
  }

  
  console.log('here is your projectlist',props.projectList[0])
  var Cards;
  if(props.projectList === undefined || props.projectlist === [] || props.projectList[0] === null){
    return  Cards = <Typography variant="h1">You Have not created any Project yet.</Typography>
  }
  else{
          Cards = props.projectList.map((i,index) => {
            return <Card className={classes.card} key={index} onClick={() => props.cardClick(i.id)}>
                    <CardHeader
                      avatar={
                        <Avatar alt="Remy Sharp" src="https://www.searchpng.com/wp-content/uploads/2019/02/Profile-ICon.png" />
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={i.name}
                      subheader={i.createdon}
                    />
                    <CardMedia
                      className={classes.media}
                      image="https://upload.wikimedia.org/wikipedia/en/2/27/The_Project_Title_Card.jpg"
                      title="click to open"
                    />
                    <CardContent>
                      <Typography variant="body2" color="textPrimary" component="p">
                          Welcome By clicking it! There is todos that is assigned by/to you. You can add, edit, delete and mark as done todos.
                      </Typography>
                    </CardContent>
                      <CardHeader subheader={`Created By ${i.email}`}/>
                </Card>
            })
  }

  return (
    <div>
        <Header profile={props.profile} logout={props.logout} isProfile={props.isProfile} isLoggedIn={props.isLoggedIn} />
        <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
          {Cards}
        </div>
    </div>
  );

}



