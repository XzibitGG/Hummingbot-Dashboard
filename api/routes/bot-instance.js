const express = require("express");
const router = express.Router();
const Dockernode = require("dockerode");
const dockerode = new Dockernode();
const shell = require("child_process").exec;
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require("glob");

const botFiles = {};

fs.rmdirSync("./bot_files", { recursive: true });
fs.mkdirSync("./bot_files");



dockerode.listContainers({}, function (err, containers) {
    if(err) console.log(err);
    containers.forEach(container => {
       if(container["Image"].includes("hummingbot")){
           shell("docker cp " + container["id"] + ":/data/ " + process.cwd() + "./bot_files" + container);
           shell("docker cp " + container["id"] + ":/conf/ " + process.cwd() + "./bot_files" + container);
           botFiles[container["Names"]] = {"id" : container["Id"]};
       }
    });
});

router.get("/", function(req, res, next) {
    Object.keys(botFiles).forEach(container => {
        shell("docker cp " + botFiles[container]["id"] + ":/data/ " + process.cwd() + "./bot_files" + container);
        shell("docker cp " + botFiles[container]["id"] + ":/conf/ " + process.cwd() + "./bot_files" + container);
        glob('./bot_files'+ container +'/data/*.sqlite', {}, (err, files)=> {
            if(!err) {
                files.forEach(file => {
                    let orders = require('better-sqlite3')(file, {}).prepare('SELECT * FROM \'Order\'').all();
                    if (!botFiles[container][path.parse(file).name]) botFiles[container][path.parse(file).name] = {};
                    botFiles[container][path.parse(file).name]["orders"] = orders;
                });
            }else{
                fs.rmdirSync(process.cwd() + "./bot_files" + container, { recursive: true });
                console.log(err);
            }
        });
        glob('./bot_files' + container +'/conf/*.yml', {}, (err, files)=> {
            files.forEach(file => {
                if(!err) {
                    if (!file.includes("overrides") && !file.includes("global") && !file.includes("logs")) {
                        if (!botFiles[container][path.parse(file).name]) botFiles[container][path.parse(file).name] = {};
                        botFiles[container][path.parse(file).name]["config"] = yaml.load(fs.readFileSync(file, {encoding: 'utf-8'}));
                    }
                }else{
                    fs.rmdirSync(process.cwd() + "./bot_files" + container, { recursive: true });
                    console.log(err);
                }
            });
        });
    });
    res.send(botFiles);
});

module.exports = router;