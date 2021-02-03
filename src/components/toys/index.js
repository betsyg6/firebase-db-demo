import react from 'react';
import { withFirebase } from '../firebase/index';
import { Link } from 'react-router-dom';

//a lot of the code in this component is similar to the puppies component (adding and viewing), so I didn't make as many comments for you here :)

class Toys extends react.Component {
	constructor(props) {
		super(props);
		this.state = {
			//on state, we initialize an empty string for the toy name, an empty array for the toys we will receive from our database, an updated toy name for our update input text, and an empty string for the puppyId so we can keep our code DRY
			toyName: '',
			toys: [],
			updatedToyName: '',
			puppyId: '',
		};
	}

	componentDidMount() {
		//we access the puppyId from react-router-dom props, which we need for the API call (otherwise, how would we know which puppy's toys to get?!)
		let puppyId = this.props.match.params.puppyId;
		//again, we take a snapshot, tranform it into an array of objects, and store it (along with the puppy id) on state
		this.props.firebase.toys(puppyId).on('value', (snapshot) => {
			const toysObj = snapshot.val();
			if (toysObj) {
				const toysList = Object.keys(toysObj).map((key) => ({
					...toysObj[key],
					toysId: key,
				}));

				this.setState({
					toys: toysList,
					puppyId,
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

		this.props.firebase
			.toys(this.state.puppyId)
			.push({ toyName: this.state.toyName })
			.catch((error) => console.log(error));

		this.setState({ toyName: '' });
	};

	handleDelete = (toyId) => {
		//we use the modifyToy API route in order to access one element in the database and ultimately remove it
		this.props.firebase.modifyToy(this.state.puppyId, toyId).remove();
	};

	handleUpdate = (toyId) => {
		//we use the modifyToy API route in order to access one element and update it
		this.props.firebase
			.modifyToy(this.state.puppyId, toyId)
			.update({ toyName: this.state.updatedToyName });
	};

	render() {
		return (
			<div>
				<Link to='/'>Back</Link>
				<h1>I'm a puppy and these are my toys</h1>
				{this.state.toys.length ? (
					this.state.toys.map((toy) => {
						return (
							<div key={toy.toysId}>
								<li>{toy.toyName}</li>
								<button
									type='button'
									onClick={() => this.handleDelete(toy.toysId)}
								>
									x
								</button>
								<form onSubmit={() => this.handleUpdate(toy.toysId)}>
									<label>Update Name:</label>
									<input
										type='text'
										name='updatedToyName'
										value={this.state.updatedToyName}
										onChange={this.handleChange}
									/>
									<button type='submit'>Update!</button>
								</form>
							</div>
						);
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
