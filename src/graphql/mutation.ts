import gql from "graphql-tag";

export const insertGroup = gql`
  mutation {
    insert_parti_2020_groups(objects: { title: "test1", user_id: 1 }) {
      affected_rows
    }
  }
`;

export const insertSuggestion = gql`
  mutation(
    $board_id: Int!
    $body: String!
    $created_by: Int!
    $updated_by: Int!
  ) {
    insert_parti_2020_suggestions(
      objects: {
        body: $body
        board_id: $board_id
        created_by: $created_by
        updated_by: $updated_by
      }
    ) {
      affected_rows
    }
  }
`;

export const updateSuggestion = gql`
  mutation($id: Int!, $body: String!) {
    update_parti_2020_suggestions(
      where: { id: { _eq: $id } }
      _set: { body: $body }
    ) {
      affected_rows
    }
  }
`;

export const deleteSuggestion = gql`
  mutation($id: Int!) {
    delete_parti_2020_suggestions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;
