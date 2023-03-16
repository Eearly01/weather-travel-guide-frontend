import React, { useState, useEffect } from 'react';

import {
	Card,
	ListGroup,
	Button,
	Col,
	Row,
	Form,
	Accordion,
} from 'react-bootstrap';
import axios from 'axios';

function TravelCards(props) {
	const [updated, setUpdated] = useState(false);

	// handel for delete button
	const handleDelete = (travelData) => {
		axios
			.delete(
				`https://weather-travel-guide-backend.onrender.com/days/${travelData}`
			)
			.then(() => {
				axios
					.get('https://weather-travel-guide-backend.onrender.com/days')
					.then((response) => {
						props.setTravelDays(response.data);
						setUpdated(!updated);
					});
			});
	};

	const handleSubmit = (e, id) => {
		e.preventDefault();
		axios
			.put(`https://weather-travel-guide-backend.onrender.com/days/${id}`, {
				planner: e.target.description.value,
			})
			.then((res) => {
				setUpdated(!updated);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		props.callApi();
	}, [updated]);

	return (
		<div className='weatherCards'>
			<Row xs={2} md={3}>
				{props.travelDays.map((travelDay, i) => {
					return (
						<Col key={i}>
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title className='card-title'>
										{travelDay.dayName}
									</Card.Title>
									<Card.Subtitle>{travelDay.city}</Card.Subtitle>
									<Accordion defaultActiveKey='0'>
										<Accordion.Item>
											<Accordion.Header>Show More</Accordion.Header>
											<Accordion.Body>
												<ListGroup variant='flush'>
													<ListGroup.Item className='card-list-number'>
														Temp: {travelDay.temp}
														{travelDay.tempUnit}
													</ListGroup.Item>
													<ListGroup.Item className='card-list-text'>
														Wind Speed {travelDay.windSpeed}
													</ListGroup.Item>
													<ListGroup.Item className='card-list-text'>
														Wind Direction: {travelDay.windDirection}
													</ListGroup.Item>
													<ListGroup.Item className='card-list-text'>
														Precipitation:{' '}
														{travelDay.probabilityOfPrecipitation.value}%
													</ListGroup.Item>
													<ListGroup.Item className='card-list-text'>
														Forecast: {travelDay.detailedForecast}
													</ListGroup.Item>
												</ListGroup>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
									<Form
										onSubmit={(e) => {
											handleSubmit(e, travelDay._id);
										}}>
										<label>Plan: {travelDay.planner}</label>
										<input
											className='form-control'
											type='text'
											name='description'
											placeholder={travelDay.planner}
										/>
										<input type='submit' value='Update' />
									</Form>
								</Card.Body>
								<Button
										onClick={(e) => {
											handleDelete(travelDay._id);
										}}>
										Delete
									</Button>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default TravelCards;
