import React from 'react';
import {TextField, Grid, InputAdornment, IconButton} from "@material-ui/core";
import  Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

// ------To pass all props value to the template Input component -----------------//
function Input({name, handleChange, label, autoFocus, type, handleShowPassword, half}) {
  return (
    
    <Grid item xs={12} sm={half ? 6 :12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            // if name attr is password then start endAdornment where onclick the icon, 
            // handleShowPassword function triggered
            // to change the type attr from "password, text" accordingly

            InputProps={name ==="password" ? {
                 endAdornment : (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                 )} :null }// InputProps  
        />
    </Grid>
  )
}

export default Input