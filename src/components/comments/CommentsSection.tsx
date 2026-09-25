"use client";

import { FormEvent, useEffect, useState } from "react";
import { MessageCircle, Send, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import type { Comment, CommentEntityType } from "@/types/comment";

const COMMENTS_KEY = "sportshub-comments";

function readComments(): Comment[] {
  try {
    const value = window.localStorage.getItem(COMMENTS_KEY);
    return value ? (JSON.parse(value) as Comment[]) : [];
  } catch {
    return [];
  }
}

export function CommentsSection({
  entityType,
  entityUuid,
}: {
  entityType: CommentEntityType;
  entityUuid: string;
}) {
  const router = useRouter();
  const { user, mounted } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const hydrationId = window.setTimeout(() => {
      setComments(readComments().filter(
        (comment) => comment.entityType === entityType && comment.entityUuid === entityUuid
      ));
    }, 0);
    return () => window.clearTimeout(hydrationId);
  }, [entityType, entityUuid]);

  const saveComments = (nextComments: Comment[]) => {
    window.localStorage.setItem(COMMENTS_KEY, JSON.stringify(nextComments));
    setComments(nextComments.filter(
      (comment) => comment.entityType === entityType && comment.entityUuid === entityUuid
    ));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user || !text.trim()) return;
    const nextComment: Comment = {
      id: crypto.randomUUID(),
      entityType,
      entityUuid,
      userId: user.id,
      userName: user.name,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };
    saveComments([...readComments(), nextComment]);
    setText("");
  };

  const remove = (id: string) => {
    saveComments(readComments().filter((comment) => comment.id !== id));
  };

  return (
    <section className="mt-10 border-t border-slate-200 pt-8 dark:border-zinc-800" aria-labelledby="comments-heading">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-emerald-500" />
        <h2 id="comments-heading" className="text-xl font-bold">Comments <span className="text-sm font-normal text-zinc-500">({comments.length})</span></h2>
      </div>
      {mounted && user ? (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="comment" className="sr-only">Write a comment</label>
          <textarea id="comment" value={text} onChange={(event) => setText(event.target.value)}
            placeholder="Share your thoughts..." maxLength={500} rows={3}
            className="min-h-20 flex-1 resize-y rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none focus:border-emerald-400" />
          <Button type="submit" size="sm" icon={<Send className="h-4 w-4" />}>Post</Button>
        </form>
      ) : mounted ? (
        <p className="mt-4 text-sm text-zinc-400">
          <button onClick={() => router.push("/auth")} className="font-semibold text-emerald-400 hover:text-emerald-300">Sign in</button> to join the conversation.
        </p>
      ) : null}
      <div className="mt-6 space-y-3">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold">{comment.userName}</p>
              <div className="flex items-center gap-3">
                <time className="text-xs text-zinc-500" dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleDateString()}</time>
                {user?.id === comment.userId && <button onClick={() => remove(comment.id)} aria-label="Delete comment" className="text-zinc-500 hover:text-rose-400"><Trash2 className="h-4 w-4" /></button>}
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-300">{comment.text}</p>
          </article>
        ))}
        {mounted && comments.length === 0 && <p className="mt-5 text-sm text-zinc-500">No comments yet. Be the first to share your thoughts.</p>}
      </div>
    </section>
  );
}
