import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutWarehouseLocationSection extends Schema.Component {
  collectionName: 'components_layout_warehouse_location_sections';
  info: {
    displayName: 'Warehouse Location Section';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    sub_heading: Attribute.Text;
    locations: Attribute.Component<'elements.location', true>;
  };
}

export interface LayoutTopNav extends Schema.Component {
  collectionName: 'components_layout_top_navs';
  info: {
    displayName: 'Top Nav';
  };
  attributes: {
    logolink: Attribute.Component<'elements.logo-link'>;
    link: Attribute.Component<'elements.link', true>;
    cta: Attribute.Component<'elements.link'>;
  };
}

export interface LayoutNewsletter extends Schema.Component {
  collectionName: 'components_layout_newsletters';
  info: {
    displayName: 'Newsletter';
    description: '';
  };
  attributes: {
    input: Attribute.Component<'elements.input', true>;
  };
}

export interface LayoutContactUsSection extends Schema.Component {
  collectionName: 'components_layout_contact_us_sections';
  info: {
    displayName: 'ContactUs Section';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media<'images'>;
    button_title: Attribute.String;
  };
}

export interface LayoutContactFormSection extends Schema.Component {
  collectionName: 'components_layout_contact_form_sections';
  info: {
    displayName: 'Contact Form Section';
  };
  attributes: {
    heading: Attribute.String;
  };
}

export interface LayoutContactDetails extends Schema.Component {
  collectionName: 'components_layout_contact_details';
  info: {
    displayName: 'Contact Details Section';
    description: '';
  };
  attributes: {
    left_subheading: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Left heading'>;
    left_description: Attribute.String;
    right_subheading: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Right Heading'>;
    right_description: Attribute.String;
  };
}

export interface LayoutAboutSection extends Schema.Component {
  collectionName: 'components_layout_about_sections';
  info: {
    displayName: 'About Section';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    sub_heading: Attribute.String;
    description: Attribute.Text;
    background_image: Attribute.Media<'images' | 'videos'>;
    button_title: Attribute.String;
  };
}

export interface ElementsOpenHours extends Schema.Component {
  collectionName: 'components_elements_open_hours';
  info: {
    displayName: 'Open Hours';
    description: '';
  };
  attributes: {
    warehouse_time: Attribute.String;
    office_time: Attribute.String;
  };
}

export interface ElementsLogoLink extends Schema.Component {
  collectionName: 'components_elements_logo_links';
  info: {
    displayName: 'Logo Link';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    text: Attribute.String;
    href: Attribute.String;
  };
}

export interface ElementsLocation extends Schema.Component {
  collectionName: 'components_elements_locations';
  info: {
    displayName: 'Location';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    address: Attribute.Text;
    warehouse_time: Attribute.String;
    office_time: Attribute.String;
    link: Attribute.Text;
  };
}

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Attribute.String;
    text: Attribute.String;
    external: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ElementsInput extends Schema.Component {
  collectionName: 'components_elements_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    type: Attribute.Enumeration<['TEXT', 'NUMBER']>;
    title: Attribute.String;
    placeholder: Attribute.String;
  };
}

export interface ElementsImage extends Schema.Component {
  collectionName: 'components_elements_images';
  info: {
    displayName: 'Banner Image';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.warehouse-location-section': LayoutWarehouseLocationSection;
      'layout.top-nav': LayoutTopNav;
      'layout.newsletter': LayoutNewsletter;
      'layout.contact-us-section': LayoutContactUsSection;
      'layout.contact-form-section': LayoutContactFormSection;
      'layout.contact-details': LayoutContactDetails;
      'layout.about-section': LayoutAboutSection;
      'elements.open-hours': ElementsOpenHours;
      'elements.logo-link': ElementsLogoLink;
      'elements.location': ElementsLocation;
      'elements.link': ElementsLink;
      'elements.input': ElementsInput;
      'elements.image': ElementsImage;
    }
  }
}
