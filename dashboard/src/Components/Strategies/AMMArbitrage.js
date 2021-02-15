import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../TradingViewWidget";
import ConfigContainer from "../ConfigContainer";
import React from "react";

class AMMArbitrage extends React.Component{
    render() {
        let market_1 = this.props.config["market_1"];
        let market_2 = this.props.config["market_2"];
        return(
            <Grid container className={this.props.classes.root} spacing={10}>
                <Grid item>
                    <TradingViewWidget market={market_1}/>
                </Grid>
                <Grid item>
                    <ConfigContainer config={this.props.config}/>
                </Grid>
            </Grid>
        );
    }
}

export default AMMArbitrage;