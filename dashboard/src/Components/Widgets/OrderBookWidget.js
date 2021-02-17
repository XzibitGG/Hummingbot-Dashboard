import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class OrderBookWidget extends React.Component{
    IntervalID;

    constructor(props) {
        super(props);
        this.state = {
            asks: [[0, 0]],
            bids: [[0, 0]],
            spread: 0
        };
        this.pair = this.props.market.split("-");
    }

    getOrderBook(){
        fetch(`http://${window.location.hostname}:9000/shrimpyNode?exchange=${this.props.exchange}&base=${this.pair[0]}&quote=${this.pair[1]}`)
            .then(res => res.json())
            .then(res => {
                let cumulativeQuantityAsk = 0;
                let cumulativeQuantityBid = 0;
                this.setState({
                    asks : res["asks"].map(function (ask) {
                        cumulativeQuantityAsk += parseFloat(ask["quantity"]);
                        return [parseFloat(ask["price"]), cumulativeQuantityAsk];
                    }),
                    bids : res["bids"].map(function (bid) {
                        cumulativeQuantityBid += parseFloat(bid["quantity"]);
                        return [parseFloat(bid["price"]), cumulativeQuantityBid];
                    }),
                    spread: ( (this.state.asks[0][0] - this.state.bids[0][0]) / ( (this.state.asks[0][0] + this.state.bids[0][0]) /2) ) * 100
                });
                this.forceUpdate();
            });
    }


    componentDidMount() {
        this.IntervalID = setInterval(this.getOrderBook.bind(this), 8000);
    }

    componentWillUnmount() {
        clearInterval(this.IntervalID);
    }


    render() {
        return(
            <div style={{width: "40vw", height: '50vh', margin : "0px"}}>
                <br/>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {type: 'area', zoomType: 'xy', height: "70%", backgroundColor: "#131722"},
                        title: {text: `Spread: ${this.state.spread}%`,style: {color: 'white', fontWeight: 'bold'}},
                        xAxis: {minPadding: 0, maxPadding: 0, plotLines: [{color: 'white', value: 0.1523, width: 1, label: {text: 'Actual price', rotation: 90}}], title: {text: 'Price'}},
                        yAxis: [{lineWidth: 1, gridLineWidth: 1, title: null, tickWidth: 1, tickLength: 5, tickPosition: 'inside', labels: {align: 'left', x: 8}},
                            {opposite: true, linkedTo: 0, lineWidth: 1, gridLineWidth: 0, title: null, tickWidth: 1, tickLength: 5, tickPosition: 'inside', labels: {align: 'right', x: -8}}],
                        legend: {enabled: false},
                        plotOptions: {area: {fillOpacity: 0.8, lineWidth: 1, step: 'center'}
                        },
                            tooltip: {
                            headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
                            valueDecimals: 6
                        },
                            series: [{
                            name: 'Bids',
                            data: this.state["bids"],
                            color: '#03a7a8'
                        }, {
                            name: 'Asks',
                            data: this.state["asks"],
                            color: '#fc5857'
                        }]
                    }}
                />
            </div>
        );
    }
}

export default OrderBookWidget;