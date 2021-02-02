import React from 'react';
import ReactDOM from 'react-dom';
import Puppies from './components/puppies/index';
import Firebase, { FirebaseContext } from './components/firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Toys from './components/toys/index';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Router>
			<Route exact path='/' component={Puppies} />
			<Route path='/:puppyId/toys' component={Toys} />
		</Router>
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
