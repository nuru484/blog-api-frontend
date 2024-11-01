// PostsList.jsx
import { useState } from 'react';
import { Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import { deletePostRequest, publishPostRequest } from '@/api/postsFetch';
import useAuth from '@/hooks/useAuth';
import { SuccessAlert } from './SuccessAlert';
import PostForm from './PostForm';
import usePostForm from '@/hooks/usePostForm';

const PostsList = ({ posts, setPosts }) => {
  const [displayPostContent, setDisplayPostContent] = useState({});
  const [alert, setAlert] = useState({ show: false, message: '' });
  const [editingPost, setEditingPost] = useState(null);

  const { accessToken } = useAuth();

  // Initialize the form hook for editing
  const formProps = usePostForm(editingPost, () => setEditingPost(null));

  const handleDisplayPostContent = (postId) => {
    setDisplayPostContent((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleDeletePost = async (postId) => {
    const response = await deletePostRequest(postId, accessToken);

    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== response.post.id)
    );

    setAlert({
      show: true,
      message: response.message,
    });
  };

  const handlePostPublish = async (postId) => {
    const response = await publishPostRequest(postId, accessToken);
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== response.post.id)
    );

    setAlert({
      show: true,
      message: response.message,
    });
  };

  return (
    <>
      <SuccessAlert
        show={alert.show}
        message={alert.message}
        onClose={() => setAlert({ show: false, message: '' })}
      />

      {editingPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto">
            <PostForm
              {...formProps}
              isEditing={true}
              onCancel={() => setEditingPost(null)}
            />
          </div>
        </div>
      )}

      <div>
        {posts &&
          posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="my-2 p-4 rounded-lg bg-blue-100">
              <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                <div className="flex space-x-2">
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => handleDisplayPostContent(post.id)}
                  >
                    {displayPostContent[post.id] ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>

                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => setEditingPost(post)}
                  >
                    <Edit size={20} />
                  </button>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash2 size={20} />
                  </button>

                  {post.published === true && (
                    <button className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600">
                      Unpublish
                    </button>
                  )}

                  {post.published === false && (
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                      onClick={() => handlePostPublish(post.id)}
                    >
                      Publish
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

              {displayPostContent[post.id] && (
                <div className="mt-4 p-4 bg-gray-50 rounded">
                  <p className="text-gray-700 mb-2">{post.content}</p>
                </div>
              )}
            </div>
          ))}

        {(!posts || posts.length === 0) && (
          <div className="flex justify-center items-center">
            <p className="text-xl text-center">
              There are no articles at the moment!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostsList;
