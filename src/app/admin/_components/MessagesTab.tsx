import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Message } from "@/types/message";
import { useInfiniteMessageQuery } from "@/lib/client/apiQueries/messageQueries";
import {
  deleteMessage,
  doneMessage,
  notDoneMessage,
} from "@/lib/client/apiEndpoints/messageEndpoints";
export const MessagesTab = () => {
  const {
    messages,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
  } = useInfiniteMessageQuery();

  // local messages state to allow optimistic updates
  const [localMessages, setLocalMessages] = useState(messages);

  // sync messages from query when they change
  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  // handle mark as done from child
  const handleMarkDone = (id: string) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: true } : m))
    );
  };

  const handleMarkNotDone = (id: string) => {
    setLocalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, done: false } : m))
    );
  };

  const handleDelete = (id: string) => {
    setLocalMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Messages list */}
      {localMessages.length > 0
        ? localMessages.map((message, index) => (
            <MessageComponent
              key={message.id || index}
              message={message}
              onMarkDone={handleMarkDone}
              onDelete={handleDelete}
              onMarkNotDone={handleMarkNotDone}
            />
          ))
        : !isLoading && (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
      {/* Pagination controls */}
      <div className="w-full flex flex-row justify-center items-center mt-4">
        {hasNextPage && !isFetchingNextPage && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow-sm transition-all"
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}

        {(isLoading || isFetchingNextPage) && (
          <p className="text-gray-500 animate-pulse">Loading...</p>
        )}

        {error && <p className="text-red-500">{error.message}</p>}

        {!hasNextPage &&
          !isFetchingNextPage &&
          !isLoading &&
          messages.length > 0 && (
            <p className="text-gray-400 text-sm text-center mt-2">
              — No more messages —
            </p>
          )}
      </div>
    </div>
  );
};
const MessageComponent = ({
  message,
  onMarkDone,
  onDelete,
  onMarkNotDone,
}: {
  message: Message;
  onMarkDone: (id: string) => void; // now includes "done" state
  onMarkNotDone: (id: string) => void; // now includes "done" state
  onDelete: (id: string) => void;
}) => {
  const [loading, setLoading] = useState<"done" | "undone" | "delete" | null>(
    null
  );

  // --- HANDLERS ---
  const handleMarkAsDone = async () => {
    setLoading("done");
    try {
      await doneMessage(message.id);
      onMarkDone(message.id);
    } finally {
      setLoading(null);
    }
  };

  const handleUndo = async () => {
    setLoading("undone");
    try {
      await notDoneMessage(message.id);
      onMarkNotDone(message.id);
    } finally {
      setLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setLoading("delete");
    try {
      await deleteMessage(message.id);
      onDelete(message.id);
    } finally {
      setLoading(null);
    }
  };

  // --- RENDER ---
  return (
    <div className="border border-gray-200 shadow-sm bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {message.subject || "No Subject"}
          </h2>
          <p className="text-sm text-gray-500">
            From: <span className="font-medium">{message.name}</span> (
            {message.email})
          </p>
        </div>

        {message.createdAt && (
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(message.createdAt, { addSuffix: true })}
          </p>
        )}
      </div>

      {/* Message content */}
      <p className="text-gray-700 leading-relaxed border-t border-gray-100 pt-2 whitespace-pre-wrap">
        {message.message}
      </p>

      {/* Footer */}
      <div className="mt-3 flex justify-between items-center text-xs text-gray-400">
        <div className="flex items-center gap-2">
          {loading ? (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs animate-pulse">
              {loading === "delete"
                ? "Deleting..."
                : loading === "done"
                ? "Marking..."
                : "Undoing..."}
            </span>
          ) : message.done ? (
            <>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                ✅ Resolved
              </span>
              <button
                onClick={handleUndo}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md text-xs font-medium transition-all"
              >
                Undo
              </button>
            </>
          ) : (
            <button
              onClick={handleMarkAsDone}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-medium transition-all"
            >
              Mark as Done
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
  {message.privateNote && (
    <span className="italic text-gray-500 text-xs">
      Note: {message.privateNote}
    </span>
  )}

  {loading === "delete" ? (
    <span className="text-yellow-600 animate-pulse">Deleting...</span>
  ) : (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 transition-all"
    >
      🗑️ Delete
    </button>
  )}
</div>

      </div>
    </div>
  );
};
