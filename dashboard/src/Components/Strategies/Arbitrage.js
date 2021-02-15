import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../TradingViewWidget";
import ConfigContainer from "../ConfigContainer";
import React from "react";

class Arbitrage extends React.Component{
    render() {
        let primary_market = this.props.config["primary_market_trading_pair"];
        let secondary_market = this.props.config["secondary_market_trading_pair"];
        return(
            <Grid container className={this.props.classes.root} spacing={10}>
                <Grid item>
                    <TradingViewWidget market={primary_market}/>
                </Grid>
                <Grid item>
                    <ConfigContainer config={this.props.config}/>
                </Grid>
            </Grid>
        );
    }
}

export default Arbitrage;