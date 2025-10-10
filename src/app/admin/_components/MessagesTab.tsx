import { useInfiniteMessageQuery } from "@/lib/api/queries/messageQueries";
import React from "react";
import { formatDistanceToNow } from "date-fns";

export const MessagesTab = () => {
  const {
    messages,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    error,
    hasNextPage,
  } = useInfiniteMessageQuery();

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Messages list */}
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={message.id || index}
            className="border border-gray-200 shadow-sm bg-white rounded-xl p-4 hover:shadow-md transition-all duration-200"
          >
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
            <p className="text-gray-700 leading-relaxed border-t border-gray-100 pt-2">
              {message.message}
            </p>

            {/* Footer / tags */}
            <div className="mt-3 flex flex-row justify-between text-xs text-gray-400">
              {message.done ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                  Resolved
                </span>
              ) : (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs">
                  Pending
                </span>
              )}
              {message.privateNote && (
                <span className="italic text-gray-500">
                  Note: {message.privateNote}
                </span>
              )}
            </div>
          </div>
        ))
      ) : (
        !isLoading && <p className="text-gray-500 text-center">No messages yet.</p>
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

        {!hasNextPage && !isFetchingNextPage && !isLoading && messages.length > 0 && (
          <p className="text-gray-400 text-sm text-center mt-2">
            — No more messages —
          </p>
        )}
      </div>
    </div>
  );
};
