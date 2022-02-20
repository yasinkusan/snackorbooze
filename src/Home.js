import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

function Home({ snacks, drinks }) {
	return (
		<section className="Home">
			<Card>
				<CardBody className="text-center">
					<CardTitle>
						<h3 className="font-weight-bold">Welcome to Silicon Valley's premier dive cafe!</h3>
					</CardTitle>
					<CardText>
						{/* display # of snacks and drinks; will change as snacks/drinks are added/removed */}
						<h3>
							We have{' '}
							<Link className="Home-info" to="/snacks">
								{snacks.length} snacks
							</Link>{' '}
							and {' '}
							<Link className="Home-info" to="/drinks">
								{drinks.length} drinks
							</Link>{' '}
							to choose from!
						</h3>
					</CardText>
				</CardBody>
			</Card>
		</section>
	);
}

export default Home;
