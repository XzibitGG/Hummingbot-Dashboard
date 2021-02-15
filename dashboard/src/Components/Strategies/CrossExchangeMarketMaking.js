import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../TradingViewWidget";
import ConfigContainer from "../ConfigContainer";
import React from "react";

class CrossExchangeMarketMaking extends React.Component{
    render() {
        let maker_market_pair = this.props.config["maker_market_trading_pair"];
        let taker_market_pair = this.props.config["taker_market_trading_pair"]
        return(
            <Grid container className={this.props.classes.root} spacing={10}>
                <Grid item>
                    <TradingViewWidget market={maker_market_pair}/>
                </Grid>
                <Grid item>
                    <ConfigContainer config={this.props.config}/>
                </Grid>
            </Grid>
        );
    }
}

export default CrossExchangeMarketMaking;