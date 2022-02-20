import React, { useState } from 'react';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Card,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
const NewItemForm = ({ add, toggleLoad }) => {
	const history = useHistory();

	// definte initial state: all are black and default to snack
	const INITIAL_STATE = {
		type        : '',
		name        : '',
		description : '',
		recipe      : '',
		serve       : ''
	};
	const [ formData, setFormData ] = useState(INITIAL_STATE);

	// helper function to handle controlled inputs
	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setFormData((formData) => ({
			...formData,
			[name] : value
		}));
	};

	// on submit, prevent default, get type, use the add functin to add to state and db, reinitialize form, and redirect depending on type
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const type = formData.type;
		add(formData);
		setFormData(INITIAL_STATE);
		history.push(type === 'snack' ? '/snacks' : '/drinks');
	};
	return (
		<Card>
			<CardBody>
				<CardTitle className="font-weight-bold text-center">Add New Item</CardTitle>
				<CardText style={{ textAlign: 'center', textDecoration: 'underline' }}>
					Add a new drink or snack!
				</CardText>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="type">Adding a snack or a drink?</Label>
						<Input
							type="select"
							name="type"
							id="type"
							value={formData.type}
							onChange={handleChange}
							required
						>
							<option value="" disabled>
								Snack or drink?
							</option>
							<option value="snack">Snack</option>
							<option value="drink">Drink</option>
						</Input>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="name">Name of Snack/Drink</Label>
						<Input
							type="text"
							name="name"
							id="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Name of your creation..."
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="description">Short Description</Label>
						<Input
							type="textarea"
							name="description"
							id="description"
							placeholder="Pure culinary bliss"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="recipe">Recipe</Label>
						<Input
							type="textarea"
							name="recipe"
							id="recipe"
							placeholder="Add a sprinkle of heaven to a platter of rainbows and unicorn magic"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<FormGroup>
						<Label htmlFor="serve">How is it served?</Label>
						<Input
							type="textarea"
							id="serve"
							name="serve"
							placeholder="serve it up on a silver platter with gem-encrusted chalice"
							onChange={handleChange}
							required
						/>
					</FormGroup>
					<Button>Submit</Button>
				</Form>
			</CardBody>
		</Card>
	);
};

export default NewItemForm;
