'use strict';

habitrpg.controller('TaskDetailsCtrl',
  ['$scope', '$rootScope', '$location', 'User',
  function($scope, $rootScope, $location, User) {

    $scope.task = $rootScope.selectedTask;
    $scope.editing = false;
    $scope.editedTask = null;

    $scope.goBack = function () {
        $rootScope.selectedTask = null;
        $location.path('/' + ($scope.task.id ? $scope.task.type : 'reward'));
    };

    $scope.edit = function () {
        $scope.originalTask = _.cloneDeep($scope.task);
        $scope.editedTask = $scope.task;
        $scope.editing = true;
    };

    $scope.save = function () {
        User.user.ops.updateTask({params:{id:$scope.task.id},body:$scope.task});
        $rootScope.selectedTask = null;
        $location.path('/' + $scope.task.type);
        $scope.editing = false;
    };

    $scope.cancel = function () {
      // reset $scope.task to $scope.originalTask
      _.merge($scope.task, $scope.originalTask);
      $scope.originalTask = null;
      $scope.editedTask = null;
      $scope.editing = false;
    };

    $scope.delete = function () {
      if (!window.confirm("Delete this task?")) return;
      User.user.ops.deleteTask({params:{id:$scope.task.id}});
      $scope.goBack();
    };
  }
]);
