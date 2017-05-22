app.controller("ContactViewCtrl", function($routeParams, $scope, ContactFactory){
	$scope.selectedContact = {};

	ContactFactory.getSingleContact($routeParams.id)
	.then((results) => {
		$scope.selectedContact = results.data;
	}).catch((error) => {
		console.log("error in getSingleContact", error);
	});
});