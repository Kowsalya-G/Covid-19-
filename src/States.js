import React, { useEffect, useState } from "react";
import "./App.css";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Columns from "react-columns";
import { useHistory } from "react-router-dom";
function States({ match }) {
  useEffect(() => {
    fetchDistrictData();
  }, []);
  const [searchDistrict, setSearchDistrict] = useState("");
  const [districts, setDistricts] = useState({});
  const fetchDistrictData = async () => {
    const fetD = await fetch(
      `https://api.covid19india.org/state_district_wise.json`
    );
    const distData = await fetD.json();
    setDistricts(distData[match.params.statee].districtData);
  };
  const entries = Object.entries(districts);
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
  const filterDistrict = entries.filter((item) => {
    return searchDistrict !== ""
      ? item[0].toLowerCase().includes(searchDistrict.toLowerCase())
      : item;
  });
  const statesDistrict = filterDistrict.map((d, i) => {
    const data = d[1];
    return (
      <Card key={i} bg="light" text="dark" className="text-center card">
        <Card.Body>
          <Card.Title>{d[0]}</Card.Title>
          <Card.Text>Active Cases - {data.active}</Card.Text>
          <Card.Text>Confirmed Cases - {data.confirmed}</Card.Text>
          <Card.Text>Delta confirmed - {data.delta.confirmed}</Card.Text>
          <Card.Text>Deaths - {data.deceased}</Card.Text>
          <Card.Text>Recovered - {data.recovered}</Card.Text>
          <Card.Text>Delta recovered - {data.delta.recovered}</Card.Text>
        </Card.Body>
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
          onClick={() => history.push("/india")}
        />
        Districts of {match.params.statee}
        <i
          className="fa fa-remove"
          style={{ float: "right", paddingRight: "30px" }}
          aria-hidden="true"
          onClick={() => history.push("/india")}
        />
      </h3>
      <br />
      <Form style={{ margin: "10px" }}>
        <Form.Group controlId="formGroupDistict">
          <Form.Control
            type="text"
            placeholder="Search district"
            onChange={(e) => setSearchDistrict(e.target.value)}
          />
        </Form.Group>
      </Form>
      <br />
      <Columns queries={queries}>{statesDistrict}</Columns>
      <br />
    </div>
  );
}

export default States;
