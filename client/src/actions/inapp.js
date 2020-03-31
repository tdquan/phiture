import { LOAD_INAPP, LOAD_INAPPS } from './types';
import { setAlert } from './alert';
import setAuthHeaders from '../utils/setAuthorization';

export const loadInapp = () => async dispatch => {
  const inapp = {
    name: 'inapp name',
    description: 'inapp description',
    title: 'inapp title',
    content: 'inapp content',
    image: '/header.jpg',
    user_id: '1',
    type_id: '1'
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

  dispatch({
    type: LOAD_INAPP,
    payload: { currentInapp: inapp, type: type }
  })
}

export const loadInapps = () => async dispatch => {
  const inapps = [{
    name: 'inapp name',
    description: 'inapp description',
    title: 'inapp title',
    content: 'inapp content',
    image: '/header.jpg',
    user_id: '1',
    type_id: '1'
  }];

  dispatch({
    type: LOAD_INAPPS,
    payload: { inapps: inapps }
  })
}
