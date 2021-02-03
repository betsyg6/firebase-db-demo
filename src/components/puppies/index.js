import react from 'react';
import { withFirebase } from '../firebase/index';
import { Link } from 'react-router-dom';

class Puppies extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			//on state, we've initialized an empty string for a puppy name and an array for the puppies we will get from our firebase database
			puppyName: '',
			puppies: [],
		};
	}

	componentDidMount() {
		//when the component first mounts, we take a snapshot of the database
		this.props.firebase.puppies().on('value', (snapshot) => {
			//this is initially an object...we want it to be an array so we can use array methods in the render function
			const puppiesObj = snapshot.val();
			if (puppiesObj) {
				//if there is something inside the object, we use Object.keys and map to make it into an array of objects
				const puppiesList = Object.keys(puppiesObj).map((key) => ({
					...puppiesObj[key],
					puppyId: key,
				}));

				this.setState({
					//we set the state to equal this new array
					puppies: puppiesList,
				});
			}
		});
	}

	componentWillUnmount() {
		//we unmount/disconnect from Firebase to avoid any data leakage
		this.props.firebase.puppies().off();
	}

	handleChange = (event) => {
		this.setState({
			//this function is reusable anytime we are receiving input text from a user that we want to store on state
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		//when a user submits the form, we access the puppy api route, push the state's puppyName into the puppies part of the database, and then we reset the state.
		this.props.firebase
			.puppies()
			.push({ puppyName: this.state.puppyName })
			.catch((error) => console.log(error));

		this.setState({ puppyName: '' });
	};

	render() {
		return (
			<div>
				<h1>i love puppies</h1>
				{this.state.puppies.length ? (
					this.state.puppies.map((puppy) => {
						return (
							<li key={puppy.puppyId}>
								<Link to={`/${puppy.puppyId}/toys`}>{puppy.puppyName}</Link>
							</li>
						);
					})
				) : (
					<p>No Puppies yet!</p>
				)}
				<form onSubmit={this.handleSubmit}>
					<label>Puppy Name:</label>
					<input
						type='text'
						name='puppyName'
						value={this.state.puppyName}
						onChange={this.handleChange}
					/>
					<button type='submit'>Add Puppy</button>
				</form>
			</div>
		);
	}
}
//exporting withFirebase allows us to recieve Firebase props in this component
export default withFirebase(Puppies);
