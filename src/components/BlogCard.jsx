import { ArrowRight } from 'lucide-react';
import LikeIcon from './LikeIcon';
import CommentIcon from './CommentIcon';

const BlogCard = ({
  date,
  title,
  excerpt,
  tag,
  handleViewBlogDetail,
  post,
}) => {
  return (
    <div
      onClick={handleViewBlogDetail}
      className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
    >
      <div className="mb-2 flex justify-between items-center">
        <span
          className={`text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-800`}
        >
          {tag}
        </span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <h2 className="text-xl font-bold mb-2 leading-tight text-gray-800">
        {title}
      </h2>
      <p className="text-sm mb-4 text-gray-600 leading-relaxed">{excerpt}...</p>
      <div className="flex justify-between items-center">
        <button className="text-blue-600 text-sm font-medium flex items-center">
          Read more <ArrowRight size={16} className="ml-1" />
        </button>
        <div className="flex justify-center items-center space-x-4">
          <CommentIcon comments={post.comments.length} />
          <LikeIcon likes={post.likes.length} />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
