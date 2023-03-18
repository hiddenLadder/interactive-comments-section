<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { data, isBeingReplied } from "./stores";
  import moment from "moment";
  import type { User } from "../index";
  export let user: User;
  export let commentId: number;
  export let replyingTo: string;
  let comment = `@${replyingTo}, `;
  let loading = false;
  async function createReply() {
    loading = true;
    await new Promise((res) => setTimeout(res, 500));
    if (comment) {
      const comm = $data.comments.find((c) => c.id === commentId);
      comm.replies.push({
        id: moment().unix(),
        content: comment,
        createdAt: moment.duration().humanize().toString(),
        replyingTo,
        score: 0,
        user,
      });
      $data.comments[$data.comments.indexOf(comm)] = comm;
    }
    comment = "";
    $isBeingReplied = null;
    loading = false;
  }
</script>

<div class="max-w-xl w-full bg-white p-4 rounded-lg">
  <form on:submit|preventDefault={createReply} class="flex items-start gap-4">
    <Avatar src={user.image.png} />
    <div class="flex-grow">
      <textarea
        bind:value={comment}
        name="comment"
        id="comment"
        class="w-full border text-sm rounded-md p-2 px-4 focus:outline-primary-blue"
        placeholder="Add a comment..."
        rows="3"
      />
    </div>
    <button disabled={loading} class="uppercase py-2 px-6 disabled:opacity-25 bg-primary-blue text-white rounded-md text-sm">Send</button>
  </form>
</div>
