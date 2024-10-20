import { ArrowLeft } from 'lucide-react';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import useCreateComment from '@/hooks/createComment';
import Comments from './Comments';
import { useState } from 'react';

const BlogDetail = ({
  date,
  title,
  content,
  tags,
  author,
  handleViewBlogCard,
  post,
  updatePostLikes,
}) => {
  const [displayCommentForm, setDisplayCommentForm] = useState(false);
  const CreateComment = useCreateComment(post.id);

  const handleDisplayCommentForm = () => {
    displayCommentForm
      ? setDisplayCommentForm(false)
      : setDisplayCommentForm(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="mb-2 flex justify-between">
        <div className="flex flex-col">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs font-medium px-2 my-1 py-1 rounded bg-blue-100 text-blue-800`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 mb-2">{date}</span>
          <span className="text-xs text-gray-500">By {author}</span>
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
          <ArrowLeft size={16} className="mr-1" /> Show less
        </button>
        <div className="flex justify-center items-center space-x-4">
          <CommentButton
            comments={post.comments.length}
            handleCommentForm={handleDisplayCommentForm}
          />
          <LikeButton
            likes={post.likes.length}
            handleLike={() => updatePostLikes(post.id)}
          />
        </div>
      </div>

      {displayCommentForm ? CreateComment : ''}
      <Comments comments={post.comments} />
    </div>
  );
};

export default BlogDetail;
