(function(){
    'use strict';

    angular
        .module('isc', [ ])
        .controller('homeController', homeController);

    function homeController( $http ){
        var homeController = this;

        $http.get('/latest').then(
            function(data){
                homeController.latest = data.data.data;

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
                
            },
            function(error){

            });

    };

})();