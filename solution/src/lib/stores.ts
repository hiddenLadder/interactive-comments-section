import { writable } from "svelte/store";
import type { Comment } from "../index";
import dataJson from "../data.json";

function createData() {
  const { subscribe, set, update } = writable(dataJson);
  function editComment(commentId: number, newContent: string, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    comment.content = newContent;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }

  function editReply(commentId: number, replyId: number, newContent: string, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    const reply = comment.replies.find((r) => r.id === replyId);
    reply.content = newContent;
    comment.replies[comment.replies.indexOf(reply)] = reply;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }

  function deleteComment(commentId: number, comments: Comment[]) {
    set({ ...dataJson, comments: comments.filter((comment) => comment.id !== commentId) });
  }

  function deleteReply(commentId: number, replyId: number, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    const newReplies = comment.replies.filter((reply) => reply.id !== replyId);
    comment.replies = newReplies;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }

  function upvoteComment(commentId: number, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    comment.score++;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }
  function upvoteReply(commentId: number, replyId: number, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    const reply = comment.replies.find((r) => r.id === replyId);
    reply.score++;
    comment.replies[comment.replies.indexOf(reply)] = reply;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }
  function downvoteComment(commentId: number, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    comment.score--;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }
  function downvoteReply(commentId: number, replyId: number, comments: Comment[]) {
    const comment = comments.find((c) => c.id === commentId);
    const reply = comment.replies.find((r) => r.id === replyId);
    reply.score--;
    comment.replies[comment.replies.indexOf(reply)] = reply;
    comments[comments.indexOf(comment)] = comment;
    set({ ...dataJson, comments });
  }

  return {
    subscribe,
    editComment,
    editReply,
    deleteComment,
    deleteReply,
    upvoteComment,
    downvoteComment,
    upvoteReply,
    downvoteReply,
    set,
    update,
  };
}

export const data = createData();
export const isBeingReplied = writable<number>(null);
