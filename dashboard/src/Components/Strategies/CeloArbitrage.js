import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import BottomNav from "../BottomNav";
import OrderBookWidget from "../Widgets/OrderBookWidget";

class CeloArbitrage extends React.Component{
    render() {
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={this.props.config["secondary_market"]}/>
                    </Grid>
                    <Grid item>
                        <OrderBookWidget market={this.props.config["secondary_market"]} exchange={this.props.config["secondary_exchange"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default CeloArbitrage;