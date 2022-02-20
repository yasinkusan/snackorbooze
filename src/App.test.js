import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

function sleep(time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}

it('renders without crashing', () => {
	render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);
});

it('matches loading snapshot', () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);
	expect(asFragment()).toMatchSnapshot();
});
it('matches rendered snapshot', async () => {
	const { asFragment } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);
	await act(() => sleep(1100));
	expect(asFragment()).toMatchSnapshot();
});

it('can render the /home route', async () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);

	await act(() => sleep(1100));
	const text = getByText("Welcome to Silicon Valley's premier dive cafe!");
	expect(text).toBeInTheDocument();
});

it('can use navbar links', async () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);

	await act(() => sleep(1100));
	const navLink = getByText('Snacks');
	expect(navLink).toBeInTheDocument();
	fireEvent.click(navLink);
	expect(navLink).toBeInTheDocument();
	expect(getByText('Explore all of our delish snacks below!')).toBeInTheDocument();
});

it('can use in-line links', async () => {
	const { getByText } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);

	await act(() => sleep(1100));
	const link = getByText('3 snacks');
	expect(link).toBeInTheDocument();
	fireEvent.click(link);
	expect(getByText('Explore all of our delish snacks below!')).toBeInTheDocument();
	expect(link).not.toBeInTheDocument();
});
it('can render a snack element', async () => {
	const { getByText, getByTestId } = render(
		<MemoryRouter initialEntries={[ '/' ]}>
			<App />
		</MemoryRouter>
	);

	await act(() => sleep(1100));
	const link = getByText('3 snacks');
	console.log(link);
	expect(link).toBeInTheDocument();
	fireEvent.click(link);
	expect(getByText('Explore all of our delish snacks below!')).toBeInTheDocument();
	expect(link).not.toBeInTheDocument();
	const newLink = getByTestId('link-hummus');
	expect(newLink).toBeInTheDocument();
	fireEvent.click(newLink);
	expect(newLink).not.toBeInTheDocument();
	expect(getByText('Sure to impress your vegan friends!')).toBeInTheDocument();
});
