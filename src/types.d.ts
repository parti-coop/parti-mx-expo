export type Board = {
  id: number;
  title: string;
  body: string;
  is_member_only: boolean;
  type: string;
  updated_at: string;
  last_posted_at: string;
  usersBoardCheck: Array<{ updated_at: string }>;
};

export interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user: { name: string; votes: [{ count: number }]; photo_url: string };
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
  closed_at: string;
  created_at: string;
  votes_aggregate: {
    aggregate: {
      sum: {
        count: number;
      };
    };
  };
  votes: Array<{ count: number }>;
  updatedBy: {
    name: string;
  };
  comments_aggregate: {
    aggregate: {
      count: number;
    };
  };
};
