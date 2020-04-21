export type Board = {
  id: number;
  title: string;
  body: string;
  permission: string;
  type: string;
  updated_at: string;
  last_posted_at: string;
  usersBoardCheck: Array<{ updated_at: string }>;
};

export interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user?: { name: string; likes: [{ count: number }]; photo_url: string };
  createdBy?: { name: string; likedPosts: [{ count: number }]; photo_url: string };
  likes: [
    {
      user: {
        name: string;
      };
    }
  ];
  likes_aggregate: {
    aggregate: {
      count: number;
    };
    nodes: {
      user: {
        name: string;
      };
    };
  };
}

export type Suggestion = {
  id: number;
  title: string;
  body: string;
  metadata: { closed_at: string; closing_method: number };
  created_at: string;
  likes_aggregate: {
    aggregate: {
      sum: {
        count: number;
      };
    };
  };
  likes: Array<{ count: number }>;
  updatedBy: {
    name: string;
  };
  comments_aggregate: {
    aggregate: {
      count: number;
    };
  };
};
