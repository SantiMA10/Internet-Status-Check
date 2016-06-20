(function(){
    'use strict';

    angular
        .module('isc', [ ])
        .controller('homeController', homeController)
        .controller('configurationController', configurationController);

    function homeController( $http ){
        var homeController = this;

        $http.get('/latest').then(
            function(resp){
                homeController.latest = resp.data.data;

                homeController.averages = {
                    download : 0,
                    upload : 0,
                    ping : 0,
                    up : 0,
                    total : 0
                };

                homeController.latest.forEach(function(value){

                    if(value.status){
                        homeController.averages.download += value.download;
                        homeController.averages.upload += value.upload;
                        homeController.averages.ping += value.ping;
                        homeController.averages.up++;
                    }

                    homeController.averages.total++;

                });

                homeController.averages.download = homeController.averages.download/homeController.averages.up;
                homeController.averages.upload = homeController.averages.upload/homeController.averages.up;
                homeController.averages.ping = homeController.averages.ping/homeController.averages.up;
                
            });

    }

    function configurationController( $http ) {
        
        var configurationController = this;


        $http.get('/crontab')
            .then(function(resp){

                var crontab = resp.data.configuration.split(" ");

                configurationController.crontab = {
                    second : crontab[0],
                    minute : crontab[1],
                    hour   : crontab[2],
                    day    : crontab[3],
                    month  : crontab[4],
                    year   : crontab[5]
                };

            });
        
        configurationController.save = function(){

            console.log(configurationController.crontab);
            var crontab = configurationController.crontab.second + " "
                        + configurationController.crontab.minute + " "
                        + configurationController.crontab.hour   + " "
                        + configurationController.crontab.day    + " "
                        + configurationController.crontab.month  + " "
                        + configurationController.crontab.year;

            var post = {
                url: '/crontab',
                method: 'POST',
                data: {configuration : crontab},
                headers: {'Content-Type': 'application/json'}
            };

            $http(post).then(function () {
               console.log("Sucess");
            }, function (err) {
                console.log(err);
            });

        }

    }

})();