import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import BottomNav from "../BottomNav";
import OrderBookWidget from "../Widgets/OrderBookWidget";

class LiquidityMiningStrategy extends React.Component{
    render() {
        let markets = this.props.config["markets"].split(",");
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={markets[0]}/>
                    </Grid>
                    <Grid item>
                        <OrderBookWidget market={markets[0]} exchange={this.props.config["exchange"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default LiquidityMiningStrategy;