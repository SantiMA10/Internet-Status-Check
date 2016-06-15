var speedTest = require('speedtest-net'),
    CronJob = require('cron').CronJob,
    Datastore = require('nedb'),
    db = new Datastore({ filename: 'data/db.db', autoload: true }),
    express = require('express'),
    app = express(),
    config = require("./config.json");


var internetTest = function() {
    speedTest.visual({maxTime: 5000}, function(err, data) {

        if(data){
            db.insert({

                date : new Date(),
                download : data.speeds.download,
                upload : data.speeds.upload,
                host : data.server.host,
                sponsor : data.server.sponsor

            });
        }
        else{
            db.insert({

                date : new Date(),
                download : "No internet connection",
                upload : "No internet connection",
                host : "No internet connection",
                sponsor : "No internet connection"

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
    console.log("Crontab expresion error")
}



app.get('/', function(req, res){

    db.find({}).sort({date : 1}).exec(function(err, docs){
        res.render('index', {data : docs});
    });

});

app.set('view engine', 'pug');
app.use(express.static('node_modules/bootstrap/dist/'));
app.use(express.static('node_modules/jquery/dist/'));
app.listen(config.port, function () {
    console.log('Internet Status Checker running on port ' + config.port + '!');
});
