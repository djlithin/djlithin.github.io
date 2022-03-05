import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';


const baseURL = "https://api.coingecko.com/api/v3";

export default function CoinDetails() {

    const { id } = useParams()

    const [coinDetails, setcoinDetails] = useState(null)

    const getCoinDet = async () => {
        fetch(baseURL + '/coins/' + id)
            .then((response) =>
                response.json()
                    .then((jsonData) => {

                        setcoinDetails(jsonData);

                    })
            );
    };

    useEffect(() => {
        getCoinDet()
    }, [])

    return (
        <>
            {coinDetails ?
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "auto", flexDirection: "column" }} >
                    <img
                        style={{
                            display: "block",
                            margin: "auto",
                            width: "8rem",
                            height: "8rem",
                            borderRadius: "100%",
                            border: "3px solid #858b94",
                            marginBottom: "25px",
                            marginTop: "50px"
                        }}
                        alt=""
                        src={coinDetails?.image?.large}
                    />
                    <div style={{ display: "flex", alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                        <h1>
                            {coinDetails.name ? coinDetails.name : "NA"}
                        </h1>

                        <h3 style={{ marginLeft: "15px" }}> - {coinDetails.symbol ? coinDetails.symbol : "NA"}
                        </h3>
                    </div>
                    <p style={{ width: "50%", marginTop: "50px", textAlign: "justify" }}>
                        {coinDetails ? <p dangerouslySetInnerHTML={{ __html: coinDetails?.description?.en }}></p> : 'NA'}
                    </p>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {coinDetails.hashing_algorithm ? <> <strong>Hashing Algorithm : {coinDetails.hashing_algorithm}  </strong></> : null}
                        {coinDetails?.market_data?.market_cap?.eur ? <><strong>Market Cap in EUR : {coinDetails?.market_data?.market_cap?.eur} </strong> </> : null}
                        {coinDetails?.links?.homepage[0] ? <> <a href={coinDetails?.links?.homepage[0]}> <strong>Click Here to View the {coinDetails.name ? coinDetails.name : "Coin's"} </strong> </a> </> : null}
                        {coinDetails.genesis_date ? <> <strong>Genesis Date:{coinDetails?.genesis_date} </strong>  </> : null}
                    </div>
                </div>
                : <div>
                    <Spinner style={{ marginLeft: "50%", marginTop: "20%" }} animation="grow" size="lg" />
                </div>}
        </>
    )
}
