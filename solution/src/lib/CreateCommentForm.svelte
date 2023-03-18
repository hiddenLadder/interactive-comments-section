<script lang="ts">
  import Avatar from "./Avatar.svelte";
  import { data } from "./stores";
  import moment from "moment";
  import type { User } from "../index";
  export let user: User;
  let comment = "";
  let loading = false;
  async function createComment() {
    loading = true;
    await new Promise((res) => setTimeout(res, 500));
    if (comment) {
      $data.comments.push({
        id: moment().unix(),
        content: comment,
        createdAt: moment.duration().humanize().toString(),
        replies: [],
        score: 0,
        user,
      });
      $data.comments = $data.comments;
    }
    comment = "";
    loading = false;
  }
</script>

<div class="max-w-xl w-full bg-white p-4 rounded-lg">
  <form on:submit|preventDefault={createComment} class="flex flex-wrap justify-between sm:flex-nowrap items-start gap-4">
    <Avatar classes="order-2 sm:order-none" src={user.image.png} />
    <div class="w-full sm:flex-grow order-1 sm:order-none">
      <textarea
        bind:value={comment}
        name="comment"
        id="comment"
        class="w-full border text-sm rounded-md p-2 px-4 focus:outline-primary-blue"
        placeholder="Add a comment..."
        rows="3"
      />
    </div>
    <button
      disabled={loading}
      class="uppercase order-2 sm:order-none py-2 px-6 disabled:opacity-25 bg-primary-blue text-white rounded-md text-sm">Send</button
    >
  </form>
</div>
