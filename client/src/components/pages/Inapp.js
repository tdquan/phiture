import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadInapp } from '../../actions/inapp';
import TextFieldGroup from '../partials/TextFieldGroup';
import isEmpty from '../../utils/isEmpty';


const Inapp = ({ loadInapp, inapp }) => {
  const { loading } = inapp;

  const currentInapp = {
    name: '',
    description: '',
    title: '',
    content: '',
    image: '',
    user_id: '',
    type_id: ''
  };

  const type = {
    title_margin_top: '',
    title_font_family: '',
    title_font_size: '',
    title_font_color: '',
    title_line_height: '',
    title_text_align: '',
    content_margin_top: '',
    content_font_family: '',
    content_font_size: '',
    content_font_color: '',
    content_line_height: '',
    content_text_align: '',
    content_margin_bottom: '',
    button_font_family: '',
    button_font_size: '',
    button_font_color: '',
    button_letter_spacing: '',
    modal_radius: '',
    header_height: '',
    bottom_padding_top: '',
    bottom_padding_right: '',
    bottom_padding_bottom: '',
    bottom_padding_left: '',
    bottom_background_color: '',
    close_circle_width: '',
    close_cross_width: '',
    close_cross_thickness: ''
  };

  const [inappData, setInappData] = useState({...currentInapp});
  const [typeData, setTypeData] = useState({...type});

  useEffect(() => {
    loadInapp();

    if (!loading && !isEmpty(inapp.currentInapp) && !isEmpty(inapp.type)) {
      setInappData({ ...inapp.currentInapp })
      setTypeData({ ...inapp.type })
    }
  }, [loading]);

  const handleInappInputChange = e => setInappData({ ...inappData, [e.target.name]: e.target.value });
  const handleTypeInputChange = e => setTypeData({ ...typeData, [e.target.name]: e.target.value });

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
            <div className="modal-dialog shadow" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary">Save changes</button>
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
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

export default connect(
  mapStateToProps, { loadInapp }
// Implement map dispatch to props
)(Inapp)
