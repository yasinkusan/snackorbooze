import React from 'react';
import NavBar from './NavBar';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

it('renders without crashing', () => {
	render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<NavBar />
		</MemoryRouter>
	);
});

it('matches loading snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<NavBar />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
it('matches rendered snapshot', async () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<NavBar />
		</MemoryRouter>
	);
	await act(() => sleep(1100));
	expect(asFragment()).toMatchSnapshot();
});
