app.factory("ContactFactory", function($q, $http, FIREBASE_CONFIG){

let getContactList = () => {
		let contacts = [];
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/addresses.json`)
			.then((results) => {
				let contactList = results.data;
				// if(contactList !== null){
					Object.keys(contactList).forEach((key) => {
						contactList[key].id = key;
						contacts.push(contactList[key]);
					});
				// }
				resolve(contacts);
			}).catch((error) => {
				reject(error);
			});
		});
	};

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

	let deletes = (contactId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/addresses/${contactId}.json`);
		}).then((results) => {
			resolve(results);
		}).catch((error) => {
			reject(error);
		});
	};

	let getSingleContact = (id) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/addresses/${id}.json`)
			.then((results) => {
				results.data.id = id;
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {getContactList:getContactList, postNewContact:postNewContact, deletes:deletes, getSingleContact:getSingleContact};
});