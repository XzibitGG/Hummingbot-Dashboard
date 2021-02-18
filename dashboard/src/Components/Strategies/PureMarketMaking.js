import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import OrderBookWidget from "../Widgets/OrderBookWidget";
import BottomNav from "../BottomNav";


class PureMarketMaking extends React.Component{

    render() {
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={this.props.config["market"]}/>
                    </Grid>
                    <Grid item>
                        <OrderBookWidget market={this.props.config["market"]} exchange={this.props.config["exchange"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default PureMarketMaking;