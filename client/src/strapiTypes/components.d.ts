import type { Schema, Attribute } from '@strapi/strapi';

export interface ImagesResponsiveImage extends Schema.Component {
  collectionName: 'components_images_responsive_images';
  info: {
    displayName: 'responsive_image';
    icon: 'medium';
  };
  attributes: {
    mobile: Attribute.Media;
    tablet: Attribute.Media;
    desktop: Attribute.Media;
    alt_text: Attribute.String;
  };
}

export interface RecommendationsRecommendations extends Schema.Component {
  collectionName: 'components_recommendations_recommendations';
  info: {
    displayName: 'recommendations';
    icon: 'command';
  };
  attributes: {
    slug: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'images.responsive-image': ImagesResponsiveImage;
      'recommendations.recommendations': RecommendationsRecommendations;
    }
  }
}
