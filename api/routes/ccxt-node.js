const express = require("express");
const router = express.Router();
const ccxt = require("ccxt");

router.get("/", async function(req, res, next) {
    let exchangeQuery = req.query.exchange.replace("_", "");
    let symbol = `${req.query.base}/${req.query.quote}`;
    let id = (ccxt.exchanges.indexOf(exchangeQuery) > -1) ? exchangeQuery : "binance";
    let exchange = new ccxt[id]({ enableRateLimit: true });
    let markets = await exchange.loadMarkets();
    if (symbol in markets){
        let orderbook = await exchange.fetchOrderBook(symbol);
        let cumulativeAskVolume = 0;
        let cumulativeBidVolume = 0;

        let asks = orderbook.asks.slice(0, 50).map(ask => {
            cumulativeAskVolume += ask[1];
            return[ask[0], cumulativeAskVolume];
        });
        let bids = orderbook.bids.slice (0, 50).map(bid => {
            cumulativeBidVolume += bid[1];
            return[bid[0], cumulativeBidVolume];
        });
        res.send({
            "orderbook_data" : true,
            "asks": asks,
            "bids": bids,
            "spread" : ( (asks[0][0] - bids[0][0]) / ( (asks[0][0] + bids[0][0])/2 ) ) * 100,
            "mid_price" : (asks[0][0] + bids[0][0])/2
        });
    }else{
        res.send({"orderbook_data" : false, "asks": [[0, 0]], "bids": [[0, 0]], "spread" : 0, "mid_price" : 0});
    }
});

module.exports = router;