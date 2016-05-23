var amdlList = angular.module('amdlList', []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on this page, get all items and show them
  $http.get('/api/items')
    .success(function(data) {
      $scope.items = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    // when submitting the add form, send data to the node API
    $scope.createItem = function() {
      $http.post('/api/items', $scope.formData)
        .success(function(data) {
          $scope.formData = {};
          $scope.items = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };

    // delete an item after checking it
    $scope.deleteItem = function(id) {
      $http.delete('/api/items/' + id)
        .success(function(data) {
          $scope.items = data;
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };
}
