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
      nodes {
        created_at
        user {
          name
        }
      }
    }
  }
`;
