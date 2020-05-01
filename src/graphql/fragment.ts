import gql from "graphql-tag";
export const commentsResult = gql`
  fragment comments_result on mx_comments {
    id
    body
    updated_at
    user {
      name
      photo_url
      checkedPosts(where: { post_id: { _eq: $id }, like_count: { _gt: 0 } }) {
        like_count
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
    }
  }
`;
export const noticeCommentsResult = gql`
  fragment notice_comments_result on mx_comments {
    id
    body
    updated_at
    user {
      name
      photo_url
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
    }
  }
`;
export const postResult = gql`
  fragment post_result on mx_posts {
    title
    body
    context
    metadata
    created_at
    updated_at
    id
    users(where: { user_id: { _eq: $userId } }) {
      like_count
      updated_at
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
`;
