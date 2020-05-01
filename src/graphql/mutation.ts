import gql from "graphql-tag";

export const insertUser = gql`
  mutation($email: String!, $name: String!) {
    insert_mx_users(objects: { email: $email, name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const updateUserName = gql`
  mutation($id: Int!, $name: String!, $photo_url: String) {
    update_mx_users(
      _set: { name: $name, photo_url: $photo_url }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;

export const insertPost = gql`
  mutation(
    $board_id: Int!
    $group_id: Int!
    $sTitle: String!
    $sContext: String
    $sBody: String!
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
  ) {
    insert_mx_posts(
      objects: {
        body: $sBody
        title: $sTitle
        context: $sContext
        board_id: $board_id
        metadata: $metadata
        images: $images
        files: $files
      }
    ) {
      affected_rows
    }
    update_mx_boards(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $board_id } }
    ) {
      affected_rows
    }
    update_mx_groups(
      _set: { last_posted_at: "now()" }
      where: { id: { _eq: $group_id } }
    ) {
      affected_rows
    }
  }
`;

export const updatePost = gql`
  mutation(
    $id: Int!
    $sTitle: String!
    $sContext: String
    $sBody: String!
    $metadata: jsonb = {}
    $images: jsonb
    $files: jsonb
  ) {
    update_mx_posts(
      where: { id: { _eq: $id } }
      _set: {
        body: $sBody
        title: $sTitle
        context: $sContext
        images: $images
        files: $files
      }
      _append: { metadata: $metadata }
    ) {
      affected_rows
    }
  }
`;

export const deletePost = gql`
  mutation($id: Int!) {
    delete_mx_posts(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const likeSuggestion = gql`
  mutation($id: Int!) {
    insert_mx_users_post(
      objects: { post_id: $id, like_count: 1 }
      on_conflict: { constraint: users_post_pkey, update_columns: [like_count] }
    ) {
      affected_rows
    }
  }
`;

export const unlikeSuggestion = gql`
  mutation($id: Int!, $user_id: Int!) {
    update_mx_users_post(
      where: { post_id: { _eq: $id }, user_id: { _eq: $user_id } }
      _set: { like_count: 0 }
    ) {
      affected_rows
    }
  }
`;

export const insertComment = gql`
  mutation($post_id: Int!, $body: String!, $parent_id: Int) {
    insert_mx_comments(
      objects: { body: $body, post_id: $post_id, parent_id: $parent_id }
    ) {
      affected_rows
    }
  }
`;

export const updateComment = gql`
  mutation($id: Int!, $body: String!) {
    update_mx_comments(_set: { body: $body }, where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

export const deleteComment = gql`
  mutation($comment_id: Int!) {
    delete_mx_comments(where: { id: { _eq: $comment_id } }) {
      affected_rows
    }
  }
`;

export const likeComment = gql`
  mutation($comment_id: Int!) {
    insert_mx_comments_like(objects: { comment_id: $comment_id }) {
      affected_rows
    }
  }
`;

export const unlikeComment = gql`
  mutation($comment_id: Int!, $user_id: Int!) {
    delete_mx_comments_like(
      where: { user_id: { _eq: $user_id }, comment_id: { _eq: $comment_id } }
    ) {
      affected_rows
    }
  }
`;

export const deleteUsersGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    delete_mx_users_group(
      where: { group_id: { _eq: $group_id }, user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;
export const insertUserGroup = gql`
  mutation($group_id: Int!) {
    insert_mx_users_group(objects: { group_id: $group_id }) {
      affected_rows
    }
  }
`;
export const updateGroupName = gql`
  mutation($group_id: Int!, $groupName: String!, $bg_img_url: String) {
    update_mx_groups(
      where: { id: { _eq: $group_id } }
      _set: { title: $groupName, bg_img_url: $bg_img_url }
    ) {
      affected_rows
    }
  }
`;
export const createNewGroup = gql`
  mutation($groupName: String!, $bg_img_url: String) {
    insert_mx_groups(
      objects: {
        title: $groupName
        bg_img_url: $bg_img_url
        users: { data: { status: "organizer" } }
        boards: {
          data: [
            {
              title: "제안 게시판"
              body: "제안 게시판입니다"
              type: "suggestion"
            }
            { title: "소식 게시판", body: "소식 게시판입니다", type: "notice" }
          ]
        }
      }
    ) {
      returning {
        id
      }
    }
  }
`;
export const insertBoard = gql`
  mutation($title: String!, $body: String!, $group_id: Int!, $type: String!) {
    insert_mx_boards(
      objects: { group_id: $group_id, body: $body, title: $title, type: $type }
    ) {
      returning {
        id
      }
    }
  }
`;
export const updateBoard = gql`
  mutation($title: String!, $body: String!, $id: Int!) {
    update_mx_boards(
      _set: { body: $body, title: $title }
      where: { id: { _eq: $id } }
    ) {
      affected_rows
    }
  }
`;
export const updateUserGroupCheck = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    update_mx_users_group(
      _inc: { count_click: 1 }
      where: {
        _and: [{ group_id: { _eq: $group_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
  }
`;
export const updateUserBoardCheck = gql`
  mutation($board_id: Int!, $user_id: Int!) {
    update_mx_users_board(
      _inc: { count_click: 1 }
      where: {
        _and: [{ board_id: { _eq: $board_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
  }
`;
export const insertUserBoardCheck = gql`
  mutation($board_id: Int!) {
    insert_mx_users_board(objects: { count_click: 1, board_id: $board_id }) {
      affected_rows
    }
  }
`;
export const updateBoardPermission = gql`
  mutation($board_id: Int!, $permission: String!) {
    update_mx_boards(
      where: { id: { _eq: $board_id } }
      _set: { permission: $permission }
    ) {
      affected_rows
    }
  }
`;
export const deleteBoard = gql`
  mutation($board_id: Int!) {
    delete_mx_boards(where: { id: { _eq: $board_id } }) {
      affected_rows
    }
  }
`;
export const setOrganizer = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    update_mx_users_group(
      where: {
        _and: [{ user_id: { _eq: $user_id } }, { group_id: { _eq: $group_id } }]
      }
      _set: { status: "organizer" }
    ) {
      affected_rows
    }
  }
`;
export const deleteUserGroup = gql`
  mutation($group_id: Int!, $user_id: Int!) {
    delete_mx_users_group(
      where: {
        _and: [{ user_id: { _eq: $user_id } }, { group_id: { _eq: $group_id } }]
      }
    ) {
      affected_rows
    }
  }
`;
export const updateLastPostedAt = gql`
  mutation($group_id: Int!, $board_id: Int!, $time: String!) {
    update_mx_boards(
      _set: { last_posted_at: $time }
      where: { id: { _eq: $board_id } }
    ) {
      affected_rows
    }
    update_mx_groups(
      _set: { last_posted_at: $time }
      where: { id: { _eq: $group_id } }
    ) {
      affected_rows
    }
  }
`;

export const announcePost = gql`
  mutation($id: Int!) {
    update_mx_posts(
      where: { id: { _eq: $id } }
      _append: { metadata: { announcement: true } }
    ) {
      affected_rows
    }
  }
`;

export const denouncePost = gql`
  mutation($id: Int!) {
    update_mx_posts(
      where: { id: { _eq: $id } }
      _delete_key: { metadata: "announcement" }
    ) {
      affected_rows
    }
  }
`;
export const incrementUserPostCheck = gql`
  mutation($post_id: Int!, $user_id: Int!) {
    update_mx_users_post(
      _inc: { view_count: 1 }
      where: {
        _and: [{ post_id: { _eq: $post_id } }, { user_id: { _eq: $user_id } }]
      }
    ) {
      affected_rows
    }
    insert_mx_users_post(
      objects: { view_count: 1, post_id: $post_id }
      on_conflict: { update_columns: [], constraint: users_post_pkey }
    ) {
      affected_rows
    }
  }
`;
