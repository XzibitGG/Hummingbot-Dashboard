import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import './App.css';
import {Typography} from "@material-ui/core";

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
    this.market = "";
    this.state = {bots: null, files: null, config: null, orders: null};
  }

  getEndPoint(endpoint){return "http://localhost:9000/"+endpoint;}

  getBotInstance() {
    fetch(this.getEndPoint("botInstance"))
        .then(res => res.json())
        .then(res => {
            let bots = Object.keys(res);
            let botFiles = res[bots[this.currBot]];
            if(bots.length > 0 && Object.keys(botFiles).length > 1 && botFiles[Object.keys(botFiles)[this.currStrat]]) {
                this.setState({
                    bots: bots,
                    files: Object.keys(res[bots[this.currBot]]),
                    config: botFiles[Object.keys(botFiles)[this.currStrat]]["config"],
                    orders: botFiles[Object.keys(botFiles)[this.currStrat]]["orders"],
                });
                this.market = this.state.config["market"] || this.state.config["primary_market_trading_pair"]
                            || this.state.config["market_1"] || this.state.config["secondary_market"] || this.state.config["maker_market_trading_pair"]
                            || this.state.config["markets"].split(",")[0];
                this.state.files.shift();
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
    if(this.state.config == null || this.state.orders == null || this.state.bots == null || this.state.files == null || this.market == ""){
        this.getBotInstance();
        return (<p className="Loading">Searching for hummingbot instances..</p>);
    }
    const { classes } = this.props;
    return (
        <div className="Dashboard">
          <header className="Dashboard-Header">
              <Paper className={classes.root} >
                  <Tabs indicatorColor={"primary"} value={this.currBot} onChange={this.handleBotChange}>
                      {this.state.bots.map((bot) => (
                          <Tab textColor={"white"} text key={bot} label={bot}/>
                      ))}
                  </Tabs>
                  <Tabs indicatorColor={"secondary"} value={this.currStrat - 1} onChange={this.handleFileChange} centered>
                      {this.state.files.map((strat) => (
                          <Tab textColor={"secondary"} text key={strat} label={strat}/>
                      ))}
                  </Tabs>
              </Paper>
          </header>
            <Grid container className={classes.root} spacing={10}>
                <Grid item>
                    <iframe style={{height: "50vh", width : "50vw"}} src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_47802&symbol=${this.market.replace("-", "")}&interval=D&range=ytd&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&showpopupbutton=1&locale=en&no_referral_id=1&utm_source=localhost&utm_medium=widget_new&`}></iframe>
                </Grid>
                <Grid item>
                    <List style={{overflow: 'auto', width: "40vw", height: '55vh', margin: '0 40px'}}>
                        <Grid container spacing={1}>
                            {Object.keys(this.state.config).map(key => (
                                <Grid container item xs={6} spacing={2}>
                                    <ListItem>
                                        <Typography color={'primary'} aria-setsize={'20px'} component={'button'}>{key.replaceAll("_", " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + ":"}</Typography>
                                        <Typography color={'secondary'} aria-setsize={'20px'} component={'button'}>{this.state.config[key]}</Typography>
                                    </ListItem>
                                </Grid>
                            ))}
                        </Grid>
                    </List>
                </Grid>
            </Grid>
            <div className={classes.root} style={{ overflow: 'auto', height: '40vh', margin : '0px 0', padding : '0px'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="Orders">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Market</TableCell>
                                <TableCell>Order Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Symbol</TableCell>
                                <TableCell>Last Update Timestamp</TableCell>
                                <TableCell>Base Asset</TableCell>
                                <TableCell>Quote Asset</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.orders.map(order => (
                                    <TableRow>
                                        <TableCell>{order["id"]}</TableCell>
                                        <TableCell>{order["market"]}</TableCell>
                                        <TableCell>{order["order_type"]}</TableCell>
                                        <TableCell>{order["amount"]}</TableCell>
                                        <TableCell>{order["symbol"]}</TableCell>
                                        <TableCell>{order["last_update_timestamp"]}</TableCell>
                                        <TableCell>{order["base_asset"]}</TableCell>
                                        <TableCell>{order["quote_asset"]}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
  }
}
export default withStyles(useStyles)(App);
