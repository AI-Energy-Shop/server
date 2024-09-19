import type { Schema, Attribute } from '@strapi/strapi';

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
    displayName: 'Image';
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
      'layout.top-nav': LayoutTopNav;
      'layout.newsletter': LayoutNewsletter;
      'elements.logo-link': ElementsLogoLink;
      'elements.link': ElementsLink;
      'elements.input': ElementsInput;
      'elements.image': ElementsImage;
    }
  }
}
