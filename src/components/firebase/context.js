import react from 'react';
const FirebaseContext = react.createContext(null);

export const withFirebase = (Component) => (props) => (
	<FirebaseContext.Consumer>
		{(firebase) => <Component {...props} firebase={firebase} />}
	</FirebaseContext.Consumer>
);

export default FirebaseContext;
