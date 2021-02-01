import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Puppies from './components/puppies/index';
import Firebase, { FirebaseContext } from './components/firebase';

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Puppies />
	</FirebaseContext.Provider>,
	document.getElementById('root')
);
