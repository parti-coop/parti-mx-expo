import gql from "graphql-tag";

export const subscribeGroupsByUserId = gql`
  subscription($user_id: Int!) {
    parti_2020_users_group(where: { user_id: { _eq: $user_id } }) {
      group {
        title
        id
      }
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
      suggestions(
        where: { is_open: { _eq: true } }
        order_by: { updated_at: desc }
      ) {
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

export const subscribeSuggestion = gql`
  subscription($id: Int!, $user_id: Int!) {
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
      comments {
        id
        body
        updated_at
        user {
          name
          votes(where: { suggestion_id: { _eq: $id } }) {
            count
          }
        }
        likes(where: { user_id: { _eq: $user_id } }) {
          user {
            name
          }
        }
        likes_aggregate {
          aggregate {
            count
          }
          nodes {
            user {
              name
            }
          }
        }
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

export const subscribeBoardsByGroupId = gql`
  subscription($group_id: Int!, $user_id: Int!) {
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
