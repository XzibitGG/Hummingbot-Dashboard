import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import BottomNav from "../BottomNav";
import OrderBookWidget from "../Widgets/OrderBookWidget";

class AMMArbitrage extends React.Component{
    render() {
        let market_1 = this.props.config["market_1"];
        let market_2 = this.props.config["market_2"];
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={market_1}/>
                    </Grid>
                    <Grid item>
                        <OrderBookWidget market={market_1} exchange={this.props.config["connector_1"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default AMMArbitrage;