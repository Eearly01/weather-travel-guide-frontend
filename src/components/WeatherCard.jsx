import React from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function WeatherCards(props) {



	// handel for delete button
	const handleDelete = (weatherData) => {
		axios.delete(`http://localhost:3000/days/${weatherData._id}`).then(() => {
			axios.get('http://localhost:3000/days').then((response) => {
				props.setWeatherDays(response.data)
			})
		})
	}


	return (
	<div className='weatherCards'>
		{props.weatherDays.map((weatherdays) => {
							return (
			
				<Col>
					<Card style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title className='card-title'>travel cards</Card.Title>
							<ListGroup variant='flush'>
								<ListGroup.Item className='card-list-text'>
									temp: {props.weatherDays.temp}
								</ListGroup.Item>
								<ListGroup.Item className='card-list-text'>
									wind speed {props.weatherDays.windSpeed}
								</ListGroup.Item>
								<ListGroup.Item className='card-list-text'>
									wind direction: {props.weatherDays.windDirection}
								</ListGroup.Item>
								<ListGroup.Item className='card-list-text'>
									persipitation: {props.weatherDays.probabilityOfPrecipitation}
								</ListGroup.Item>
								<ListGroup.Item className='card-list-text'>
									detailed forcast: {props.weatherDays.detaledForcast}
								</ListGroup.Item>
								<Button
									onClick={(e) => {
										handleDelete(props.weatherDays)
									}}
								>
									Delete
								</Button>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			
		)
	})}
	</div>
	)
}

export default WeatherCards;
