user = User.create!(email: 'admin@email.com', password: 'admin_password')

10.times do |n|
  type = user.types.new(
    title_margin_top: "#{rand(5..20)}px",
    title_font_family: ['serif', 'sans-serif', 'cursive', 'Helvetica'].sample,
    title_font_size: "#{rand(20..30)}px",
    title_font_color: 'inherit',
    title_line_height: 'inherit',
    title_text_align: 'inherit',
    content_margin_top: "#{rand(2..15)}px",
    content_font_family: 'inherit',
    content_font_size: '1em',
    content_font_color: 'inherit',
    content_line_height: '1.2',
    content_text_align: 'inherit',
    content_margin_bottom: "#{rand(2..15)}px",
    button_font_family: 'inherit',
    button_font_size: '1em',
    button_font_color: 'inherit',
    button_letter_spacing: 'inherit',
    modal_radius: "#{rand(0..15)}px",
    header_height: "#{rand(200..300)}px",
    bottom_padding_top: "#{rand(2..15)}px",
    bottom_padding_right: '1em',
    bottom_padding_bottom: "#{rand(2..15)}px",
    bottom_padding_left: '1em',
    bottom_background_color: '#FFF',
    close_circle_width: "#{rand(20..25)}px",
    close_cross_width: "#{rand(10..15)}px",
    close_cross_thickness: "#{rand(3..5)}px"
  )

  inapp = type.build_inapp(
    name: "Template #{n}",
    description: "Some description",
    title: "Template #{n} title",
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat explicabo ipsa dolorem, eum ab. Magni, perferendis cumque qui quam officia.",
    image: '/header.jpg',
    user_id: user.id
  )

  [1, 2].sample.times do
    inapp.buttons.new(
      content: ['Visit', 'OK', 'Take me there!'].sample,
      link: '#',
      fill_color: ['white', 'red', 'transparent'].sample,
      border_color: ['black', 'white', 'blue', 'green'].sample
    )
  end

  type.save!
  inapp.save!
  inapp.buttons.map(&:save!)
end
