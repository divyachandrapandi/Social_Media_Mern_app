import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import {useSelector} from "react-redux"; //to get post from global reducers
import Post from "./Post/Post"
import useStyles from "./styles";

function Posts({setCurrentId}) {
  const {posts, isLoading} = useSelector((state) => state.posts);  // since paginated the post comes inside a object, from reducer/index.js so destructure it

  const classes = useStyles();
  // -------if there is no data in db ----------------//
  if (!posts.length && !isLoading) return "NoPosts"
  return (
    // if loading the data takes time
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {
          posts.map((post) => (
            <Grid key={post.id} item xs={12} sm={12} md={6} lg={4}>
              <Post  post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))
        }
      </Grid>
    )
  )
}

export default Posts