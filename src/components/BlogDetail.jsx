import { ArrowLeft } from 'lucide-react';
import LikeIcon from './LikeIcon';
import CommentIcon from './CommentIcon';
import useCreateComment from '@/hooks/useCreateComment';
import Comments from './Comments';
import useLikes from '@/hooks/useLikes';
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '@/lib/cookies';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const BlogDetail = ({
  date,
  title,
  content,
  tags,
  author,
  handleViewBlogCard,
  post,
}) => {
  const [displayCommentForm, setDisplayCommentForm] = useState(false);
  const CreateComment = useCreateComment(post.id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postLiked, setPostLiked] = useState(false);

  const { likePost, unlikePost } = useLikes();
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      const hasLiked = post.likes.some((like) => like.userId === authUser.id);
      setPostLiked(hasLiked);
    } else {
      const guestName = getCookie('guestName');
      const hasLiked = post.likes.some((like) => like.guestName === guestName);
      setPostLiked(hasLiked);
    }
  }, [post.likes, authUser]);

  const handlePostLike = () => {
    const userId = authUser && authUser.id;

    if (postLiked) {
      authUser ? unlikePost(post.id, userId) : unlikePost(post.id);
      setPostLiked(false);
    } else {
      authUser ? likePost(post.id, userId) : likePost(post.id);
      setPostLiked(true);
    }
  };

  const handleLoginNavigate = () => {
    navigate('/login');
    setDisplayCommentForm(true);
  };

  const handleDisplayCommentForm = () => {
    authUser
      ? setDisplayCommentForm(!displayCommentForm)
      : setIsDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-md shadow-md p-4 md:p-8 lg:p-12 mb-4">
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

      <div className="text-sm mb-4 text-gray-600 leading-relaxed">
        {content}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handleViewBlogCard}
          className="text-blue-600 text-sm font-medium flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Show less
        </button>
        <div className="flex justify-center items-center space-x-4">
          <CommentIcon
            comments={post.comments.length}
            handleCommentForm={handleDisplayCommentForm}
          />
          <LikeIcon likes={post.likes.length} handleLike={handlePostLike} />
        </div>
      </div>

      {displayCommentForm ? CreateComment : ''}

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-blue-600 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              You are not logged in!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-blue-100">
              Please login to comment on articles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-blue-500 text-white hover:bg-blue-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLoginNavigate}
              className="bg-white text-blue-600 hover:bg-blue-100"
            >
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Comments comments={post.comments} />
    </div>
  );
};

export default BlogDetail;
