import { Card, CardBody, CardTitle, CardSubtitle, CardText, Modal, ModalHeader, ModalBody, ListGroup, ListGroupItem, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './Modal.css'

const baseURL = "https://api.coingecko.com/api/v3";

const CoinCard = (props) => {
    const [coinDetails, setcoinDetails] = useState({})
    const [description, setDescription] = useState({})
    const [marketCap, setMarketCap] = useState({})
    const [homePage, setHomePage] = useState({})
    const [genesisDate, setGenesisDate] = useState({})
    const [showModal, setShowModal] = useState(false)
    const modalToggle = () => { setShowModal(!showModal) }

    const CoinDet = function () {
        const getCoinDet = async () => {
            fetch(baseURL + '/coins/' + props.coin.id)
                .then((response) =>
                    response.json()
                        .then((jsonData) => {
                            setcoinDetails(jsonData);
                            setDescription(jsonData.description.en)
                            setMarketCap(jsonData.market_data.market_cap.eur)
                            setHomePage(jsonData.links.homepage[0])
                            setGenesisDate(jsonData.genesis_date)
                            setShowModal(true)
                        })
                );
        };
        getCoinDet()

    }
    return (
        <Card className="CoinCard">
            <CardBody className="CardCss" onClick={CoinDet}>
                <Row>
                    <Col xs="4">
                        <CardTitle tag="h5">
                            <span className="CoinImageTag">
                                <img className="CoinImage" src={props.coin.image}></img>
                            </span>
                            {props.coin.name} - (<span className="symbolSpan">{props.coin.symbol}</span>)
                        </CardTitle>
                    </Col>
                    <Col xs="4">
                        <span className="priceSpan">
                            <span>&#8364;</span>{props.coin.current_price}
                        </span>
                    </Col>
                    <Col xs="4">
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            24 hour History
                        </CardSubtitle>
                        <CardText>
                            <span>Max Price: <span>&#8364;</span>{props.coin.high_24h}</span>
                        </CardText>
                        <CardText>
                            <span>Low Price: <span>&#8364;</span>{props.coin.low_24h}</span>
                        </CardText>
                    </Col>
                </Row>

            </CardBody>
            <Modal
                isOpen={showModal}
                toggle={modalToggle}
                returnFocusAfterClose={true}
                size="lg"
                style={{ maxWidth: '1000px', width: '80%' }}
                className="CoinModal"
            >
                <ModalHeader toggle={modalToggle}>
                    <strong>{coinDetails.name} </strong>- ( {coinDetails.symbol})
                </ModalHeader>
                <ModalBody>
                    <ListGroup>
                        <ListGroupItem>
                            <strong>Hashing Algorithm :</strong>
                            {coinDetails.hashing_algorithm ? coinDetails.hashing_algorithm : "NA"}
                        </ListGroupItem>
                        <ListGroupItem> 
                            <strong>Description:</strong>
                            {description ? <p dangerouslySetInnerHTML={{ __html: description }}></p> : 'NA'}
                        </ListGroupItem>
                        <ListGroupItem>
                            <strong>Market Cap in EUR :</strong> {marketCap ? marketCap : 'NA'}
                        </ListGroupItem>
                        <ListGroupItem>
                            <strong>Home page :</strong> {homePage ? homePage : 'NA'}
                        </ListGroupItem>
                        <ListGroupItem>
                            <strong>Genesis Date:</strong> {genesisDate ? genesisDate : 'NA'}
                        </ListGroupItem>
                    </ListGroup>
                </ModalBody>
            </Modal>
        </Card>
    )
}

export default CoinCard