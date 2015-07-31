
var openWeatherMapApp = angular.module("openWeatherMapApp",['ngMessages','ngRoute']);
openWeatherMapApp.run(function($rootScope,$location){
  $rootScope.$on('$routeChangeError', function(){
    $location.path('/error');
  });
});
openWeatherMapApp.value('ownCities',['New York','Mumbai','Pune']);

openWeatherMapApp.config(function($routeProvider,$locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider
  .when('/',{
    templateUrl: 'home.html',
    controller: 'HomeController'
  })
  .when('/cities/:city', {
    templateUrl:'city.html',
    controller:'CityController',
    resolve: {
      city: function(ownCities,$route,$location) {
        var city = $route.current.params.city;
        city = city.replace("_"," ");
        if(ownCities.indexOf(city) == -1) {
          //city not found
          $location.path('/error');
          return;
        }
        return city;
      }
    }
  })
  .when('/error',{
    template: '<p> Error - Page not found</p>'
  })
  .otherwise('/error');
});

openWeatherMapApp.controller('HomeController',function($scope) {

});

openWeatherMapApp.controller('CityController',function($scope,$routeParams,city) {
  $scope.city = city;
});