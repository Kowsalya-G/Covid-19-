import React, { useEffect, useState } from "react";
import "./App.css";
import { CardDeck, Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import ReactHtmlParser from "react-html-parser";
import { Link, useHistory } from "react-router-dom";

function India() {
  const [total, setTotal] = useState({});
  const [results, setResults] = useState([]);
  const [searchState, setSearchState] = useState("");
  useEffect(() => {
    axios
      .get("https://api.covid19india.org/data.json")
      .then((res) => {
        setTotal(res.data.statewise[0]);
        res.data.statewise.shift();
        setResults(res.data.statewise);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
  const history = useHistory();
  const filterState = results.filter((item) => {
    return searchState !== ""
      ? item.state.toLowerCase().includes(searchState.toLowerCase())
      : item;
  });
  const statesOfIndia = filterState.map((data, i) => {
    return (
      <Card key={i} bg="light" text="dark" className="text-center card">
        <Card.Header style={{ fontWeight: "bold", fontSize: "larger" }}>
          {data.state}
        </Card.Header>
        <Card.Body>
          <Card.Text>Active Cases - {data.active}</Card.Text>
          <Card.Text>Confirmed Cases - {data.confirmed}</Card.Text>
          <Card.Text>Delta confirmed - {data.deltaconfirmed}</Card.Text>
          <Card.Text>Deaths - {data.deaths}</Card.Text>
          <Card.Text>Delta deaths - {data.deltadeaths}</Card.Text>
          <Card.Text>Recovered - {data.recovered}</Card.Text>
          <Card.Text>Delta recovered - {data.deltarecovered}</Card.Text>
          {/* {data.statenotes !== "" ? <Card.Title>State Notes</Card.Title> : null}
          {data.statenotes !== "" ? (
            <Card.Text>{ReactHtmlParser(data.statenotes)}</Card.Text>
          ) : null} */}
          <Button variant="primary" className="buttons">
            <Link to={`/india/${data.state}`}>View districts status</Link>
          </Button>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {data.lastupdatedtime}</small>
        </Card.Footer>
      </Card>
    );
  });
  return (
    <div>
      <hr />
      <h3 style={{ paddingLeft: "30px" }}>
        <i
          className="fa fa-chevron-circle-left"
          style={{ paddingRight: "10px" }}
          onClick={() => history.push("/")}
        />
        States of India
        <i
          className="fa fa-remove"
          style={{ float: "right", paddingRight: "30px" }}
          aria-hidden="true"
          onClick={() => history.push("/")}
        />
      </h3>
      <br />
      <CardDeck className="CardDeck">
        <Card bg="secondary" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Confirmed cases</Card.Title>
            <Card.Text>{total.confirmed}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {total.lastupdatedtime}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{total.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {total.lastupdatedtime}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text="white" className="text-center card">
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{total.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {total.lastupdatedtime}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form style={{ margin: "10px" }}>
        <Form.Group controlId="formGroupState">
          <Form.Control
            type="text"
            placeholder="Search state"
            onChange={(e) => setSearchState(e.target.value)}
          />
        </Form.Group>
      </Form>
      <br />
      <Columns queries={queries}>{statesOfIndia}</Columns>
    </div>
  );
}

export default India;
