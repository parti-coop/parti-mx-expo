export type Board = {
  id: number;
  title: string;
  body: string;
  permission: string;
  type: string;
  updated_at: string;
  last_posted_at: string;
  users: Array<{ updated_at: string }>;
};

export interface Comment {
  id: number;
  body: string;
  updated_at: string;
  user: {
    name: string;
    checkedPosts?: [{ count: number }];
    photo_url: string;
    id: number;
  };
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
  };
  re?: Comment[];
}

export type PostListType = {
  id: number;
  title: string;
  body: string;
  metadata: { closed_at: string; closingMethod: string };
  created_at: string;
  updated_at: string;
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
  users: Array<{ like_count: number; updated_at: string }>;
  updatedBy: {
    name: string;
  };
  createdBy: {
    name: string;
  };
  comments_aggregate: {
    aggregate: {
      count: number;
    };
  };
};
export type SuggestionListType = PostListType;
type VoteMetadata = {
  closed_at?: string;
  closingMethod: string;
  isBinary: boolean;
  isMultiple: boolean;
  isAnonymous: boolean;
};
export interface VoteListType extends PostListType {
  metadata: VoteMetadata;
}

export type User = {
  id?: number;
  name: string;
  photo_url: string;
};

export type PostDetailType = {
  id: number;
  title: string;
  body: string;
  metadata: any;
  images: any;
  files: any;
  updatedBy: User;
  createdBy: User;
  created_at: string;
  updated_at: string;
  comments: Comment[];
  meLiked: {
    like_count: number;
  }[];
  board: {
    title: string;
  };
};
export interface SuggestionDetailType extends PostDetailType {
  likedUsers: {
    created_at: string;
    user: User;
  }[];
  context: string;
}
export interface NoticeDetailType extends PostDetailType {
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
}
export type Candidate = {
  id: number;
  body: string;
  post: {
    id: number;
  };
  votes_aggregate: {
    aggregate: {
      sum: {
        count: number;
      };
    };
  };
  votes: [
    {
      count: number;
    }
  ];
};
export interface VoteDetailType extends PostDetailType {
  users_aggregate: {
    aggregate: {
      sum: {
        like_count: number;
      };
    };
  };
  candidates: Candidate[];
  metadata: VoteMetadata;
}

export type RecommentArgs = {
  id: number;
  user: Comment["user"];
  reUser?: Comment["user"];
};

export interface File {
  name: string;
  size: number;
  uri: string;
  lastModified?: number;
  file?: File;
}

export interface SearchResultType {
  id: number;
  title: string;
  created_at: string;
  createdBy: {
    id: number;
    name: string;
  };
  board: {
    type: string;
    title: string;
  };
}
