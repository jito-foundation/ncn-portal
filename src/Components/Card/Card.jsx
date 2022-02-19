import "./card.css";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const WatchCard = ({data}) => {
  return (
    <Link to={`productDetail/${data?.id}`} className='watch_card_md mt-4' >
      <Card className='watch_card'  >
        <Card.Img
        height='200px'
        object-fit='contain'
          variant="top"
          src={data.url}
        />
        <Card.Body>
          <div className="cHead">

          <Card.Title>{data.inputValues.brand}</Card.Title>
          <Card.Text>Price: ${data.inputValues.price}</Card.Text>
          </div>
          <Card.Text>Model: {data.inputValues.model}</Card.Text>
          <Card.Text>Ref: {data.inputValues.reference}</Card.Text>
          {/* <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text> */}
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default WatchCard;
