import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";

class OrderBookWidget extends React.Component{
    IntervalID;

    constructor(props) {
        super(props);
        this.state = {
            orderbook_data: false,
            asks: [[0, 0]],
            bids: [[0, 0]],
            spread: 0,
            mid_price: 0,
        };
        this.pair = this.props.market.split("-");
    }

    getOrderBook(){
        fetch(`http://${window.location.hostname}:9000/ccxtNode?exchange=${this.props.exchange}&base=${this.pair[0]}&quote=${this.pair[1]}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    orderbook_data:  res["orderbook_data"],
                    asks : res["asks"],
                    bids : res["bids"],
                    spread: res["spread"],
                    mid_price: res["mid_price"]
                });
                this.forceUpdate();
            });
    }


    componentDidMount() {
        this.IntervalID = setInterval(this.getOrderBook.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.IntervalID);
    }

    render() {
        if(!this.state.orderbook_data){
            return(<div><Typography variant="h3" color={"secondary"} align={"center"}><br/>Could Not Find Any Orderbook Data.</Typography></div>);
        }
        return(
            <div style={{width: "40vw", height: '50vh', margin : "0px"}}>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                        chart: {type: 'area', zoomType: 'xy', height: "70%", backgroundColor: "#131722"},
                        title: {text: ""},
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
                <Typography color={'primary'} aria-setsize={'20px'} component={'button'}>{`Spread: ${this.state.spread}%`}</Typography>
                <Typography color={'secondary'} aria-setsize={'20px'} component={'button'}>{`Calculated Mid Price: ${this.state.mid_price} ${this.pair[1]}`}</Typography>
            </div>
        );
    }
}

export default OrderBookWidget;