import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../TradingViewWidget";
import ConfigContainer from "../ConfigContainer";
import React from "react";

class LiquidityMiningStrategy extends React.Component{
    render() {
        let markets = this.props.config["markets"].split(",");
        return(
            <Grid container className={this.props.classes.root} spacing={10}>
                <Grid item>
                    <TradingViewWidget market={markets[0]}/>
                </Grid>
                <Grid item>
                    <ConfigContainer config={this.props.config}/>
                </Grid>
            </Grid>
        );
    }
}

export default LiquidityMiningStrategy;