CREATE TABLE mx.board_new_post_count (
    board_id integer,
    new_count bigint
);
CREATE FUNCTION mx.get_new_post_count 
(IN groupid int, IN userid int) 
RETURNS SETOF mx.board_new_post_count 
AS $$

select 
    mx.boards.id as board_id, 
    count(*) as new_count 
from mx.boards
left join mx.posts 
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

$$ LANGUAGE sql STABLE;