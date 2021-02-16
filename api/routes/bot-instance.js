const express = require("express");
const router = express.Router();
const Dockernode = require("dockerode");
const dockerode = new Dockernode();
const shell = require("child_process").exec;
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const sql = require('better-sqlite3');
const glob = require("glob");

const botFiles = {};

fs.rmdirSync("./bot_files", {recursive: true});
fs.mkdirSync("./bot_files");



dockerode.listContainers({}, function (err, containers) {
    if(err) console.log(err);
    containers.forEach(container => {
       if(container["Image"].includes("hummingbot")){
           shell(`docker cp ${[container]["Id"]}:/data/ ${process.cwd()}/bot_files/${container["Names"]} && docker cp ${[container]["Id"]}:/conf/ ${process.cwd()}/bot_files/${container["Names"]}`);
           botFiles[container["Names"]] = {"id" : container["Id"]};
       }
    });
});

router.get("/", function(req, res, next) {
    Object.keys(botFiles).forEach(container => {
        shell(`docker cp ${botFiles[container]["id"]}:/data/ ${process.cwd()}/bot_files/${container} && docker cp ${botFiles[container]["id"]}:/conf/ ${process.cwd()}/bot_files/${container}`);
        glob.sync('./bot_files'+ container +'/data/*.sqlite').forEach(file => {
            botFiles[container][path.parse(file).name] = {
                "orders" : sql(file, {}).prepare('SELECT * FROM \'Order\'').all(),
                "config" : yaml.load(fs.readFileSync(`./bot_files${container}/conf/${path.parse(file).name}.yml`, {}))
            };
        });
    });
    res.send(botFiles);
});

module.exports = router;