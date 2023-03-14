import React from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function WeatherCards(props) {



	// handel for delete button
	const handleDelete = (animalData) => {
		axios.delete(`http://localhost:3000/animals/${animalData._id}`).then(() => {
			axios.get('http://localhost:3000/animals').then((response) => {
				setAnimals(response.data)
			})
		})
	}


	return (
		<div className='weatherCards'>
			<Col>
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title className='card-title'>travel cards</Card.Title>
						<ListGroup variant='flush'>
							<ListGroup.Item className='card-list-text'>
								temp: {props.wetherDays.temp}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								wind speed {props.wetherDays.windSpeed}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								wind direction: {props.wetherDays.windDirection}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								persipitation: {props.wetherDays.probabilityOfPrecipitation}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								detailed forcast: {props.wetherDays.detaledForcast}
							</ListGroup.Item>
							<Button
								onClick={(e) => {
									handleDelete(props. wetherDays)
								}}
							>
								Delete
							</Button>
						</ListGroup>
					</Card.Body>
				</Card>
			</Col>
		</div>
	)
}

export default WeatherCards;
