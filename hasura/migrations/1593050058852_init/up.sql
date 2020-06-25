CREATE SCHEMA mx;
CREATE FUNCTION mx.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public.board_new_post_count (
    board_id integer,
    new_count bigint
);
CREATE FUNCTION public.get_new_post_count(groupid integer, userid integer) RETURNS SETOF public.board_new_post_count
    LANGUAGE sql STABLE
    AS $$
select 
    mx.boards.id as board_id, 
    count(*) as new_count 
from mx.boards
inner join mx.posts 
    on mx.boards.id = mx.posts.board_id 
left join mx.users_post 
    on mx.users_post.user_id = userid and mx.users_post.post_id = mx.posts.id
where 
    mx.boards.group_id = groupid
    and (
        mx.users_post.user_id is null
        or mx.users_post.updated_at < mx.posts.updated_at
    )
group by mx.boards.id;
$$;
CREATE TABLE mx.boards (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    title text NOT NULL,
    body text NOT NULL,
    logo text,
    slug text,
    group_id integer NOT NULL,
    permission text DEFAULT 'member'::text NOT NULL,
    type text DEFAULT 'suggestion'::text NOT NULL,
    last_posted_at timestamp with time zone
);
COMMENT ON TABLE mx.boards IS '게시판';
COMMENT ON COLUMN mx.boards.permission IS '"member" | "all"';
CREATE SEQUENCE mx.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.boards_id_seq OWNED BY mx.boards.id;
CREATE TABLE mx.candidates (
    id integer NOT NULL,
    body text NOT NULL,
    "order" integer,
    post_id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE mx.comments (
    id integer NOT NULL,
    user_id integer,
    body text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    parent_id integer,
    post_id integer
);
CREATE SEQUENCE mx.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.comments_id_seq OWNED BY mx.comments.id;
CREATE TABLE mx.comments_like (
    user_id integer NOT NULL,
    comment_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
COMMENT ON TABLE mx.comments_like IS '댓글 좋아요';
CREATE TABLE mx.groups (
    id integer NOT NULL,
    created_by integer,
    slug text,
    title text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    private boolean DEFAULT false NOT NULL,
    bg_img_url text,
    last_posted_at timestamp with time zone,
    updated_by integer
);
COMMENT ON TABLE mx.groups IS '그룹';
CREATE SEQUENCE mx.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.groups_id_seq OWNED BY mx.groups.id;
CREATE TABLE mx.posts (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by integer NOT NULL,
    updated_by integer NOT NULL,
    files jsonb,
    images jsonb,
    title text NOT NULL,
    board_id integer NOT NULL,
    body text,
    metadata jsonb DEFAULT jsonb_build_object() NOT NULL,
    context text,
    conclusion text,
    last_commented_at timestamp with time zone,
    closed_at timestamp with time zone
);
COMMENT ON TABLE mx.posts IS 'suggestions 테이블 대체';
COMMENT ON COLUMN mx.posts.files IS '파일';
COMMENT ON COLUMN mx.posts.images IS '이미지';
COMMENT ON COLUMN mx.posts.closed_at IS '종료일';
CREATE SEQUENCE mx.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.posts_id_seq OWNED BY mx.posts.id;
CREATE TABLE mx.reports (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL,
    type text DEFAULT 'post'::text NOT NULL,
    type_id integer NOT NULL,
    body text NOT NULL
);
COMMENT ON TABLE mx.reports IS '신고';
CREATE SEQUENCE mx.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.reports_id_seq OWNED BY mx.reports.id;
CREATE TABLE mx.users (
    id integer NOT NULL,
    email text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name text,
    firebase_uid text,
    photo_url text,
    term_service timestamp with time zone,
    term_privacy timestamp with time zone,
    push_tokens jsonb,
    deleted_at timestamp with time zone
);
CREATE TABLE mx.users_board (
    user_id integer NOT NULL,
    board_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    count_click integer DEFAULT 0 NOT NULL
);
COMMENT ON TABLE mx.users_board IS '유저가 게시판 마지막 확인 시간';
CREATE TABLE mx.users_candidates (
    user_id integer NOT NULL,
    candidate_id integer NOT NULL,
    count integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE mx.users_group (
    user_id integer NOT NULL,
    group_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    status text DEFAULT 'user'::text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    count_click integer DEFAULT 0 NOT NULL,
    notification_type text
);
COMMENT ON TABLE mx.users_group IS '유저가 가입된 그룹';
COMMENT ON COLUMN mx.users_group.status IS '오거나이저면 organizer, 유저면 user';
COMMENT ON COLUMN mx.users_group.count_click IS '클릭카운트';
COMMENT ON COLUMN mx.users_group.notification_type IS 'all, related, mine, null 4종류';
CREATE SEQUENCE mx.users_group_count_click_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.users_group_count_click_seq OWNED BY mx.users_group.count_click;
CREATE SEQUENCE mx.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.users_id_seq OWNED BY mx.users.id;
CREATE TABLE mx.users_post (
    user_id integer NOT NULL,
    post_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    like_count integer DEFAULT 0 NOT NULL,
    view_count integer DEFAULT 0 NOT NULL
);
COMMENT ON TABLE mx.users_post IS '포스트에 대한 좋아요 (예: 제안 동의)';
COMMENT ON COLUMN mx.users_post.like_count IS '좋아요 수';
COMMENT ON COLUMN mx.users_post.view_count IS '조회수';
CREATE SEQUENCE mx.vote_candidates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE mx.vote_candidates_id_seq OWNED BY mx.candidates.id;
ALTER TABLE ONLY mx.boards ALTER COLUMN id SET DEFAULT nextval('mx.boards_id_seq'::regclass);
ALTER TABLE ONLY mx.candidates ALTER COLUMN id SET DEFAULT nextval('mx.vote_candidates_id_seq'::regclass);
ALTER TABLE ONLY mx.comments ALTER COLUMN id SET DEFAULT nextval('mx.comments_id_seq'::regclass);
ALTER TABLE ONLY mx.groups ALTER COLUMN id SET DEFAULT nextval('mx.groups_id_seq'::regclass);
ALTER TABLE ONLY mx.posts ALTER COLUMN id SET DEFAULT nextval('mx.posts_id_seq'::regclass);
ALTER TABLE ONLY mx.reports ALTER COLUMN id SET DEFAULT nextval('mx.reports_id_seq'::regclass);
ALTER TABLE ONLY mx.users ALTER COLUMN id SET DEFAULT nextval('mx.users_id_seq'::regclass);
ALTER TABLE ONLY mx.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.comments_like
    ADD CONSTRAINT comments_like_pkey PRIMARY KEY (user_id, comment_id);
ALTER TABLE ONLY mx.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.users_board
    ADD CONSTRAINT users_board_pkey PRIMARY KEY (user_id, board_id);
ALTER TABLE ONLY mx.users_candidates
    ADD CONSTRAINT users_candidates_pkey PRIMARY KEY (user_id, candidate_id);
ALTER TABLE ONLY mx.users_group
    ADD CONSTRAINT users_group_pkey PRIMARY KEY (user_id, group_id);
ALTER TABLE ONLY mx.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY mx.users_post
    ADD CONSTRAINT users_post_pkey PRIMARY KEY (user_id, post_id);
ALTER TABLE ONLY mx.candidates
    ADD CONSTRAINT vote_candidates_pkey PRIMARY KEY (id);
CREATE TRIGGER set_mx_boards_updated_at BEFORE UPDATE ON mx.boards FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_boards_updated_at ON mx.boards IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_comments_updated_at BEFORE UPDATE ON mx.comments FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_comments_updated_at ON mx.comments IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_groups_updated_at BEFORE UPDATE ON mx.groups FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_groups_updated_at ON mx.groups IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_posts_like_updated_at BEFORE UPDATE ON mx.users_post FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_posts_like_updated_at ON mx.users_post IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_posts_updated_at BEFORE UPDATE ON mx.posts FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_posts_updated_at ON mx.posts IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_reports_updated_at BEFORE UPDATE ON mx.reports FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_reports_updated_at ON mx.reports IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_users_board_check_updated_at BEFORE UPDATE ON mx.users_board FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_users_board_check_updated_at ON mx.users_board IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_users_group_updated_at BEFORE UPDATE ON mx.users_group FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_users_group_updated_at ON mx.users_group IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_mx_users_updated_at BEFORE UPDATE ON mx.users FOR EACH ROW EXECUTE PROCEDURE mx.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_mx_users_updated_at ON mx.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY mx.boards
    ADD CONSTRAINT boards_group_id_fkey FOREIGN KEY (group_id) REFERENCES mx.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.candidates
    ADD CONSTRAINT candidates_post_id_fkey FOREIGN KEY (post_id) REFERENCES mx.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.candidates
    ADD CONSTRAINT candidates_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.comments
    ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES mx.comments(id);
ALTER TABLE ONLY mx.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES mx.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.comments
    ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.posts
    ADD CONSTRAINT posts_board_id_fkey FOREIGN KEY (board_id) REFERENCES mx.boards(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.posts
    ADD CONSTRAINT posts_created_by_fkey FOREIGN KEY (created_by) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.posts
    ADD CONSTRAINT posts_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.users_board
    ADD CONSTRAINT users_board_board_id_fkey FOREIGN KEY (board_id) REFERENCES mx.boards(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.users_board
    ADD CONSTRAINT users_board_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.users_candidates
    ADD CONSTRAINT users_candidates_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES mx.candidates(id);
ALTER TABLE ONLY mx.users_candidates
    ADD CONSTRAINT users_candidates_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.users_group
    ADD CONSTRAINT users_group_group_id_fkey FOREIGN KEY (group_id) REFERENCES mx.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.users_group
    ADD CONSTRAINT users_group_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
ALTER TABLE ONLY mx.users_post
    ADD CONSTRAINT users_post_post_id_fkey FOREIGN KEY (post_id) REFERENCES mx.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY mx.users_post
    ADD CONSTRAINT users_post_user_id_fkey FOREIGN KEY (user_id) REFERENCES mx.users(id);
