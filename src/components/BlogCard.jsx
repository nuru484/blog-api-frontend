import { ArrowRight, MessageSquare, ThumbsUp } from 'lucide-react';

const BlogCard = ({ date, title, excerpt, tag }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
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
    <p className="text-sm mb-4 text-gray-600 leading-relaxed">{excerpt}</p>
    <div className="flex justify-between items-center">
      <button className="text-blue-600 text-sm font-medium flex items-center">
        Read more <ArrowRight size={16} className="ml-1" />
      </button>
      <div className="flex justify-center items-center space-x-4">
        <div className="flex items-center space-x-1">
          <MessageSquare className="w-4 h-4 cursor-pointer" />
          <span className="text-sm">34</span>
        </div>
        <div className="flex items-center space-x-1">
          <ThumbsUp className="w-4 h-4 cursor-pointer" />
          <span className="text-sm">34</span>
        </div>
      </div>
    </div>
  </div>
);

export default BlogCard;
