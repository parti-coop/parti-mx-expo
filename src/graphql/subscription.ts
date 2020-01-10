import gql from "graphql-tag";

export const subscribeGroups = gql`
  subscription {
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

export const subscribeSuggestionsByBoardId = gql`
  subscription($id: Int!, $userId: Int!) {
    parti_2020_boards_by_pk(id: $id) {
      id
      body
      title
      slug
      suggestions(where: { is_open: { _eq: true } }) {
        title
        body
        context
        closing_method
        created_at
        closed_at
        id
        votes(where: { user_id: { _eq: $userId } }) {
          count
        }
        votes_aggregate {
          aggregate {
            sum {
              count
            }
          }
        }
        updatedBy {
          name
        }
      }
    }
  }
`;
