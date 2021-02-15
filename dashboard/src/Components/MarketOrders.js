import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";

class MarketOrders extends React.Component{
    render() {
        return(
            <TableContainer component={Paper}>
                <Table aria-label="Orders">
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
                            this.props.orders.map(order => (
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
        );
    }
}

export default MarketOrders;