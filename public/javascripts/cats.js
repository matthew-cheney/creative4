var catApp = angular.module('catApp', []);
catApp.controller('catCtrl', function($scope, $http) {

    $scope.exitWelcome = function() {
        document.getElementById("welcomePage").style.display = "none";
    };

    console.log("working");
    var catI = 0;
    var catIndex = 0;
    $scope.cats = {};
    $scope.imageOnDisplay;
    $scope.progressBarStyle = { "width": 0 + "vw" };

    var catsLeft = [];
    var arrayToTwenty = [];
    var randInt;
    for (var i = 0; i < 25; i++) {
        arrayToTwenty.push(i);
    }
    for (var i = 25; i > 0; i--) {
        randInt = Math.floor(Math.random() * i);
        console.log(randInt)
        catsLeft.push(arrayToTwenty[randInt]);
        arrayToTwenty.splice(randInt, 1);
    }
    catI = catsLeft[catIndex];


    $http.get("getcats")
        .then(function(response) {
            console.log(response);
            $scope.cats = response.data;
            $scope.imageOnDisplay = $scope.cats[catI];
            $scope.imageDiv = { "background-image": "url(" + $scope.imageOnDisplay.url + ")" };
        });

    $scope.cuteIncr = function(amount) {
        console.log("in cuteIncr: ");
        $scope.imageOnDisplay.cute = amount;
        $http({
            url: "upcute",
            method: "POST",
            data: $scope.imageOnDisplay,
        }).then(function successCallback(response) {
            //var data = response.data;
            console.log("response: ", response);
            $scope.incrCat();
            //console.log(data.added);
            console.log("incrementing cute");
            //$scope.cats[catI].cute += 1;
        }, function errorCallback(response) {

        });
    };

    $scope.lameIncr = function(amount) {
        console.log("in lameIncr: ");
        $scope.imageOnDisplay.lame = amount;
        $http({
            url: "uplame",
            method: "POST",
            data: $scope.imageOnDisplay,
        }).then(function successCallback(response) {
            //var data = response.data;
            console.log("response: ", response);
            $scope.incrCat();
            //console.log(data.added);
            console.log("incrementing cute");
            //$scope.cats[catI].cute += 1;
        }, function errorCallback(response) {

        });
    };

    $scope.incrCat = function() {
        console.log("in incrCat");
        catIndex++;
        catI = catsLeft[catIndex];
        if (catIndex > 24) {
            window.location = "/catList.html"
            $http.get("getcats")
                .then(function(response) {
                    console.log(response);
                    $scope.cats = response.data;
                });
        }
        else {
            if (catIndex == $scope.cats.length) {
                catIndex = 0;
            }
            $scope.imageOnDisplay = $scope.cats[catI];
            $scope.imageDiv = { "background-image": "url(" + $scope.imageOnDisplay.url + ")" };
            $scope.progressBarStyle = { "width": (catIndex / 25) * 100 + "vw" };
        }
    }
});
