import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";

const useStyles = theme => ({
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


class MarketOrders extends React.Component{

    render() {
        const { classes } = this.props;

        if(this.props.orders.length === 0){
            return (
                <div className={classes.root} style={{ overflow: 'auto', height: '60vh', margin : '0px 0', padding : '0px'}}>
                    <Typography variant="h2" color={"secondary"} align={"center"}><br/>Could Not Find Any Orders.</Typography>
                </div>
            );
        }
        this.props.orders.forEach(order => {delete order.config_file_path; delete order.strategy; delete order.creation_timestamp; delete order.last_update_timestamp;});
        return(
            <div className={classes.root} style={{ overflow: 'auto', height: '60vh', margin : '0px 0', padding : '0px'}}>
                <TableContainer component={Paper}>
                    <Table aria-label="Orders" >
                        <TableHead>
                            <TableRow>
                                {
                                    Object.keys(this.props.orders[0]).map(cell =>
                                        <TableCell>{cell}</TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.orders.map(order => (
                                    <TableRow>
                                        {
                                            Object.keys(order).map(cell =>
                                                <TableCell>{order[cell]}</TableCell>
                                            )
                                        }
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default withStyles(useStyles)(MarketOrders);