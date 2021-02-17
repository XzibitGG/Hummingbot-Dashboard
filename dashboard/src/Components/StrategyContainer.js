import PureMarketMaking from "./Strategies/PureMarketMaking";
import React from "react";
import CrossExchangeMarketMaking from "./Strategies/CrossExchangeMarketMaking";
import PerpetualMarketMaking from "./Strategies/PerpetualMarketMaking";
import LiquidityMiningStrategy from "./Strategies/LiquidityMiningStrategy";
import CeloArbitrage from "./Strategies/CeloArbitrage";
import Arbitrage from "./Strategies/Arbitrage";
import AMMArbitrage from "./Strategies/AMMArbitrage";

class StrategyContainer extends React.Component{
    render() {
        switch (this.props.config["strategy"]) {
            case "pure_market_making":
                return(<PureMarketMaking classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "cross_exchange_market_making":
                return(<CrossExchangeMarketMaking classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "perpetual_market_making":
                return(<PerpetualMarketMaking classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "liquidity_mining":
                return(<LiquidityMiningStrategy classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "celo_arb":
                return(<CeloArbitrage classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "arbitrage":
                return(<Arbitrage classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
            case "amm_arb":
                return(<AMMArbitrage classes={this.props.classes} orders={this.props.orders} config={this.props.config}/>);
        }
    }
}

export default StrategyContainer;