import gql from "graphql-tag";
import { commentsResult, noticeCommentsResult } from "./fragment";
export const whoami = gql`
  subscription($email: String!) {
    mx_users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export const subscribeGroupsByUserId = gql`
  subscription($user_id: Int!) {
    mx_users_group(where: { user_id: { _eq: $user_id } }) {
      updated_at
      group {
        title
        id
        updated_at
        last_posted_at
      }
    }
  }
`;

export const subscribePostsByBoardId = gql`
  subscription($id: Int!, $userId: Int!) {
    mx_boards_by_pk(id: $id) {
      id
      body
      title
      slug
      posts_aggregate {
        aggregate {
          count
        }
      }
      posts(order_by: { updated_at: desc }, limit: 20) {
        title
        body
        context
        metadata
        created_at
        id
        users(where: { user_id: { _eq: $userId } }) {
          like_count
        }
        users_aggregate {
          aggregate {
            sum {
              like_count
            }
          }
        }
        comments_aggregate {
          aggregate {
            count
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
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        name
        photo_url
      }
      createdBy {
        name
        photo_url
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...comments_result
        re(order_by: { created_at: asc }) {
          ...comments_result
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } }) {
        like_count
      }
      likedUsers: users {
        created_at
        user {
          name
          photo_url
        }
      }
    }
  }
  ${commentsResult}
`;

export const subscribeNotice = gql`
  subscription($id: Int!, $user_id: Int!) {
    mx_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      board {
        title
      }
      updatedBy {
        name
        photo_url
      }
      createdBy {
        name
        photo_url
      }
      comments(
        order_by: { created_at: asc }
        where: { parent_id: { _is_null: true } }
      ) {
        ...notice_comments_result
        re(order_by: { created_at: asc }) {
          ...notice_comments_result
        }
      }
      created_at
      updated_at
      meLiked: users(where: { user_id: { _eq: $user_id } }) {
        like_count
      }
      users_aggregate {
        aggregate {
          sum {
            like_count
          }
        }
      }
    }
  }
  ${noticeCommentsResult}
`;

export const subscribeBoardsByGroupId = gql`
  subscription($group_id: Int!, $user_id: Int!) {
    mx_groups_by_pk(id: $group_id) {
      id
      title
      bg_img_url
      boards(
        order_by: {
          last_posted_at: desc_nulls_last
          updated_at: desc_nulls_last
        }
      ) {
        id
        title
        body
        permission
        type
        updated_at
        last_posted_at
        users(where: { user_id: { _eq: $user_id } }) {
          updated_at
        }
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

export const subscribeMemberCount = gql`
  subscription($group_id: Int!) {
    users: mx_users_group_aggregate(
      where: {
        _and: [{ group_id: { _eq: $group_id } }, { status: { _eq: "user" } }]
      }
    ) {
      aggregate {
        count
      }
    }
    organizers: mx_users_group_aggregate(
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
