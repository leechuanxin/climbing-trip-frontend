/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import { Redirect } from 'react-router-dom';

export default function IndexPage({
  isLoggedIn,
}) {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="row w-100 pt-3">
        <div className="col-12 pt-1">
          Logged in!
        </div>
      </div>
    </div>
  );
}
