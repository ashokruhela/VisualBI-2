/*
    * Copyright 2016 NIIT Ltd, Wipro Ltd.
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * Contributors:
    *
    * 1. Ashok Kumar
    * 2. Partha Mukharjee
    * 3. Nabila Rafi
    * 4. Venkatakrishnan U
    * 5. Arun Karthic R
    * 6. Hari Prasad Timmapathini
	 * 7. Yogesh Goyal
 */
angular.module('vbiApp')
    .controller('titleController', ['$scope','$controller','$uibModalInstance', 'tabTitle', function($scope, $controller, $uibModalInstance, tabTitle) {
      var homeCtrl = $scope.$new();
      $controller('homeController',{$scope:homeCtrl});

      $scope.setTabTitle = function(title) {
        $uibModalInstance.close();
        if(tabTitle.setType == 1) {
          homeCtrl.createTab(title);
        } else {
          homeCtrl.renameTab(title, tabTitle.tabIndex)
        }
      }
      $scope.closeModal = function() {
        $uibModalInstance.close();
      }
    }]);
