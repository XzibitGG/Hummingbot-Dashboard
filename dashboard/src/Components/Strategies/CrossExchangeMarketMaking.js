import Grid from "@material-ui/core/Grid";
import TradingViewWidget from "../Widgets/TradingViewWidget";
import React from "react";
import BottomNav from "../BottomNav";
import OrderBookWidget from "../Widgets/OrderBookWidget";

class CrossExchangeMarketMaking extends React.Component{
    render() {
        let maker_market_pair = this.props.config["maker_market_trading_pair"];
        let taker_market_pair = this.props.config["taker_market_trading_pair"]
        return(
            <div>
                <Grid container className={this.props.classes.root} spacing={10}>
                    <Grid item>
                        <TradingViewWidget market={maker_market_pair}/>
                    </Grid>
                    <Grid item>
                        <OrderBookWidget market={maker_market_pair} exchange={this.props.config["maker_market"]}/>
                    </Grid>
                </Grid>
                <BottomNav config={this.props.config} orders={this.props.orders}/>
            </div>
        );
    }
}

export default CrossExchangeMarketMaking;