import { ArrowRight, MessageSquare, ThumbsUp } from 'lucide-react';

const BlogDetail = ({
  date,
  title,
  content,
  tags,
  author,
  handleViewBlogCard,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-2 flex justify-between ">
        <div className="flex flex-col">
          {tags.map((tag) => (
            <span
              key={tag.id}
              className={`text-xs font-medium px-2 my-1 py-1 rounded bg-blue-100 text-blue-800`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 mb-2">{date}</span>
          <span className="text-xs text-gray-500 ">By {author}</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 leading-tight text-gray-800">
        {title}
      </h2>
      <p className="text-sm mb-4 text-gray-600 leading-relaxed">{content}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleViewBlogCard}
          className="text-blue-600 text-sm font-medium flex items-center"
        >
          Show less <ArrowRight size={16} className="ml-1" />
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
};

export default BlogDetail;
