import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function TravelCards(props) {
	const [updated, setUpdated] = useState(false);

	// handel for delete button
	const handleDelete = (travelData) => {
		axios.delete(`https://weather-travel-guide-backend.onrender.com/days/${travelData}`).then(() => {
			axios.get('https://weather-travel-guide-backend.onrender.com/days').then((response) => {
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
						<Col key = {i}>
							<Card style={{ width: '18rem' }}>
								<Card.Body>
									<Card.Title className='card-title'>travel cards</Card.Title>
									<ListGroup variant='flush'>
										<ListGroup.Item className='card-list-text'>
											day: {travelDay.dayName}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
											city: {travelDay.city}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-number'>
											temp: {travelDay.temp}{travelDay.tempUnit}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
											wind speed {travelDay.windSpeed}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
											wind direction: {travelDay.windDirection}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
											precipitation:{' '}
											{travelDay.probabilityOfPrecipitation.value}%
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
											detailed forecast: {travelDay.detailedForecast}
										</ListGroup.Item>
										<ListGroup.Item className='card-list-text'>
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
													value={travelDay.planner}
												/>
												<input type='submit' value='update' />
											</Form>
										</ListGroup.Item>
										<Button
											onClick={(e) => {
												handleDelete(travelDay._id);
											}}>
											Delete
										</Button>
									</ListGroup>
								</Card.Body>
							</Card>
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default TravelCards;
