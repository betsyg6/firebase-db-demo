import react from 'react';
const FirebaseContext = react.createContext(null);

//this function gives a component the props from firebase. It's related to the code in src/index.js, but here it's the consumer.
export const withFirebase = (Component) => (props) => (
	<FirebaseContext.Consumer>
		{(firebase) => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;
