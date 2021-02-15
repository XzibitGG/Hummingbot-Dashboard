import PureMarketMaking from "./Strategies/PureMarketMaking";
import React from "react";

class StrategyContainer extends React.Component{
    render() {
        if(this.props.config["strategy"] === "pure_market_making") return(<PureMarketMaking classes={this.props.classes} config={this.props.config}/>);
        return(<PureMarketMaking classes={this.props.classes} config={this.props.config} market={this.props.market}/>);
    }
}

export default StrategyContainer;