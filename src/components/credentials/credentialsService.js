(function() {
    'use strict';

    /* Tasks Services */
    angular.module('CredentialsModule')
        .factory('Credentials', ['config', '$http', function (config, $http) {
            var base_uri = config.mongolab.base_uri;
            var api_key = config.mongolab.api_key;

            return {
                readUser: function (username) {
                    var request = {
                        method: 'GET',
                        url: base_uri,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            'apiKey': api_key,
                            'q': '{"username":"'+username+'"}'
                        }
                    };

                    return $http(request).then(function (response) {
                        return translate_idToid(response.data[0]);
                    });
                },
                calculatePassword: function(username) {
                  var returnVar = CryptoJS.AES.encrypt(username, 'mati es el mejor');
                  console.log(returnVar.toString().substring(0,5));
                    return returnVar.toString().substring(0,5);
                }
            };

            function translate_idToid(user) {
              console.log(user);
                user.id = user._id.$oid;
                delete user._id;
                return user;
            }
        }]);
})();
