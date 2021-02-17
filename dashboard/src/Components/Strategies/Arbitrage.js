import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import BottomNav from "../BottomNav";
import OrderBookWidget from "../Widgets/OrderBookWidget";

class Arbitrage extends React.Component{
    render() {
        let primary_market = this.props.config["primary_market_trading_pair"];
        let secondary_market = this.props.config["secondary_market_trading_pair"];
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={primary_market}/>
                    </Grid>
                    <Grid>
                        <OrderBookWidget market={primary_market} exchange={this.props.config["primary_market"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default Arbitrage;