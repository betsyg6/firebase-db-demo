import react from 'react';
import { withFirebase } from '../firebase/index';

class Toys extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			toyName: '',
		};
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
		return (
			<div>
				<h1>I'm a puppy and these are my toys</h1>
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
