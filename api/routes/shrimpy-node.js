const express = require("express");
const router = express.Router();
const Shrimpy = require('shrimpy-node');


const publicClient = new Shrimpy.ShrimpyApiClient();
const supportedExchanges = ["binance", "bittrex", "kucoin", "poloniex", "bibox", "huobiglobal", "bitmart", "okex",
                            "binanceus", "bittrexinternational", "coinbasepro", "kraken", "gemini", "hitbtc", "bitstamp", "bitfinex"];

router.get("/", function(req, res, next) {
    let exchange = (supportedExchanges.includes(req.query.exchange.replace("_", ""))) ? req.query.exchange.replace("_", "") : "binance";
    publicClient.getOrderBooks(exchange, req.query.base, req.query.quote, 50)
        .then(orderBooks => res.send(orderBooks[0]["orderBooks"][0]["orderBook"]))
});

module.exports = router;