import { ThumbsUp } from 'lucide-react';

const LikeIcon = ({ likes, handleLike }) => {
  return (
    <div onClick={handleLike} className="flex items-center space-x-1">
      <ThumbsUp className="w-4 h-4 cursor-pointer" />
      <span className="text-sm">{likes}</span>
    </div>
  );
};

export default LikeIcon;
