import React from 'react';

const InappCard = ({ inapp }) => {
  const { title, content, image } = inapp;

  return (
    <div className="col p-3">
      <div className="card h-100 mb-3">
        <img src={image} className="card-img-top" alt="" style={{height: "50%", objectFit: "cover"}} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{content}</p>
          <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
        </div>
      </div>
    </div>
  );
}

export default InappCard;
