import type { Schema, Attribute } from '@strapi/strapi';

export interface ListTest2 extends Schema.Component {
  collectionName: 'components_list_test2s';
  info: {
    displayName: 'Test2';
    icon: 'bulletList';
  };
  attributes: {
    title: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'list.test2': ListTest2;
    }
  }
}
