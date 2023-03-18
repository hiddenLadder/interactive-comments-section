<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { User } from "../index";
  import Avatar from "./Avatar.svelte";
  import ConfirmModal from "./ConfirmModal.svelte";
  import ReplyForm from "./ReplyForm.svelte";
  import { isBeingReplied } from "./stores";
  export let user: User;
  export let currentUser: User;
  export let id: number;
  export let commentId: number;
  export let content: string;
  export let createdAt: string;
  export let score: number;

  let value = false;
  let isBeingEdited = false;
  let voted = -1;

  const dispatch = createEventDispatcher();

  function save() {
    dispatch("edit", newContent);
    isBeingEdited = false;
  }

  $: newContent = content;
</script>

<div class="bg-white w-full rounded-lg text-sm p-4">
  <div class="flex flex-col sm:flex-row relative gap-4">
    <!-- Score -->
    <div class="h-fit px-4 sm:px-2 sm:h-24 w-fit p-2 order-2 sm:order-1 bg-neutral-100 rounded-lg flex sm:flex-col gap-2">
      <button
        disabled={voted === 1}
        on:click={() => {
          dispatch("upvote", id);
          voted = 1;
        }}
        class="text-primary-light-blue font-bold {voted !== 1 && 'hover:text-primary-blue'}">+</button
      >
      <p class="text-primary-blue font-bold">{score}</p>
      <button
        disabled={voted === 0}
        on:click={() => {
          dispatch("downvote", id);
          voted = 0;
        }}
        class="text-primary-light-blue font-bold {voted !== 0 && 'hover:text-primary-blue'}">-</button
      >
    </div>
    <!-- End Score -->

    <div class="flex order-1 flex-col gap-2 w-full">
      <!-- Avatar, nickname and date -->
      <div class="flex items-center gap-3">
        <Avatar src={user.image.png} />
        <p class="font-medium text-neutral-400">{user.username}</p>
        {#if user.username === currentUser.username}
          <p class="text-xs px-1.5 rounded bg-primary-blue text-neutral-50">you</p>
        {/if}
        <p class="text-neutral-300">{createdAt}</p>
      </div>
      <!-- End Avatar, nickname and date -->

      {#if isBeingEdited}
        <div class="">
          <textarea
            class="w-full border text-sm rounded-md p-2 px-4 focus:outline-primary-blue"
            bind:value={newContent}
            name="content"
            rows="3"
          />
          <div class="mt-2 flex justify-end">
            <button class="uppercase py-2 px-6 disabled:opacity-25 bg-primary-blue text-white rounded-md text-sm" on:click={save}
              >Update</button
            >
          </div>
        </div>
      {:else}
        <div class="text-neutral-300">{content}</div>
      {/if}
    </div>
    <!-- Actions -->
    <div class="absolute order-3 sm:order-2 bottom-2 right-0 sm:top-0 h-fit">
      <div class="flex gap-6 pr-2 items-start h-fit">
        {#if user.username === currentUser.username}
          <button
            disabled={isBeingEdited}
            on:click={() => (value = true)}
            class="inline-flex items-center gap-2 font-medium hover:opacity-25 disabled:opacity-25 text-primary-soft-red text-sm"
          >
            <img class="w-3" src="/icon-delete.svg" alt="" />
            Delete
          </button>

          <button
            disabled={isBeingEdited}
            on:click={() => (isBeingEdited = true)}
            class="inline-flex items-center gap-2 font-medium hover:opacity-25 disabled:opacity-25 text-primary-blue text-sm"
          >
            <img class="w-3" src="/icon-edit.svg" alt="" />
            Edit</button
          >
        {:else}
          <button
            on:click={() => ($isBeingReplied = id)}
            disabled={$isBeingReplied === id}
            class="inline-flex items-center gap-2 font-medium hover:opacity-25 disabled:opacity-25 text-primary-blue text-sm"
          >
            <img class="w-3" src="/icon-reply.svg" alt="" />
            Reply</button
          >
        {/if}
      </div>
    </div>
    <!-- End Actions -->
  </div>
</div>
{#if $isBeingReplied === id}
  <ReplyForm user={currentUser} {commentId} replyingTo={user.username} />
{/if}
<ConfirmModal bind:value label="Yes, delete" on:confirm={(e) => dispatch("delete", id)} title="Delete comment">
  Are you sure you want to delete this comment? This will remove the comment and can't be undone.
</ConfirmModal>
