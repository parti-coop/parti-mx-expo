import gql from 'graphql-tag';

export const getMedia = gql`
  query {
    medias {
      name
    }
  }
`;
