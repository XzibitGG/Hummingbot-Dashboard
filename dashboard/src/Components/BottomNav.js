import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import React from "react";
import ConfigContainer from "./ConfigContainer";
import MarketOrders from "./MarketOrders";

class BottomNav extends React.Component{
    constructor(props) {
        super(props);
        this.currNavPage = 0;
    }

    changeBottomNav = (event, value) => {
        this.currNavPage = value;
        this.forceUpdate();
    }

    getBottomNav() {
        if(this.currNavPage === 0){
            return <ConfigContainer width={"80vw"} margin={"auto"} config={this.props.config}/>
        }
        return <MarketOrders orders={this.props.orders}/>
    }


    render() {
        return(
            <div>
                <Tabs indicatorColor={"primary"} value={this.currNavPage} onChange={this.changeBottomNav}>
                    <Tab style={{"font-family": "Lucida Console", "font-size": "20px", "color": "#f50057"}} text key={"Config"} label={"Config"}/>
                    <Tab style={{"font-family": "Lucida Console", "font-size": "20px", "color": "#f50057"}} text key={"Orders"} label={"Orders"}/>
                </Tabs>
                {this.getBottomNav()}
            </div>
        );
    }
}
export default BottomNav;