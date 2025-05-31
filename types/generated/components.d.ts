import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsAddress extends Struct.ComponentSchema {
  collectionName: 'components_elements_addresses';
  info: {
    description: '';
    displayName: 'Address';
    icon: 'bulletList';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean;
    phone: Schema.Attribute.String;
    postcode: Schema.Attribute.String;
    state_territory: Schema.Attribute.String;
    street: Schema.Attribute.String;
    suburb: Schema.Attribute.String;
  };
}

export interface ElementsCartItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_cart_items';
  info: {
    description: '';
    displayName: 'Cart Item';
    icon: 'bulletList';
  };
  attributes: {
    image: Schema.Attribute.String & Schema.Attribute.Required;
    model: Schema.Attribute.String & Schema.Attribute.Required;
    odoo_product_id: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    productID: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsDeliveryOption extends Struct.ComponentSchema {
  collectionName: 'components_elements_delivery_options';
  info: {
    description: '';
    displayName: 'Delivery Option';
  };
  attributes: {
    eta: Schema.Attribute.Date;
    requestedDeliveryDate: Schema.Attribute.Date;
    shipping: Schema.Attribute.Component<
      'elements.delivery-option-shipping',
      false
    >;
    type: Schema.Attribute.String;
  };
}

export interface ElementsDeliveryOptionShipping extends Struct.ComponentSchema {
  collectionName: 'components_elements_delivery_option_shippings';
  info: {
    description: '';
    displayName: 'Delivery Option Shipping';
  };
  attributes: {
    carrierAccountId: Schema.Attribute.BigInteger;
    carrierId: Schema.Attribute.BigInteger;
    carrierServiceId: Schema.Attribute.BigInteger;
    companyCarrierAccountId: Schema.Attribute.BigInteger;
    companyId: Schema.Attribute.BigInteger;
    dgsDeclaration: Schema.Attribute.Boolean;
    display: Schema.Attribute.Component<
      'elements.delivery-option-shipping-display',
      false
    >;
  };
}

export interface ElementsDeliveryOptionShippingDisplay
  extends Struct.ComponentSchema {
  collectionName: 'components_elements_delivery_option_shipping_display';
  info: {
    description: '';
    displayName: 'Delivery Option Shipping Display';
    icon: 'bulletList';
  };
  attributes: {
    carrierDisplayName: Schema.Attribute.String;
    carrierServiceDisplayName: Schema.Attribute.String;
    eta: Schema.Attribute.String;
    totalSellBeforeTax: Schema.Attribute.String;
    totalSellPrice: Schema.Attribute.String;
    totalWeight: Schema.Attribute.BigInteger;
  };
}

export interface ElementsFilterRule extends Struct.ComponentSchema {
  collectionName: 'components_elements_filter_rules';
  info: {
    description: '';
    displayName: 'Filter';
  };
  attributes: {
    handle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsInput extends Struct.ComponentSchema {
  collectionName: 'components_elements_inputs';
  info: {
    displayName: 'Input';
  };
  attributes: {
    label: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean;
    type: Schema.Attribute.Enumeration<['TEXT', 'NUMBER', 'TEXTAREA']>;
  };
}

export interface ElementsInventory extends Struct.ComponentSchema {
  collectionName: 'components_elements_inventories';
  info: {
    description: '';
    displayName: 'Inventory';
    icon: 'bulletList';
  };
  attributes: {
    brisbane: Schema.Attribute.BigInteger;
    melbourne: Schema.Attribute.BigInteger;
    sydney: Schema.Attribute.BigInteger;
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

export interface ElementsLineItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_line_items';
  info: {
    description: '';
    displayName: 'Line Item';
  };
  attributes: {
    line: Schema.Attribute.Component<'elements.cart-item', false>;
    location: Schema.Attribute.Enumeration<['MEL', 'SYD', 'BNE']>;
  };
}

export interface ElementsName extends Struct.ComponentSchema {
  collectionName: 'components_elements_names';
  info: {
    displayName: 'Name';
  };
  attributes: {
    first_name: Schema.Attribute.String;
    last_name: Schema.Attribute.String;
    middle_name: Schema.Attribute.String;
  };
}

export interface ElementsPaymentOption extends Struct.ComponentSchema {
  collectionName: 'components_elements_payment_options';
  info: {
    displayName: 'Payment Option';
  };
  attributes: {
    billing_zip: Schema.Attribute.String;
    card_holder_name: Schema.Attribute.String;
    card_number: Schema.Attribute.String;
    cvv: Schema.Attribute.String;
    expiration_date: Schema.Attribute.Date;
  };
}

export interface ElementsPickupOption extends Struct.ComponentSchema {
  collectionName: 'components_elements_pickup_options';
  info: {
    displayName: 'Pickup Option';
  };
  attributes: {
    date: Schema.Attribute.DateTime;
    estimatedArraivalTime: Schema.Attribute.String;
  };
}

export interface ElementsPrice extends Struct.ComponentSchema {
  collectionName: 'components_elements_prices';
  info: {
    description: '';
    displayName: 'Price';
    icon: 'priceTag';
  };
  attributes: {
    max_quantity: Schema.Attribute.BigInteger;
    min_quantity: Schema.Attribute.BigInteger;
    price: Schema.Attribute.Decimal;
    sale_price: Schema.Attribute.Decimal;
    user_level: Schema.Attribute.Enumeration<
      ['SMALL', 'MID-SIZED', 'VIP', 'WHOLESALE']
    >;
  };
}

export interface ElementsShippingAddress extends Struct.ComponentSchema {
  collectionName: 'components_elements_shipping_addresses';
  info: {
    description: '';
    displayName: 'Shipping Address';
    icon: 'bulletList';
  };
  attributes: {
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean;
    name: Schema.Attribute.Component<'elements.name', false>;
    odoo_address_id: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postcode: Schema.Attribute.String;
    state_territory: Schema.Attribute.String;
    street: Schema.Attribute.String;
    suburb: Schema.Attribute.String;
  };
}

export interface ElementsSpecification extends Struct.ComponentSchema {
  collectionName: 'components_elements_specifications';
  info: {
    description: '';
    displayName: 'Specification';
    icon: 'bulletList';
  };
  attributes: {
    key: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSpecs extends Struct.ComponentSchema {
  collectionName: 'components_elements_specs';
  info: {
    displayName: 'Specs';
  };
  attributes: {
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTotal extends Struct.ComponentSchema {
  collectionName: 'components_elements_totals';
  info: {
    displayName: 'Total';
  };
  attributes: {
    amount: Schema.Attribute.Decimal;
    currency: Schema.Attribute.String;
  };
}

export interface ElementsWarehouseAddress extends Struct.ComponentSchema {
  collectionName: 'components_elements_warehouse_addresses';
  info: {
    displayName: 'Warehouse Address';
    icon: 'bulletList';
  };
  attributes: {
    city: Schema.Attribute.String;
    postcode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    street: Schema.Attribute.String;
    suburb: Schema.Attribute.String;
    unit: Schema.Attribute.String;
  };
}

export interface ElementsWarehouseLocation extends Struct.ComponentSchema {
  collectionName: 'components_elements_warehouse_locations';
  info: {
    description: '';
    displayName: 'Warehouse Location';
    icon: 'bulletList';
  };
  attributes: {
    address: Schema.Attribute.Component<'elements.warehouse-address', false>;
    name: Schema.Attribute.String;
    odoo_warehouse_id: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface FormInquiry extends Struct.ComponentSchema {
  collectionName: 'components_form_inquiries';
  info: {
    displayName: 'Inquiry';
    icon: 'apps';
  };
  attributes: {
    button_title: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    inputs: Schema.Attribute.Component<'elements.input', true>;
  };
}

export interface FormNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_form_newsletters';
  info: {
    description: '';
    displayName: 'Newsletter';
    icon: 'envelop';
  };
  attributes: {
    button_title: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    inputs: Schema.Attribute.Component<'elements.input', true>;
    sub_heading: Schema.Attribute.String;
    sub_text: Schema.Attribute.String;
  };
}

export interface LayoutSlide extends Struct.ComponentSchema {
  collectionName: 'components_layout_slides';
  info: {
    description: '';
    displayName: 'Slide';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['DESKTOP', 'TABLET', 'MOBILE']>;
  };
}

export interface LayoutWarehouseLocation extends Struct.ComponentSchema {
  collectionName: 'components_layout_warehouse_locations';
  info: {
    description: '';
    displayName: 'Warehouse Location';
    icon: 'bulletList';
  };
  attributes: {
    address: Schema.Attribute.String;
    google_maps_link: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    office_time: Schema.Attribute.String;
    warehouse_time: Schema.Attribute.String;
  };
}

export interface SectionsAbout extends Struct.ComponentSchema {
  collectionName: 'components_sections_about';
  info: {
    description: '';
    displayName: 'About';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_title: Schema.Attribute.String;
    description: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    sub_heading: Schema.Attribute.String;
  };
}

export interface SectionsContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_details';
  info: {
    description: '';
    displayName: 'Contact Details';
  };
  attributes: {
    left_heading: Schema.Attribute.String;
    left_sub_heading: Schema.Attribute.String;
    right_heading: Schema.Attribute.String;
    right_sub_heading: Schema.Attribute.String;
  };
}

export interface SectionsContactUs extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_us';
  info: {
    description: '';
    displayName: 'Contact Us';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    button_title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface SectionsImageSlider extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_sliders';
  info: {
    description: '';
    displayName: 'Image Slider';
    icon: 'apps';
  };
  attributes: {
    animation_duration: Schema.Attribute.Integer;
    display_button: Schema.Attribute.Boolean;
    slides: Schema.Attribute.Component<'layout.slide', true>;
  };
}

export interface SectionsWarehouseLocations extends Struct.ComponentSchema {
  collectionName: 'components_sections_warehouse_locations';
  info: {
    displayName: 'Warehouse Locations';
  };
  attributes: {
    heading: Schema.Attribute.String;
    locations: Schema.Attribute.Component<'layout.warehouse-location', true>;
    sub_heading: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.address': ElementsAddress;
      'elements.cart-item': ElementsCartItem;
      'elements.delivery-option': ElementsDeliveryOption;
      'elements.delivery-option-shipping': ElementsDeliveryOptionShipping;
      'elements.delivery-option-shipping-display': ElementsDeliveryOptionShippingDisplay;
      'elements.filter-rule': ElementsFilterRule;
      'elements.input': ElementsInput;
      'elements.inventory': ElementsInventory;
      'elements.key-features': ElementsKeyFeatures;
      'elements.line-item': ElementsLineItem;
      'elements.name': ElementsName;
      'elements.payment-option': ElementsPaymentOption;
      'elements.pickup-option': ElementsPickupOption;
      'elements.price': ElementsPrice;
      'elements.shipping-address': ElementsShippingAddress;
      'elements.specification': ElementsSpecification;
      'elements.specs': ElementsSpecs;
      'elements.total': ElementsTotal;
      'elements.warehouse-address': ElementsWarehouseAddress;
      'elements.warehouse-location': ElementsWarehouseLocation;
      'form.inquiry': FormInquiry;
      'form.newsletter': FormNewsletter;
      'layout.slide': LayoutSlide;
      'layout.warehouse-location': LayoutWarehouseLocation;
      'sections.about': SectionsAbout;
      'sections.contact-details': SectionsContactDetails;
      'sections.contact-us': SectionsContactUs;
      'sections.image-slider': SectionsImageSlider;
      'sections.warehouse-locations': SectionsWarehouseLocations;
    }
  }
}
