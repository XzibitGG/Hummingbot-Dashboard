import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './App.css';
import StrategyContainer from "./Components/StrategyContainer";

const useStyles = theme => ({
    '@global': {
        '*::-webkit-scrollbar': {
            width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
        },
    },
    root: {
        background: '#131722',
        color: "white",
        "& div.MuiPaper-root": {
            backgroundColor: "#131722",
            color: "white",
            width: '100%',
            marginTop: theme.spacing.unit * 3,
            overflowX: 'auto',
        },
        "& td.MuiTableCell-root": {
            font: 'Comic Sans'
        },
        "& td.MuiTableCell-body": {
            color: "white"
        },
        "& th.MuiTableCell-root": {
            color: "white"
        },
    },
});

class App extends Component{
  constructor(props) {
    super(props);
    this.currBot = 0;
    this.currStrat = 1;
    this.bots = null;
    this.files = null;
    this.config = null;
    this.orders = null;
  }

  getBotInstance() {
    fetch(`http://${window.location.hostname}:9000/botInstance`)
        .then(res => res.json())
        .then(res => {
            let bots = Object.keys(res);
            let botFiles = res[bots[this.currBot]];
            if(bots.length > 0 && Object.keys(botFiles).length > 1 && botFiles[Object.keys(botFiles)[this.currStrat]]) {
                this.bots = bots;
                this.files = Object.keys(res[bots[this.currBot]]);
                this.config = botFiles[Object.keys(botFiles)[this.currStrat]]["config"];
                this.orders = botFiles[Object.keys(botFiles)[this.currStrat]]["orders"];
                this.files.shift();
                this.forceUpdate();
            }
        });
  }

  componentDidMount() {
    this.getBotInstance();
  }

  componentWillUnmount() {}

  componentDidCatch(error, info) {window.location.reload();}

  handleBotChange = (event, value) => {
      this.currBot = value;
      this.getBotInstance();
  }

  handleFileChange = (event, value) => {
      this.currStrat = value + 1;
      this.getBotInstance();
  }

  render() {
    if(this.config == null || this.orders == null || this.bots == null || this.files == null){
        return (<p className="Loading">Searching for hummingbot instances..</p>);
    }
    const { classes } = this.props;
    return (
        <div className="Dashboard">
          <header className="Dashboard-Header">
              <Paper className={classes.root} >
                  <Tabs indicatorColor={"primary"} value={this.currBot} onChange={this.handleBotChange} centered variant="fullWidth">
                      {this.bots.map((bot) => (
                          <Tab style={{"font-family": "Lucida Console", "font-size": "20px", "color": "#f50057"}} text key={bot} label={bot}/>
                      ))}
                  </Tabs>
                  <Tabs style={{"margin" : "10px"}} indicatorColor={"secondary"} value={this.currStrat - 1} onChange={this.handleFileChange} centered variant="fullWidth">
                      {this.files.map((strat) => (
                          <Tab textColor={"secondary"} text key={strat} label={strat}/>
                      ))}
                  </Tabs>
              </Paper>
          </header>
            <StrategyContainer classes={classes} orders={this.orders} config={this.config} market={this.market}/>
        </div>
    );
  }
}
export default withStyles(useStyles)(App);
