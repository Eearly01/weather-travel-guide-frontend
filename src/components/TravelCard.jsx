import React, { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function TravelCards() {
    const [travelDays, setTravelDays] = useState([]);
    const [updated, setUpdated] = useState();

    const callApi = () => {
        axios.get('http://localhost:3000/days').then((res) => {
            setTravelDays(res.data);
			
        })
    }
	// handel for delete button
	const handleDelete = (travelData) => {
		axios.delete(`http://localhost:3000/days/${travelData._id}`).then(() => {
			axios.get('http://localhost:3000/days').then((response) => {
				setTravelDays(response.data);
				setUpdated(!updated);
			});
		});
	};

    useEffect(() => {
        callApi();
    }, [])

	return (
	<div className='weatherCards'>
		{travelDays.map((travelDays) => {
			return (
			<Col>
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title className='card-title'>travel cards</Card.Title>
						<ListGroup variant='flush'>
							<ListGroup.Item className='card-list-text'>
								city: {travelDays.city}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-number'>
								temp: {travelDays.temp}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								wind speed {travelDays.windSpeed}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								wind direction: {travelDays.windDirection}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								precipitation: {travelDays.probabilityOfPrecipitation.value}
							</ListGroup.Item>
							<ListGroup.Item className='card-list-text'>
								detailed forecast: {travelDays.detailedForecast}
							</ListGroup.Item>
							<Button
								onClick={(e) => {
									handleDelete(travelDays);
								}}>
								Delete
							</Button>
						</ListGroup>
					</Card.Body>
				</Card>
			</Col>
		
		)
		})}
		</div>
	);
}

export default TravelCards;
