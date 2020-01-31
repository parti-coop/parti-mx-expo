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
    $user_id: Int!
    $closingMethod: Int!
  ) {
    insert_parti_2020_suggestions(
      objects: {
        body: $sBody
        title: $sTitle
        context: $sContext
        board_id: $board_id
        created_by: $user_id
        updated_by: $user_id
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

export const insertComment = gql`
  mutation($user_id: Int!, $suggestion_id: Int!, $body: String!) {
    insert_parti_2020_comments(
      objects: { body: $body, suggestion_id: $suggestion_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;

export const likeComment = gql`
  mutation($comment_id: Int!, $user_id: Int!) {
    insert_parti_2020_comments_like(
      objects: { user_id: $user_id, comment_id: $comment_id }
    ) {
      affected_rows
    }
  }
`;

export const unlikeComment = gql`
  mutation($comment_id: Int!, $user_id: Int!) {
    delete_parti_2020_comments_like(
      where: { user_id: { _eq: $user_id }, comment_id: { _eq: $comment_id } }
    ) {
      affected_rows
    }
  }
`;
export const insertUser = gql`
  mutation($email: String!, $nickname: String!, $userToken: String!) {
    insert_parti_2020_users(
      objects: { email: $email, name: $nickname, token: $userToken }
    ) {
      returning {
        id
        token
      }
    }
  }
`;
export const updateUserToken = gql`
  mutation($token: String!, $email: String!) {
    update_parti_2020_users(
      _set: { token: $token }
      where: { email: { _eq: $email } }
    ) {
      returning {
        id
        token
      }
    }
  }
`;
export const deleteUsersGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    delete_parti_2020_users_group(
      where: { group_id: { _eq: $group_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;
export const insertUserGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    insert_parti_2020_users_group(
      objects: { group_id: $group_id, user_id: $user_id }
    ) {
      affected_rows
    }
  }
`;
export const updateGroupName = gql`
  mutation($group_id: Int!, $groupName: String!, $bg_img_url: String) {
    update_parti_2020_groups(
      where: { id: { _eq: $group_id } }
      _set: { title: $groupName, bg_img_url: $bg_img_url }
    ) {
      affected_rows
    }
  }
`;
export const createNewGroup = gql`
  mutation($groupName: String!, $user_id: Int!, $bg_img_url: String) {
    insert_parti_2020_groups(
      objects: {
        title: $groupName
        creator_id: $user_id
        bg_img_url: $bg_img_url
      }
    ) {
      returning {
        id
      }
    }
  }
`;
export const createNewBoard = gql`
  mutation($title: String!, $body: String!, $group_id: Int!, $user_id: Int!) {
    insert_parti_2020_boards(
      objects: {
        group_id: $group_id
        body: $body
        updated_by: $user_id
        created_by: $user_id
        title: $title
      }
    ) {
      returning {
        id
      }
    }
  }
`;
