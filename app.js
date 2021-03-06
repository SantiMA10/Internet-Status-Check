var speedTest = require('speedtest-net'),
    CronJob = require('cron').CronJob,
    Datastore = require('nedb'),
    db = new Datastore({ filename: __dirname+'/data/db.db', autoload: true }),
    express = require('express'),
    app = express(),
    config = require(__dirname+"/config.json"),
    fs = require('fs'),
    bodyParser = require('body-parser');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(express.static(__dirname+'/node_modules/bootstrap/dist/'));
app.use(express.static(__dirname+'/node_modules/jquery/dist/'));
app.use(express.static(__dirname+'/node_modules/angular/'));
app.use(express.static(__dirname+'/js/'));

var internetTest = function() {
    speedTest.visual({maxTime: 5000}, function(err, data) {
        
        if(data){
            db.insert({

                date : new Date(),
                status: true,
                download : data.speeds.download,
                upload : data.speeds.upload,
                host : data.server.host,
                sponsor : data.server.sponsor,
                ping : data.server.ping

            });
        }
        else{
            db.insert({

                date : new Date(),
                status: false

            });
        }

    });
};

try{
    var job = new CronJob(config.crontab, function() {
        internetTest();
    });
    job.start();
} catch (ex) {
    console.log("Crontab expresion error");
}

app.get('/', function(req, res){

    res.render(__dirname+"/views/index");

});

app.get('/config', function(req, res){

    res.render(__dirname+"/views/config");

});

app.get('/latest', function(req, res){

    db.find({}).sort({date : -1}).exec(function(err, docs){
        res.status(200).send({data : docs});
    });

});

app.get('/crontab', function(req, res){

    res.status(200).send({configuration : config.crontab});

});

app.post('/crontab', function(req, res){

    job.stop();

    try{
        job = new CronJob(req.body.configuration, function() {
            internetTest();
        });

    } catch (ex) {

        job = new CronJob(config.crontab, function() {
            internetTest();
        });
        console.log("Crontab expresion error");
        res.status(500);
        res.end();
        return;

    }

    job.start();
    config.crontab = req.body.configuration;
    fs.writeFileSync(__dirname +'/config.json', JSON.stringify(config));

    res.end();

});

app.listen(config.port, function () {
    console.log('Internet Status Checker running on port ' + config.port + '!');
});
