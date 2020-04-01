export default typeData => {
  return {
    title: {
      marginTop: typeData.title_margin_top,
      fontFamily: typeData.title_font_family,
      fontSize: typeData.title_font_size,
      color: typeData.title_font_color,
      lineHeight: typeData.title_line_height,
      textAlign: typeData.title_text_align
    },
    content: {
      marginTop: typeData.content_margin_top,
      marginBottom: typeData.content_margin_bottom,
      fontFamily: typeData.content_font_family,
      fontSize: typeData.content_font_size,
      color: typeData.content_font_color,
      lineHeight: typeData.content_line_height,
      textAlign: typeData.content_text_align
    },
    buttons: {
      fontFamily: typeData.button_font_family,
      fontSize: typeData.button_font_size,
      color: typeData.button_font_color,
      letterSpacing: typeData.button_letter_spacing
    },
    modal: {
      borderRadius: typeData.modal_radius
    },
    header: {
      height: typeData.header_height
    },
    bottom: {
      paddingTop: typeData.bottom_padding_top,
      paddingRight: typeData.bottom_padding_right,
      paddingBottom: typeData.bottom_padding_bottom,
      paddingLeft: typeData.bottom_padding_left,
      backgroundColor: typeData.bottom_background_color
    },
    closeCircle: {
      width: typeData.close_circle_width,
      height: typeData.close_circle_width
    },
    closeCross: {
      height: typeData.close_cross_width, // Correspond to close_cross_width
      width: typeData.close_cross_thickness // Correspond to close_cross_thickness
    }
  }
}
