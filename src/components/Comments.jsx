import React from 'react';

const Comments = ({ comments }) => {
  if (!Array.isArray(comments) || comments.length === 0) {
    return <p className="my-4">No comments available for this post.</p>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="my-4 p-2 text-sm border rounded">
            <p>
              By{' '}
              <span className="font-bold">
                {comment.userId || comment.guestName}
              </span>{' '}
              on{' '}
              <span>{new Date(comment.createdAt).toLocaleString('en-US')}</span>
            </p>
            <p className="my-2 text-xs">
              {comment.content || 'No content provided.'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
