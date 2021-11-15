/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function IndexPage({
  isLoggedIn,
}) {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row w-100 pt-3">
        <div className="col-8 pt-1 ms-auto me-auto">
          <Link class="btn btn-primary btn-lg w-100" to="/createtrip" role="button">+ Create a Trip</Link>
        </div>
      </div>
    </div>
  );
}
