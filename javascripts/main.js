app.run((FIREBASE_CONFIG) => {
	firebase.initializeApp(FIREBASE_CONFIG);
});

app.controller("ContactCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {
	$scope.showContactView = true;

	$scope.newContactView = () => {
		$scope.showContactView = false;
	};
	$scope.allContacts = () => {
		$scope.showContactView = true;
	};

	let getContactList = () => {
		let contacts = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/addresses.json`)
			.then((results) => {
				var contactList = results.data;
				Object.keys(contactList).forEach((key) => {
					contactList[key].id = key;
					contacts.push(contactList[key]);
				});
				resolve(contacts);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let getContacts = () => {
		getContactList().then((contacts) => {
			$scope.contacts = contacts;
		}).catch((error) => {
			console.log("get Error", error);
		});
	};
	getContacts();

	let postNewContact = (newContact) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/addresses.json`, JSON.stringify(newContact))
			.then((resultz) => {
				resolve(resultz);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	$scope.addNewContact = () => {
		postNewContact($scope.newContact).then(() => {
			$scope.newContact = {};
			$scope.showContactView = true;
			getContacts();
		}).catch((error) => {
			console.log("Add error", error);
		});
	};
});