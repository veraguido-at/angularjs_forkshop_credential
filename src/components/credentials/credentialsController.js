(function() {
    'use strict';

    /* Credentials Controllers */
    angular.module('CredentialsModule')
        .controller('CredentialsController', ['$scope', '$q', 'Credentials', function ($scope, $q, Credentials) {
            $scope.username = "";
            $scope.password = "";
            $scope.credentialsOK = false;
            $scope.loading = false;

            $scope.validateCredentials = function(username) {
              console.log(username);
                return toggleLoading(username)
                    .then(readUser)
                    .then(verifyPassword)
                    .then(saveScopeVariables)
                    .then(toggleLoading)
                    .catch(function() {
                        $scope.loading = false;
                        $scope.password = 'NOP';
                    });

                function readUser(username) {
                    return Credentials.readUser(username);
                }

                function verifyPassword(user) {
                    if(user.password === Credentials.calculatePassword(username)) {
                        console.log(user);
                        return $q.resolve(user);
                    } else {
                        console.log("reject!");
                        return $q.reject('Calculated password does not match stored password');
                    }
                }

                function saveScopeVariables(user) {
                  console.log(user.password);
                    $scope.password = user.password;
                    console.log(CryptoJS.SHA256(user.password));
                    $scope.credentialsOK = true;
                    return $q.resolve(user);
                }

                function toggleLoading(input) {
                    $scope.loading = !$scope.loading;
                    return $q.resolve(input);
                }
            };
        }]);
})();
