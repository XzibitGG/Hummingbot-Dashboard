import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../TradingViewWidget";
import ConfigContainer from "../ConfigContainer";
import React from "react";

class CeloArbitrage extends React.Component{
    render() {
        return(
            <Grid container className={this.props.classes.root} spacing={10}>
                <Grid item>
                    <TradingViewWidget market={this.props.config["secondary_market"]}/>
                </Grid>
                <Grid item>
                    <ConfigContainer config={this.props.config}/>
                </Grid>
            </Grid>
        );
    }
}

export default CeloArbitrage;