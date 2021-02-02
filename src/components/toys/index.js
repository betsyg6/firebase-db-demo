import react from 'react';
import { withFirebase } from '../firebase/index';

class Toys extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			toyName: '',
			toys: [],
		};
	}

	componentDidMount() {
		let puppyId = this.props.match.params.puppyId;
		this.props.firebase.toys(puppyId).on('value', (snapshot) => {
			const toysObj = snapshot.val();
			console.log(toysObj);
			if (toysObj) {
				const toysList = Object.keys(toysObj).map((key) => ({
					...toysObj[key],
					toysId: key,
				}));

				this.setState({
					toys: toysList,
				});
			}
		});
	}

	componentWillUnmount() {
		this.props.firebase.toys().off();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();

		let puppyId = this.props.match.params.puppyId;
		this.props.firebase
			.toys(puppyId)
			.push({ toyName: this.state.toyName })
			.catch((error) => console.log(error));

		this.setState({ toyName: '' });
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<h1>I'm a puppy and these are my toys</h1>
				{this.state.toys.length ? (
					this.state.toys.map((toy) => {
						return <li key={toy.toysId}>{toy.toyName}</li>;
					})
				) : (
					<p>No Toys yet!</p>
				)}
				<form onSubmit={this.handleSubmit}>
					<label>My Toy:</label>
					<input
						type='text'
						name='toyName'
						value={this.state.toyName}
						onChange={this.handleChange}
					/>
					<button type='submit'>Add Toy</button>
				</form>
			</div>
		);
	}
}
export default withFirebase(Toys);
