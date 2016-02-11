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
.controller('menuCtrl', function($scope){
var tabClasses;
var curId = 0;

function initTabs() {
tabClasses = ["","","",""];
}

$scope.getTabClass = function (tabNum) {
return tabClasses[tabNum];
};

$scope.getTabPaneClass = function (tabNum) {
return "tab-pane " + tabClasses[tabNum];
}

$scope.setActiveTab = function (tabNum) {
initTabs();
curId = tabNum;
tabClasses[tabNum] = "active";
};

$scope.showTab = function(tabId) {
  if(tabId == curId) {
    return true;
  } else {
    return false;
  }
}

$scope.setTab = function(tabId) {
  if(curId == tabId) {
    $scope.setActiveTab(0);
  } else {
    $scope.setActiveTab(tabId);
  }
}

//Initialize
  initTabs();
  $scope.setActiveTab(0);
});
