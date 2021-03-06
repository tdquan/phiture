import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import InappCard from '../partials/InappCard';
import { loadInapps } from '../../actions/inapp';
import isEmpty from '../../utils/isEmpty';

const Dashboard = ({ loadInapps, inapp }) => {
  useEffect(() => {
    loadInapps();
  }, []);

  const { inapps, loading } = inapp;
  const history = useHistory();

  return (
    <div className='row row-cols-1 row-cols-md-3'>
      <Link to="#" onClick={() => history.push('/new-inapp')} className="col p-3">
        <div className="card h-100 mb-3 d-flex align-items-center justify-content-center">
          <p style={{fontSize: "15em"}} className="m-0 h-100">+</p>
        </div>
      </Link>
      { !loading && !isEmpty(inapps) ?
        inapps.map((inapp, key) => {
          return <InappCard key={key} inapp={inapp.inapp} />
        }) :
        null
      }
    </div>
  )
}

Dashboard.propTypes = {
  inapp: PropTypes.object.isRequired,
  loadInapps: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  inapp: state.inapp
})

export default connect(mapStateToProps, { loadInapps })(Dashboard);
