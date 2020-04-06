import gql from "graphql-tag";
export const whoami = gql`
  query($id: Int!) {
    parti_2020_users(where: { id: { _eq: $id } }) {
      name
      email
      photo_url
    }
  }
`;
export const searchDuplicateName = gql`
  query($name: String!, $id: Int!) {
    parti_2020_users(
      where: { _and: [{ id: { _neq: $id } }, { name: { _ilike: $name } }] }
    ) {
      id
      email
    }
  }
`;

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
        is_member_only
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

export const getMemberCount = gql`
  query($group_id: Int!) {
    users: parti_2020_users_group_aggregate(
      where: {
        _and: [{ group_id: { _eq: $group_id } }, { status: { _eq: "user" } }]
      }
    ) {
      aggregate {
        count
      }
    }
    organizers: parti_2020_users_group_aggregate(
      where: {
        _and: [
          { group_id: { _eq: $group_id } }
          { status: { _eq: "organizer" } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const searchMembers = gql`
  query($searchKeyword: String!, $group_id: Int!, $memberType: String!) {
    parti_2020_users_group(
      where: {
        group_id: { _eq: $group_id }
        status: { _eq: $memberType }
        user: { name: { _ilike: $searchKeyword } }
      }
    ) {
      user {
        name
        email
        photo_url
      }
      status
      created_at
    }
  }
`;

export const searchOrganizer = gql`
  query($searchKeyword: String!, $group_id: Int!) {
    parti_2020_users_group(
      where: {
        group_id: { _eq: $group_id }
        status: { _eq: "organzier" }
        user: { name: { _ilike: $searchKeyword } }
      }
    ) {
      user {
        name
        email
      }
      status
    }
  }
`;

export const searchPosts = gql`
  query($searchKeyword: String!, $group_id: Int!, $user_id: Int!) {
    parti_2020_suggestions(
      where: {
        _and: [
          {
            _or: [
              { title: { _ilike: $searchKeyword } }
              { body: { _ilike: $searchKeyword } }
              { context: { _ilike: $searchKeyword } }
            ]
          }
          {
            board: {
              _and: [
                { group: { id: { _eq: $group_id } } }
                {
                  _or: [
                    { is_member_only: { _eq: false } }
                    { group: { users: { user_id: { _eq: $user_id } } } }
                  ]
                }
              ]
            }
          }
        ]
      }
    ) {
      id
      title
      created_at
      createdBy {
        name
      }
      board {
        title
      }
    }
  }
`;
