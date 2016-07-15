angular.module('customersApp').controller('simpleControl',function simpleControl($scope,$http){
		$http.get("customers.json").success(function(response){
			$scope.customers = response;
		});
		$scope.setShow = false;
		$scope.setShowArray = [];
		$scope.order = 'name';
		$scope.reverse=false;
		$scope.updateID = [];
		$scope.deleteID = [];
		$scope.doSort = function(propName){
			$scope.order=propName;
			$scope.reverse=!$scope.reverse;
		};
		$scope.edit = function(){
			console.log($scope.updateID);
		};
		$scope.editArray = function(uniqID,prop){
			console.log(uniqID +''+prop);
		};
		$scope.delete = function(){
			console.log($scope.deleteID);
			var req = {
				method: 'post',
				url: '/delete',
				data: {id : $scope.deleteID}
			}
			$http(req).then(function(){location.reload();});
		}
		$scope.showButtons = function(elem){
			//$scope.setShow = !$scope.setShow;
			if($scope.setShowArray.indexOf(elem.cust.uniqID) == -1){
				$scope.setShowArray.push(elem.cust.uniqID);
				$scope.updateID.push(elem.cust.uniqID); 
				$scope.deleteID.push(elem.cust.uniqID); 
			}
			else{
				$scope.setShowArray.splice($scope.setShowArray.indexOf(elem.cust.uniqID),1);
				$scope.updateID.splice($scope.setShowArray.indexOf(elem.cust.uniqID),1);
				$scope.deleteID.splice($scope.setShowArray.indexOf(elem.cust.uniqID),1);
			}
			

			if($scope.setShowArray.length > 0){
				$scope.setShow = true;
			}
			else{
				$scope.setShow = false;
			}
		};
		$scope.del =function(elem){
			var req = {
				method: 'post',
				url: '/delete',
				data: {id : elem.cust.uniqID}
			}
			$http(req).then(function(){alert('here'); location.reload();});
		};
	});