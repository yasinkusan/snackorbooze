import React from 'react';
import Menu from './FoodMenu';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
const snacks = [
	{
		id          : 'nachos',
		name        : 'Nachos',
		description : 'An American classic!',
		recipe      : 'Cover expensive, organic tortilla chips with Cheez Whiz.',
		serve       : 'Serve in a hand-thrown ceramic bowl, garnished with canned black olives'
	},
	{
		id          : 'hummus',
		name        : 'Hummus',
		description : 'Sure to impress your vegan friends!',
		recipe      : 'Purchase one container of hummus.',
		serve       : 'Place unceremoniously on the table, along with pita bread.'
	},
	{
		id          : 'arugula-and-walnut-salad',
		name        : 'Arugula and Walnut Salad',
		description : 'Tart and delicious.',
		recipe      :
			'Mix arugula, toasted walnuts, and thinly-sliced Parmesan cheese. Dress with lemon and olive oil.',
		serve       : 'Place on tiny, precious little plates.'
	}
];

it('renders without crashing', () => {
	render(
		<MemoryRouter initialEntries={[ '/snacks' ]}>
			<Menu items={snacks} title="Snacks" remove={jest.fn()} />
		</MemoryRouter>
	);
});

it('matches loading snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Menu items={snacks} title="Snacks" remove={jest.fn()} />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
it('matches rendered snapshot', async () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Menu items={snacks} title="Snacks" remove={jest.fn()} />
		</MemoryRouter>
	);
	await act(() => sleep(1100));
	expect(asFragment()).toMatchSnapshot();
});
