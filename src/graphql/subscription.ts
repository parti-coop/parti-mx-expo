import gql from "graphql-tag";

export const getGroups = gql`
  query {
    parti_2020_groups {
      title
      id
    }
  }
`;

export const subscribeSuggestionsByGroupId = gql`
  subscription($id: Int!) {
    parti_2020_groups_by_pk(id: $id) {
      id
      title
      boards {
        id
        title
      }
      boardDefault {
        id
        body
        slug
        suggestions {
          body
          created_at
          id
          updatedBy {
            email
          }
        }
      }
    }
  }
`;
