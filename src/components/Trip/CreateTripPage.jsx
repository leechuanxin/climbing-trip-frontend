/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// Custom imports
import REACT_APP_BACKEND_URL from '../../modules/urls.mjs';

export default function RegisterPage({ isLoggedIn }) {
  const [tripnameInvalidMessage, setTripnameInvalidMessage] = useState('');
  const [tripname, setTripname] = useState('');
  const [isTripCreatedSuccess, setIsTripCreatedSuccess] = useState(false);

  const handleTripnameChange = (event) => {
    // Retrieve input field value from JS event object.
    const inputName = event.target.value;
    // Log input field value to verify what we typed.
    setTripname(inputName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let tripnameInvalid = '';

    const data = {
      name: tripname,
    };

    axios
      .post(`${REACT_APP_BACKEND_URL}/createtrip`, data)
      .then((response) => {
        if (response.data.error) {
          window.scrollTo(0, 0);

          tripnameInvalid = response.data.error;

          setTripnameInvalidMessage(tripnameInvalid);
        } else {
          setIsTripCreatedSuccess(true);
        }
      })
      .catch(() => {
        // handle error
        window.scrollTo(0, 0);
      });
  };

  if (!isLoggedIn) {
    return (
      <Redirect to="/login" />
    );
  }

  if (isTripCreatedSuccess) {
    return (
      <Redirect to="/" />
    );
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row w-100 pt-3">
        <div className="col-12 py-3">
          <form>
            <div className="row">
              <div className="col-12">
                <h3 className="mb-3 index-header font-bold text-lg">Create a Trip!</h3>
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="name">
                  <strong>Trip Name</strong>
                </label>
                <input
                  type="text"
                  className={
                    `form-control${
                      tripnameInvalidMessage.trim() !== '' ? ' is-invalid' : ''
                    }`
                  }
                  id="name"
                  name="name"
                  placeholder="e.g. Sri Lanka"
                  value={tripname}
                  onChange={handleTripnameChange}
                />
                <div className="invalid-feedback">{tripnameInvalidMessage}</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button
              className="btn btn-primary btn-lg btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Create Trip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
