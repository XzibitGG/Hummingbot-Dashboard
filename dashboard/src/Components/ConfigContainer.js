import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import {Typography} from "@material-ui/core";
import React from "react";

class ConfigContainer extends React.Component{
    render() {
        return(
            <List style={{overflow: 'auto', width: "40vw", height: '50vh', margin: '0 40px'}}>
                <Grid container spacing={1}>
                    {Object.keys(this.props.config).map(key => (
                        <Grid container item xs={6} spacing={2}>
                           <ListItem>
                                <Typography color={'primary'} aria-setsize={'20px'} component={'button'}>{key.replaceAll("_", " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + ":"}</Typography>
                                <Typography color={'secondary'} aria-setsize={'20px'} component={'button'}>{this.props.config[key]}</Typography>
                            </ListItem>
                        </Grid>
                    ))}
                </Grid>
            </List>
        );
    }
}

export default ConfigContainer;