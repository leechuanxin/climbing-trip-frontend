/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

// CUSTOM IMPORTS
import REACT_APP_BACKEND_URL from '../../modules/urls.mjs';

function Trips({ trips }) {
  if (trips.length > 0) {
    return (
      <ul>
        {trips.map((trip) => (<li>{trip.name}</li>))}
      </ul>
    );
  }
  return null;
}

export default function IndexPage({
  isLoggedIn,
}) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_BACKEND_URL}/trips`)
      .then((response) => {
        setTrips(response.data.trips);
      })
      .catch(() => {
        // handle error
        window.scrollTo(0, 0);
      });
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row w-100 pt-3">
        <div className="col-8 pt-1 ms-auto me-auto">
          <Link class="btn btn-primary btn-lg w-100" to="/createtrip" role="button">+ Create a Trip</Link>
        </div>
        <div className="col-12 pt-3">
          <Trips trips={trips} />
        </div>
      </div>
    </div>
  );
}
