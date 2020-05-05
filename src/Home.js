import React, { useEffect, useState } from "react";
import "./App.css";
import { CardDeck, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";

function Home() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((res) => {
        setLatest(res[0].data);
        setResults(res[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();
  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];
  const filterCountry = results.filter((item) => {
    return searchCountry !== ""
      ? item.country.toLowerCase().includes(searchCountry.toLowerCase())
      : item;
  });
  const countries = filterCountry.map((data, i) => {
    return (
      <Card key={i} bg="light" text="dark" className="text-center card">
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases - {data.cases}</Card.Text>
          <Card.Text>Recovered - {data.recovered}</Card.Text>
          <Card.Text>Deaths - {data.deaths}</Card.Text>
          <Card.Text>Today's cases - {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths - {data.todayDeaths}</Card.Text>
          <Card.Text>Active - {data.active}</Card.Text>
          <Card.Text>Critical - {data.critical}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated</small>
          <br />
          <small>{lastUpdated}</small>
        </Card.Footer>
      </Card>
    );
  });
  return (
    <div>
      <hr />
      <CardDeck className="CardDeck">
        <Card bg="secondary" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{latest.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{latest.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{latest.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form style={{ margin: "10px" }}>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
      </Form>
      <br />
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default Home;
