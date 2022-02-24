import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import SnackOrBoozeApi from './Api';
import NavBar from './NavBar';
import { Route, Switch } from 'react-router-dom';
import Menu from './FoodMenu';
import Item from './FoodItem';
import NewItemForm from './NewItemForm';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [snacks, setSnacks] = useState([]);
	const [drinks, setDrinks] = useState([]);

	// get drinks and snacks on page load and set state accordingly.
	useEffect(() => {
		async function getItems() {
			let snackList = await SnackOrBoozeApi.getSnacks();
			let drinkList = await SnackOrBoozeApi.getDrinks();
			setSnacks(snackList);
			setDrinks(drinkList);
			setIsLoading(false);
		}
		getItems();
	}, []);


	//Yasin comment
	//Yasin 2nd comment
	//Yasin 3rd comment
	//Yasin 4th comment
	//Yasin 5th comment
	//Yasin 6th comment
	//Yasin 7th comment
	//Yasin 8th comment
	//Yasin 9th comment

	// function to add new item to state with proper formatting to match the db, and add to the db based on type
	const addNewItem = async (newItem) => {
		let itemFormatted = {
			...newItem,
			id: newItem.name.toLowerCase().replace(' ', '-'),
			userAdd: true
		};
		// logic to decide whether to add to snacks or drinks state/db
		if (newItem.type === 'snack') {
			await SnackOrBoozeApi.addSnack(itemFormatted);
			setSnacks((snacks) => [...snacks, itemFormatted]);
		} else if (newItem.type === 'drink') {
			await SnackOrBoozeApi.addDrink(itemFormatted);
			setDrinks((drinks) => [...drinks, itemFormatted]);
		}
	};

	// function to delete an item off the menu if it was user-added
	const deleteItem = async (item) => {
		if (item.type === 'snack') {
			setSnacks((snacks) => snacks.filter((snack) => snack.id !== item.id));
			await SnackOrBoozeApi.deleteSnack(item.id);
		} else if (item.type === 'drink') {
			setDrinks((drinks) => drinks.filter((drink) => drink.id !== item.id));
			await SnackOrBoozeApi.deleteDrink(item.id);
		}
	};

	if (isLoading) {
		return <p style={{ color: 'white' }}>Loading &hellip;</p>;
	}

	return (
		<div className="App">
			<NavBar />
			<main>
				<Switch>
					<Route exact path="/">
						<Home snacks={snacks} drinks={drinks} />
					</Route>
					<Route exact path="/snacks">
						<Menu items={snacks} title="Snacks" remove={deleteItem} />
					</Route>
					<Route path="/snacks/:id">
						<Item items={snacks} cantFind="/snacks" backTo="snacks" />
					</Route>
					<Route exact path="/drinks">
						<Menu items={drinks} title="Drinks" remove={deleteItem} />
					</Route>
					<Route exact path="/DRINKS/:id">
						<Item items={drinks} cantFind="/drinks" backTo="drinks" />
					</Route>
					<Route exact path="/new">
						<NewItemForm add={addNewItem} toggleLoad={setIsLoading} />
					</Route>
					<Route>
						<h2 className="App-notFound">Hmmm. I can't seem to find what you want.</h2>
					</Route>
				</Switch>
			</main>
		</div>
	);
}

export default App;
