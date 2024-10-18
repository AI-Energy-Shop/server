import type { Struct, Schema } from '@strapi/strapi';

export interface SectionsWarehouseLocations extends Struct.ComponentSchema {
  collectionName: 'components_sections_warehouse_locations';
  info: {
    displayName: 'Warehouse Locations';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    locations: Schema.Attribute.Component<'layout.warehouse-location', true>;
  };
}

export interface SectionsImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_sliders';
  info: {
    displayName: 'Image Slider';
    icon: 'apps';
    description: '';
  };
  attributes: {
    animation_duration: Schema.Attribute.Integer;
    display_button: Schema.Attribute.Boolean;
    slides: Schema.Attribute.Component<'layout.slide', true>;
  };
}

export interface SectionsContactUs extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_us';
  info: {
    displayName: 'Contact Us';
    description: '';
  };
  attributes: {
    heading: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    button_title: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SectionsContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_details';
  info: {
    displayName: 'Contact Details';
    description: '';
  };
  attributes: {
    left_heading: Schema.Attribute.String;
    left_sub_heading: Schema.Attribute.String;
    right_heading: Schema.Attribute.String;
    right_sub_heading: Schema.Attribute.String;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_about';
  info: {
    displayName: 'About';
    description: '';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    description: Schema.Attribute.String;
    button_title: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface LayoutWarehouseLocation extends Struct.ComponentSchema {
  collectionName: 'components_layout_warehouse_locations';
  info: {
    displayName: 'Warehouse Location';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    address: Schema.Attribute.String;
    warehouse_time: Schema.Attribute.String;
    office_time: Schema.Attribute.String;
    google_maps_link: Schema.Attribute.Text;
    name: Schema.Attribute.String;
  };
}

export interface LayoutSlide extends Struct.ComponentSchema {
  collectionName: 'components_layout_slides';
  info: {
    displayName: 'Slide';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    type: Schema.Attribute.Enumeration<['DESKTOP', 'TABLET', 'MOBILE']>;
  };
}

export interface FormNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_form_newsletters';
  info: {
    displayName: 'Newsletter';
    icon: 'envelop';
    description: '';
  };
  attributes: {
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
    inputs: Schema.Attribute.Component<'elements.input', true>;
    sub_text: Schema.Attribute.String;
    button_title: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface FormInquiry extends Struct.ComponentSchema {
  collectionName: 'components_form_inquiries';
  info: {
    displayName: 'Inquiry';
    icon: 'apps';
  };
  attributes: {
    heading: Schema.Attribute.String;
    button_title: Schema.Attribute.String;
    inputs: Schema.Attribute.Component<'elements.input', true>;
  };
}

export interface ElementsInput extends Struct.ComponentSchema {
  collectionName: 'components_elements_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['TEXT', 'NUMBER', 'TEXTAREA']>;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.warehouse-locations': SectionsWarehouseLocations;
      'sections.image-slider': SectionsImageSlider;
      'sections.contact-us': SectionsContactUs;
      'sections.contact-details': SectionsContactDetails;
      'sections.about': SectionsAbout;
      'layout.warehouse-location': LayoutWarehouseLocation;
      'layout.slide': LayoutSlide;
      'form.newsletter': FormNewsletter;
      'form.inquiry': FormInquiry;
      'elements.input': ElementsInput;
    }
  }
}
