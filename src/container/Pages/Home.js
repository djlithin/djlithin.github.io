import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Navbar, NavbarBrand, Spinner } from 'reactstrap';

import '../../App.css';

import "bootstrap/dist/css/bootstrap.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { useNavigate } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
const baseURL = "https://api.coingecko.com/api/v3";

function imageFormatter(cell){
  return(
    <img style={{width:50}} src={cell}/>
  )
}

const columns = [
  {
    dataField: "image",
    text: "Image", 
    formatter: imageFormatter,
    headerStyle: (colum, colIndex) => {
      return { width: '80px', textAlign: 'center' };
    }
  },
  {
    dataField: "name",
    text: "Coin Name",
    sort: true
  },
  {
    dataField: "current_price",
    text: "Current Price",
    sort: true
  },
  {
    dataField: "high_24h",
    text: "High Price",
    sort: true
  },
  {
    dataField: "low_24h",
    text: "Low Price",
    sort: true
  }
];
export default function Home() {
    const navigate=useNavigate();
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
        // per_page: per_page,
        page: page
      })).toString())
        .then((response) =>
          response.json()
            .then((jsonData) => {
              setCoins(jsonData);
              console.log(jsonData)
            })
        );
    };
    coingeckoFetch()
  }, [])


  const tableRowEvents = {
    onClick: (e, row, rowIndex) => {
        navigate(`coindetails/${row.id}`);
    }
 }
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

      { coins &&
        <BootstrapTable
        bootstrap4
        keyField="id"
        data={coins}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 10 })}
        rowEvents ={tableRowEvents}
      />
      }
      
    </Container>
  </div>
  )
}
