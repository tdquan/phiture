import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadInapp } from '../../actions/inapp';
import { inapp as currentInapp, type, inappCard } from '../../shared/constants';
import TextFieldGroup from '../partials/TextFieldGroup';
import isEmpty from '../../utils/isEmpty';
import processTypeData from '../../utils/processTypeData';


const Inapp = ({ loadInapp, inapp }) => {
  const { loading } = inapp;

  const [inappData, setInappData] = useState(currentInapp);
  const [typeData, setTypeData] = useState(type);
  const [cardData, setCardData] = useState(inappCard);

  useEffect(() => {
    loadInapp();

    if (!loading && !isEmpty(inapp.currentInapp) && !isEmpty(inapp.type)) {
      setInappData(inapp.currentInapp);
      setTypeData(inapp.type);
      setCardData(processTypeData(inapp.type));
    }
  }, [loading]);


  const { title, content, buttons, modal, header, bottom, closeCircle, closeCross } = cardData;

  const handleInappInputChange = e => setInappData({ ...inappData, [e.target.name]: e.target.value });
  const handleTypeInputChange = e => {
    setTypeData({ ...typeData, [e.target.name]: e.target.value });
    const newTypeData = { ...typeData };
    newTypeData[e.target.name] = e.target.value
    setCardData(processTypeData(newTypeData));
  }

  return loading || isEmpty(inapp.currentInapp) || isEmpty(inapp.type) ? null : (
    <Fragment>
      <div className="row col-rows-2 vh-100">
        <div className="col h-100 p-3 overflow-auto" id="editor">
          <h3 className="text-center mt-4">Inapp Editor</h3>
          <div className="card">
            <div className="card-body">
              <form action="">
                {/*Inapp values*/}
                <h4 className="text-center">Inapp</h4>
                <br/>
                {
                  Object.entries(inappData)
                    .filter(([key, value]) => key !== 'user_id' && key !== 'type_id')
                    .map(([key, value]) => {
                      return key === undefined && value === undefined ? null : (
                        <TextFieldGroup
                          placeholder={key}
                          name={key}
                          value={value}
                          key={key}
                          onChange={e => handleInappInputChange(e)}
                          label={key}
                        />
                      )
                  })
                }
                {/*Type values*/}
                <hr/>
                <h4 className="text-center">Type</h4>
                <br/>
                {
                  Object.entries(typeData).map( ([key, value]) => {
                    return key === undefined && value === undefined ? null : (
                      <TextFieldGroup
                        placeholder={key}
                        name={key}
                        value={value}
                        key={key}
                        onChange={e => handleTypeInputChange(e)}
                        label={key}
                      />
                    )
                  })
                }
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col h-100 p-3" id="modal">
          <div className="modal d-flex align-items-center position-relative" tabIndex="-1" role="dialog">
            <div className="modal-dialog shadow" style={modal} role="document">
              <div className="modal-content d-flex flex-column justify-content-between align-items-stretch inapp-card" style={modal}>
                <div className="inapp-card-header">
                  <img src="/header.jpg" alt="header" className="inapp-card-img" style={header} />
                  <button href="#" className="close-btn" style={closeCircle}>
                    <div className="cross d-flex flex-column justify-content-center align-items-center" style={closeCross}></div>
                  </button>
                </div>

                {/*<!-- First screen start -->*/}
                <div className="inapp-card-bottom" style={bottom}>

                  {/*<!-- Title -->*/}
                  <h2 className="inapp-card-title" style={title}>Hidden gems ; )</h2>

                  {/*<!-- Content -->*/}
                  <p className="inapp-card-content" style={content}>For that once-in-a-lifetime trip.
                  To add a destination to your wishlist simply look for a location and tap on the + button.
                  </p>

                  {/*<!-- Buttons -->*/}
                  <div className="buttons" className="d-flex flex-column align-items-center">
                     <a href="https://www.blender-inapps.com/inapps/603/buttons/new" className="btn btn-outline-primary d-flex justify-content-center align-items-center btn-block btn-lg" style={buttons}>
                      Discover now
                    </a>
                     <a href="https://www.blender-inapps.com/inapps/603/buttons/new" className="btn btn-outline-danger d-flex justify-content-center align-items-center btn-block btn-lg" style={buttons}>
                      Close
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Inapp.propTypes = {
  inapp: PropTypes.object.isRequired,
  loadInapp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  inapp: state.inapp,
  auth: state.auth
})

export default connect(mapStateToProps, { loadInapp })(Inapp)
