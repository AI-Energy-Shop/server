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

export interface ElementsSpecification extends Struct.ComponentSchema {
  collectionName: 'components_elements_specifications';
  info: {
    displayName: 'Specification';
    icon: 'bulletList';
  };
  attributes: {
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface ElementsShipping extends Struct.ComponentSchema {
  collectionName: 'components_elements_shippings';
  info: {
    displayName: 'Shipping';
    icon: 'house';
    description: '';
  };
  attributes: {
    type: Schema.Attribute.String;
    delivery_address: Schema.Attribute.String;
    delivery_option: Schema.Attribute.Component<
      'elements.delivery-option',
      false
    >;
    shipping_details: Schema.Attribute.Component<
      'elements.shipping-details',
      false
    >;
  };
}

export interface ElementsShippingDetails extends Struct.ComponentSchema {
  collectionName: 'components_elements_shipping_details';
  info: {
    displayName: 'Shipping Details';
    description: '';
  };
  attributes: {
    company_name: Schema.Attribute.String;
    address: Schema.Attribute.Component<'elements.address', false>;
  };
}

export interface ElementsPrice extends Struct.ComponentSchema {
  collectionName: 'components_elements_prices';
  info: {
    displayName: 'Price';
    icon: 'priceTag';
    description: '';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    sale_price: Schema.Attribute.Decimal;
    min_quantity: Schema.Attribute.BigInteger;
    max_quantity: Schema.Attribute.BigInteger;
    user_level: Schema.Attribute.Enumeration<
      ['SMALL', 'MID-SIZED', 'VIP', 'WHOLESALE']
    >;
  };
}

export interface ElementsPayment extends Struct.ComponentSchema {
  collectionName: 'components_elements_payments';
  info: {
    displayName: 'Payment';
  };
  attributes: {
    method: Schema.Attribute.String;
  };
}

export interface ElementsKeyFeatures extends Struct.ComponentSchema {
  collectionName: 'components_elements_key_features';
  info: {
    displayName: 'key_features';
  };
  attributes: {
    feature: Schema.Attribute.String;
  };
}

export interface ElementsInventory extends Struct.ComponentSchema {
  collectionName: 'components_elements_inventories';
  info: {
    displayName: 'Inventory';
    icon: 'bulletList';
  };
  attributes: {
    location: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer;
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

export interface ElementsDeliveryOption extends Struct.ComponentSchema {
  collectionName: 'components_elements_delivery_options';
  info: {
    displayName: 'Delivery Option';
    icon: 'train';
    description: '';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    title: Schema.Attribute.String;
    eta: Schema.Attribute.String;
    notes: Schema.Attribute.Text;
  };
}

export interface ElementsCartItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_cart_items';
  info: {
    displayName: 'CartItem';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer;
    price: Schema.Attribute.Decimal;
    odoo_product_id: Schema.Attribute.String;
  };
}

export interface ElementsAddress extends Struct.ComponentSchema {
  collectionName: 'components_elements_addresses';
  info: {
    displayName: 'Address';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    street: Schema.Attribute.String;
    suburb: Schema.Attribute.String;
    state_territory: Schema.Attribute.String;
    postcode: Schema.Attribute.String;
    country: Schema.Attribute.String;
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
      'elements.specification': ElementsSpecification;
      'elements.shipping': ElementsShipping;
      'elements.shipping-details': ElementsShippingDetails;
      'elements.price': ElementsPrice;
      'elements.payment': ElementsPayment;
      'elements.key-features': ElementsKeyFeatures;
      'elements.inventory': ElementsInventory;
      'elements.input': ElementsInput;
      'elements.delivery-option': ElementsDeliveryOption;
      'elements.cart-item': ElementsCartItem;
      'elements.address': ElementsAddress;
    }
  }
}
