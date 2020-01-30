import gql from "graphql-tag";

export const getGroups = gql`
  query {
    parti_2020_groups {
      title
      id
    }
  }
`;

export const getSuggestionsByGroupId = gql`
  query($id: Int!) {
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

export const getSuggestion = gql`
  query($id: Int!) {
    parti_2020_suggestions_by_pk(id: $id) {
      id
      title
      body
      context
      closing_method
      updatedBy {
        name
      }
      createdBy {
        name
      }
      created_at
      updated_at
      votes_aggregate {
        aggregate {
          sum {
            count
          }
        }
        nodes {
          user {
            name
          }
        }
      }
    }
  }
`;

export const getBoardsByGroupId = gql`
  query($group_id: Int!, $user_id: Int!) {
    parti_2020_groups_by_pk(id: $group_id) {
      id
      title
      boards {
        id
        title
        body
        isMemberOnly
      }
      users_aggregate {
        aggregate {
          count
        }
      }
      users(where: { user_id: { _eq: $user_id } }) {
        status
      }
    }
  }
`;

export const searchGroups = gql`
  query($searchKeyword: String!) {
    parti_2020_groups(where: { title: { _ilike: $searchKeyword } }) {
      title
      id
    }
  }
`;
