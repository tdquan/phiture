import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loadInapp, addButton, createInapp, setLoaded } from '../../actions/inapp';
import { inapp as currentInapp, type, buttons as currentButtons, button as newButton, inappCard } from '../../shared/constants';
import TextFieldGroup from '../partials/TextFieldGroup';
import isEmpty from '../../utils/isEmpty';
import processTypeData from '../../utils/processTypeData';


const Inapp = ({ loadInapp, addButton, createInapp, inapp, match: { params } }, setLoaded) => {
  const { loading } = inapp;

  const [inappData, setInappData] = useState(currentInapp);
  const [typeData, setTypeData] = useState(type);
  const [buttonsData, setButtonsData] = useState(currentButtons);
  const [cardData, setCardData] = useState(inappCard);

  useEffect(() => {
    loadInapp(params.id);

    // if (!isEmpty(inapp.currentInapp) && !isEmpty(inapp.type)) {
      setLoaded();
    // }

    if (!loading && !isEmpty(inapp.currentInapp) && !isEmpty(inapp.type)) {
      setInappData(inapp.currentInapp);
      setTypeData(inapp.type);
      setButtonsData(inapp.buttons);
      setCardData(processTypeData(inapp.type));
    }
  }, [loading]);

  const { title, content, buttons, modal, header, bottom, closeCircle, closeCross } = cardData;

  const handleSubmit = async e => {
    e.preventDefault();
    let button_params = {};
    buttonsData.map((button_param, index) => button_params[index] = button_param);
    createInapp({ inapp: inappData, type: typeData, buttons: { button_attrs: button_params } });
  }

  const handleInappInputChange = e => setInappData({ ...inappData, [e.target.name]: e.target.value });
  const handleTypeInputChange = e => {
    setTypeData({ ...typeData, [e.target.name]: e.target.value });
    const newTypeData = { ...typeData };
    newTypeData[e.target.name] = e.target.value
    setCardData(processTypeData(newTypeData));
  }
  const handleButtonInputChange = e => {
    const newButtonsData = buttonsData.map((button, index) => {
      if (index.toString() === e.target.getAttribute('data-index')) {
        return { ...button, [e.target.name]: e.target.value };
      } else {
        return button;
      }
    })
    setButtonsData(newButtonsData);
  };

  const handleAddButton = (e) => {
    addButton();
  };

  return loading || isEmpty(inapp.currentInapp) || isEmpty(inapp.type) ? null : (
    <Fragment>
      <Link to='/dashboard' className="btn btn-primary">Back to dashboard</Link>
      <div className="row col-rows-2 vh-100">
        <div className="col h-100 p-3 overflow-auto" id="editor">
          <h3 className="text-center mt-4">Inapp Editor</h3>
          <div className="card">
            <div className="card-body">
              <form onSubmit={ e => handleSubmit(e) }>
                {/*Inapp values*/}
                <h4 className="text-center">Inapp</h4>
                <br/>
                {
                  Object.entries(inappData)
                    .filter(([key, value]) => key !== 'user_id' && key !== 'type_id' && key !== 'id')
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
                  Object.entries(typeData)
                    .filter(([key, value]) => key !== 'id' && key !== 'user_id')
                    .map( ([key, value]) => {
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
                {/*Buttons*/}
                <hr/>
                <h4 className="text-center">Type</h4>
                <br/>
                {
                  Object.entries(buttonsData).map(([buttonKey, button]) => {
                    return buttonKey === undefined || isEmpty(button) || isEmpty(buttonsData) ?
                    null :
                    (
                      <div key={buttonKey}>
                      <h4>Button {parseInt(buttonKey) + 1}</h4>
                        {
                          Object.entries(button)
                            .filter(([key, value]) => key !== 'id' && key !== 'inapp_id')
                            .map(([key, value]) => {
                              return key === undefined || value === undefined ? null :
                                <TextFieldGroup
                                  placeholder={key}
                                  name={key}
                                  value={value}
                                  key={key}
                                  onChange={e => handleButtonInputChange(e)}
                                  label={key}
                                  dataIndex={buttonKey}
                                />
                            })
                        }
                      </div>
                    )
                  })
                }
                <br/>
                <button type="button" className="btn btn-outline-secondary btn-block" onClick={e => handleAddButton(e)}>Add Button</button>
                <hr/>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col h-100 p-3" id="modal">
          <div className="modal d-flex align-items-center position-relative" tabIndex="-1" role="dialog">
            <div className="modal-dialog shadow" style={modal} role="document">
              <div className="modal-content d-flex flex-column justify-content-between align-items-stretch inapp-card" style={modal}>
                <div className="inapp-card-header">
                  <img src={inappData.image} alt="header" className="inapp-card-img" style={header} />
                  <button href="#" className="close-btn" style={closeCircle}>
                    <div className="cross d-flex flex-column justify-content-center align-items-center">
                      <style dangerouslySetInnerHTML={{__html: `
                        .cross:before, .cross:after {
                          height: ${closeCross.height};
                          width: ${closeCross.width};
                        }
                      `}} />
                    </div>
                  </button>
                </div>

                {/*<!-- First screen start -->*/}
                <div className="inapp-card-bottom" style={bottom}>

                  {/*<!-- Title -->*/}
                  <h2 className="inapp-card-title" style={title}>{inappData.title}</h2>

                  {/*<!-- Content -->*/}
                  <p className="inapp-card-content" style={content}>{inappData.content}
                  </p>

                  {/*<!-- Buttons -->*/}
                  <div className="d-flex flex-column align-items-center">
                    { Object.entries(buttonsData).map( ([key, button]) => {
                        return key === undefined || isEmpty(button) || isEmpty(buttonsData) ?
                          null :
                          (
                            <a href={button.link} className="btn btn-outline-primary d-flex justify-content-center align-items-center btn-block btn-lg" style={{...buttons, backgroundColor: button.fill_color, borderColor: button.border_color}} key={key}>
                              {button.content}
                            </a>
                          )
                      })
                    }
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
  setLoaded: PropTypes.func.isRequired,
  loadInapp: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired,
  createInapp: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  inapp: state.inapp,
  auth: state.auth
})

export default connect(mapStateToProps, { loadInapp, addButton, createInapp, setLoaded })(Inapp)
