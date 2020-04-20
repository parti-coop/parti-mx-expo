import gql from "graphql-tag";
export const whoami = gql`
  subscription($email: String!) {
    parti_2020_users(where: { email: { _eq: $email } }) {
      id
    }
  }
`;

export const subscribeGroupsByUserId = gql`
  subscription($user_id: Int!) {
    parti_2020_users_group(where: { user_id: { _eq: $user_id } }) {
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

export const subscribepostsByBoardId = gql`
  subscription($id: Int!, $userId: Int!) {
    parti_2020_boards_by_pk(id: $id) {
      id
      body
      title
      slug
      posts(order_by: { updated_at: desc }) {
        title
        body
        context
        metadata
        created_at

        id
        likes(where: { user_id: { _eq: $userId } }) {
          count
        }
        likes_aggregate {
          aggregate {
            sum {
              count
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
    parti_2020_posts_by_pk(id: $id) {
      id
      title
      body
      context
      metadata
      images
      files
      updatedBy {
        name
        photo_url
      }
      createdBy {
        name
        photo_url
      }
      comments(order_by: { created_at: asc }) {
        id
        body
        updated_at
        user {
          name
          photo_url
          likedPosts(where: { post_id: { _eq: $id } }) {
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
            created_at
            user {
              name
            }
          }
        }
      }
      created_at
      updated_at
      likes_aggregate {
        aggregate {
          sum {
            count
          }
        }
        nodes {
          created_at
          user {
            photo_url
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
        is_member_only
        type
        updated_at
        last_posted_at
        usersBoardCheck(where: { user_id: { _eq: $user_id } }) {
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
