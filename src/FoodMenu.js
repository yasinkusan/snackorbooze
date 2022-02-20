import React from 'react';
import { Link } from 'react-router-dom';
import './FoodMenu.css';
import { Card, CardBody, CardTitle, CardText, ListGroup, ListGroupItem } from 'reactstrap';

function Menu({ items, title, remove }) {
	// taking in title as "snacks" or "drinks" depending on which route
	return (
		<section className="col-md-4">
			<Card>
				<CardBody>
					<CardTitle className="font-weight-bold text-center">{title} Menu</CardTitle>
					<CardText style={{ textAlign: 'center' }}>
						Explore all of our delish {title.toLowerCase()} below!
					</CardText>
					<ListGroup>
						{items.map((item) => {
							return (
								<div className="Item" key={item.id}>
									<Link data-testId={`link-${item.id}`} to={`/${title.toLowerCase()}/${item.id}`}>
										<ListGroupItem>{item.name}</ListGroupItem>
									</Link>
									{/* if an item was added, present a button that can delete that item */}
									{item.userAdd && <button onClick={() => remove(item)}>Delete</button>}
								</div>
							);
						})}
					</ListGroup>
				</CardBody>
			</Card>
		</section>
	);
}

export default Menu;
