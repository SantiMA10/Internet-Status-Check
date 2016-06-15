var speedTest = require('speedtest-net'),
    CronJob = require('cron').CronJob,
    Datastore = require('nedb'),
    db = new Datastore({ filename: 'data/db.db', autoload: true }),
    express = require('express'),
    app = express();


var internetTest = function() {
    speedTest.visual({maxTime: 5000}, function(err, data) {
        console.dir(data.speeds);

        db.insert({

            date : new Date(),
            download : data.speeds.download,
            upload : data.speeds.upload,
            host : data.server.host,
            sponsor : data.server.sponsor

        });
    });
};

try{
    var job = new CronJob('* */5 * * * *', function() {
        console.log("Start");
        internetTest();
    });
    job.start();
} catch (ex) {
    console.log("Expresion error")
}



app.get('/', function(req, res){

    db.find({}).sort({date : 1}).exec(function(err, docs){
        res.render('index', {data : docs});
    });

});

app.set('view engine', 'pug');
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
