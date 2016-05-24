app.directive('loginForm',function($http){
  return {
    restrict: 'EA',
    link: function(scope){
      scope.submit = function(login){
        $http.post('/login',login);
      }
    }
  }
})
