import app from 'firebase/app';
import 'firebase/database';

//this component configures Firebase for us
//we attach our secrets
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
	constructor() {
		//initialize an app using the secrets
		app.initializeApp(config);
		//connect the database using the secrets
		this.db = app.database();
	}
	//API routes
	//this route is used for adding and viewing puppies
	puppies = () => this.db.ref('puppies');
	//this route takes one puppyId and "associates" it with a bunch of toys. We use this route for adding and viewing the toys
	toys = (puppyId) => this.db.ref(`toys/${puppyId}`);
	//this route takes one puppyId and one toyId, so we're accessing one specific item in the database. We use this route for deleting or updating that item in the database.
	modifyToy = (puppyId, toyId) => this.db.ref(`toys/${puppyId}/${toyId}`);
}

export default Firebase;
