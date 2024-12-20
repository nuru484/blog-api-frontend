import { MessageSquare } from 'lucide-react';

const CommentIcon = ({ comments, handleCommentForm }) => {
  return (
    <div onClick={handleCommentForm} className="flex items-center gap-2">
      <MessageSquare className="w-4 h-4 cursor-pointer" />
      <span className="text-sm">{comments}</span>
    </div>
  );
};

export default CommentIcon;
