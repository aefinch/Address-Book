app.controller("ContactEditCtrl", function($location, $routeParams, $scope, ContactFactory){
	ContactFactory.getSingleContact($routeParams.id).then((results) => {
		$scope.newContact = results.data;
	}).catch((error) => {
		console.log("getSingleContact error", error);
	});
	$scope.addNewContact = () => {
		ContactFactory.editContact($scope.newContact).then(() => {
			$location.url('/addresses/list');
		}).catch((error) => {
			console.log("editContact", error);
		});
	};
});