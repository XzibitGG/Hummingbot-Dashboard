import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import React from "react";
import {Typography} from "@material-ui/core";

class MarketOrders extends React.Component{

    render() {
        if(this.props.orders.length === 0){
            return (
                <Typography variant="h2" color={"secondary"} align={"center"}><br/>Could Not Find Any Orders.</Typography>
            );
        }

        this.props.orders.forEach(order => {delete order.config_file_path; delete order.strategy; delete order.creation_timestamp; delete order.last_update_timestamp;});
        return(
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
        );
    }
}

export default MarketOrders;