app.controller("NewContactCtrl", function($location, $scope, ContactFactory){
	$scope.addNewContact = () => {
		ContactFactory.postNewContact($scope.newContact).then(() => {
			$scope.newContact = {};
			$location.url("/contacts/list");
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});