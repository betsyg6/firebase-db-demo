import React from 'react';
import ReactDOM from 'react-dom';
import Puppies from './components/puppies/index';
import Firebase, { FirebaseContext } from './components/firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toys from './components/toys/index';

ReactDOM.render(
	//here we're providing the top-most layer of the app with the Firebase Context (similar to the way we provide a store for Redux). We instantiate the Firebase class that we created with the API routes and the connection to the database.
	<FirebaseContext.Provider value={new Firebase()}>
		<Router>
			<Route exact path='/' component={Puppies} />
			<Route path='/:puppyId/toys' component={Toys} />
		</Router>
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
