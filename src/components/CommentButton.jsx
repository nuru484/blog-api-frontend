import { MessageSquare } from 'lucide-react';

const CommentButton = () => {
  return (
    <div className="flex items-center space-x-1">
      <MessageSquare className="w-4 h-4 cursor-pointer" />
      <span className="text-sm">34</span>
    </div>
  );
};

export default CommentButton;
