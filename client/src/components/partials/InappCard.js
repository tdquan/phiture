import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const InappCard = ({ inapp }) => {
  const { id, name, title, content, image } = inapp;

  return (
    <Fragment>
      <Link to={`/inapps/${id}`}>
        <h4 className="text-center">{name}</h4>
        <div className="col p-3 d-flex justify-content-center align-items-center">
          <div className="card h-100 mb-3" style={{width: "320px"}}>
            <img src={image} className="card-img-top" alt="" style={{maxHeight: "220px", objectFit: "cover"}} />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{content}</p>
              <p className="card-text"><small className="text-muted"></small></p>
            </div>
          </div>
        </div>
      </Link>
    </Fragment>
  );
}

export default InappCard;
