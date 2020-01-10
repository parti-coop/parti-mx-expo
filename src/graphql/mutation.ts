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
    $sTitle: String!
    $sContext: String!
    $sBody: String!
    $created_by: Int!
    $updated_by: Int!
    $closingMethod: Int!
  ) {
    insert_parti_2020_suggestions(
      objects: {
        body: $sBody
        title: $sTitle
        context: $sContext
        board_id: $board_id
        created_by: $created_by
        updated_by: $updated_by
        closing_method: $closingMethod
      }
    ) {
      affected_rows
    }
  }
`;

export const updateSuggestion = gql`
  mutation(
    $id: Int!
    $sTitle: String!
    $sContext: String!
    $sBody: String!
    $user_id: Int!
    $closingMethod: Int!
  ) {
    update_parti_2020_suggestions(
      where: { id: { _eq: $id } }
      _set: {
        body: $sBody
        title: $sTitle
        context: $sContext
        updated_by: $user_id
        closing_method: $closingMethod
      }
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

export const voteSuggestion = gql`
  mutation($id: Int!, $user_id: Int!) {
    insert_parti_2020_vote(objects: { suggestion_id: $id, user_id: $user_id }) {
      affected_rows
    }
  }
`;

export const devoteSuggestion = gql`
  mutation($id: Int!, $user_id: Int!) {
    delete_parti_2020_vote(
      where: { suggestion_id: { _eq: $id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;
