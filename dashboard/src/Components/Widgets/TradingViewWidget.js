import React from "react";

class TradingViewWidget extends React.Component{
    render() {
        return (
            <iframe style={{height: "60vh", width: "50vw"}}
                    src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_47802&symbol=
                    ${this.props.market.replace("-", "")}
                    &theme=dark&locale=en&utm_source=localhost&utm_medium=widget_new&interval=D`}>
            </iframe>);
    }
}

export default TradingViewWidget;