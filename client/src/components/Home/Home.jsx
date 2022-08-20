import React, {useState, useEffect} from 'react'
import {Container, Grid, Grow} from "@material-ui/core";
import {useDispatch} from "react-redux" //to dispatch an action
import {getPosts} from "../../action/post";
import useStyles from "../../styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";


export function Home() {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();  
    // useEffect() --> At first going to be the component that mount but later it become component that updated
    useEffect(() => {
        dispatch(getPosts());
    },[currentId, dispatch])
  return (
    
        <Grow in >
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs= {12} sm={7}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    <Grid item xs= {12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
  )
}

export default Home