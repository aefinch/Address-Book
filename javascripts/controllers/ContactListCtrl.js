app.controller("ContactListCtrl", function($routeParams, $scope, ContactFactory){
	$scope.contacts = [];

	let getContacts = () => {
		ContactFactory.getContactList().then((contacts) => {
			$scope.contacts = contacts;
			console.log(contacts);
		}).catch((error) => {
			console.log("get Error", error);
		});
	};
	getContacts();

	$scope.deleteContact = (id) => {
		ContactFactory.deletes(id).then(() => {
			getContacts();
		}).catch((error) => {
			console.log("delete Contact error", error);
		});
	};
});