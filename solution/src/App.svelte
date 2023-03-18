<script lang="ts">
  import { data } from "./lib/stores";
  import "./app.css";
  import Comment from "./lib/Comment.svelte";
  import CreateCommentForm from "./lib/CreateCommentForm.svelte";
  $: user = $data.currentUser;
  $: comments = $data.comments;
</script>

<div class="min-h-screen flex flex-col p-4 gap-4 justify-center items-center bg-neutral-100">
  <div class="max-w-xl w-full space-y-4">
    {#each comments as comment (comment.id)}
      <Comment
        on:delete={(e) => data.deleteComment(e.detail, comments)}
        on:edit={(e) => data.editComment(comment.id, e.detail, comments)}
        on:upvote={(e) => data.upvoteComment(e.detail, comments)}
        on:downvote={(e) => data.downvoteComment(e.detail, comments)}
        user={comment.user}
        id={comment.id}
        commentId={comment.id}
        currentUser={user}
        content={comment.content}
        createdAt={comment.createdAt}
        score={comment.score}
      />
      {#if comment.replies.length > 0}
        <div class="pl-2 sm:pl-8">
          <div class="pl-2 sm:pl-8 border-l-2 space-y-4">
            {#each comment.replies as reply (reply.id)}
              <Comment
                user={reply.user}
                id={reply.id}
                commentId={comment.id}
                content={reply.content}
                createdAt={reply.createdAt}
                score={reply.score}
                currentUser={user}
                on:delete={(e) => data.deleteReply(comment.id, e.detail, comments)}
                on:edit={(e) => data.editReply(comment.id, reply.id, e.detail, comments)}
                on:upvote={(e) => data.upvoteReply(comment.id, e.detail, comments)}
                on:downvote={(e) => data.downvoteReply(comment.id, e.detail, comments)}
              />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <CreateCommentForm {user} />
</div>
