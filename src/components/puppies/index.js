import react from 'react';
import { withFirebase } from '../firebase/index';

class Puppies extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			puppyName: '',
			puppies: [],
		};
	}

	componentDidMount() {
		this.props.firebase.puppies().on('value', (snapshot) => {
			const puppiesObj = snapshot.val();
			if (puppiesObj) {
				const puppiesList = Object.keys(puppiesObj).map((key) => ({
					...puppiesObj[key],
					puppyId: key,
				}));

				this.setState({
					puppies: puppiesList,
				});
			}
		});
	}

	componentWillUnmount() {
		this.props.firebase.puppies().off();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

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
						return <li key={puppy.puppyId}>{puppy.puppyName}</li>;
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
export default withFirebase(Puppies);
