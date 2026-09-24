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
        <h2 id="comments-heading" className="text-xl font-bold text-slate-900 dark:text-white">
          Comments <span className="text-sm font-normal text-slate-500 dark:text-zinc-500">({comments.length})</span>
        </h2>
      </div>
      {mounted && user ? (
        <form onSubmit={submit} className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="comment" className="sr-only">Write a comment</label>
          <textarea
            id="comment"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={`Comment as ${user.name}...`}
            maxLength={500}
            rows={3}
            className="min-h-20 flex-1 resize-y rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-slate-900 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-emerald-500 transition-colors"
          />
          <Button type="submit" size="sm" icon={<Send className="h-4 w-4" />}>Post</Button>
        </form>
      ) : mounted ? (
        <p className="mt-4 text-sm text-slate-500 dark:text-zinc-400">
          <button onClick={() => router.push("/auth")} className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">Sign in</button> to join the conversation.
        </p>
      ) : null}
      <div className="mt-6 space-y-3">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/50 p-4 shadow-sm dark:shadow-none transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center justify-center border border-emerald-500/20">
                  {comment.userName.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{comment.userName}</p>
              </div>
              <div className="flex items-center gap-3">
                <time className="text-xs text-slate-400 dark:text-zinc-500" dateTime={comment.createdAt}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
                {user?.id === comment.userId && (
                  <button
                    onClick={() => remove(comment.id)}
                    aria-label="Delete comment"
                    className="text-slate-400 hover:text-rose-500 dark:text-zinc-500 dark:hover:text-rose-400 transition-colors p-1"
                    title="Delete your comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <p className="mt-2.5 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-zinc-300">{comment.text}</p>
          </article>
        ))}
        {mounted && comments.length === 0 && (
          <p className="mt-5 text-sm text-slate-500 dark:text-zinc-500">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </section>
  );
}
