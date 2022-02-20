import React from 'react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}
const snacks = [ "i'm a snack" ];
const drinks = [ "i'm a drink" ];

it('renders without crashing', () => {
	render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Home snacks={snacks} drinks={drinks} />
		</MemoryRouter>
	);
});

it('matches loading snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Home snacks={snacks} drinks={drinks} />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
it('matches rendered snapshot', async () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<Home snacks={snacks} drinks={drinks} />
		</MemoryRouter>
	);
	await act(() => sleep(1100));
	expect(asFragment()).toMatchSnapshot();
});
