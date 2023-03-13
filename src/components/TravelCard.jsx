import {Card, ListGroup} from 'react-bootstrap'
import {Col} from 'react-bootstrap'

const TravelCard = (props) => {
    return (
    <Col sm={6} md={4}>
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Body>Travel Card Body</Card.Body>
            <Card.Text>Travel Text</Card.Text>
            {/* <Button variant='danger'>DELETE</Button> */}
        </Card.Body>
    </Col>);
}
 
export default TravelCard;