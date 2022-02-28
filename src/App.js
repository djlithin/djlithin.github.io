import React, { useEffect, useState } from 'react';
import './App.css';
import CoinCard from './components/CoinCard';
import { Button, Container, Row, Col, Navbar, NavbarBrand } from 'reactstrap';

const baseURL = "https://api.coingecko.com/api/v3";

function App() {

  const [coins, setCoins] = useState(null);
  const [vs_currency, setVscurrency] = useState('eur')
  const [order, setOrder] = useState('market_cap_desc')
  const [per_page, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const coingeckoFetch = async () => {
      fetch(baseURL + '/coins/markets' + '?' + (new URLSearchParams({
        vs_currency: vs_currency,
        order: order,
        per_page: per_page,
        page: page
      })).toString())
        .then((response) =>
          response.json()
            .then((jsonData) => {
              setCoins(jsonData);
            })
        );
    };
    coingeckoFetch()
  }, [page])

  return (
    <div className="App">
      <Container>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <Row>
              <Col className="firstColumn"><span className="HeadingClass">Crypto Coins</span></Col>
            </Row>
          </NavbarBrand>
        </Navbar>
        {coins && coins.map((coin, idx) => (<CoinCard key={idx} coin={coin} />))}
        <Row className="listButton">
          <Col xs="6"><Button color="primary" size="lg" onClick={() => setPage(page - 1)}>Prev Page</Button></Col>
          <Col xs="6"><Button color="primary" size="lg" className="nextButton" onClick={() => setPage(page + 1)}>Next Page</Button></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
