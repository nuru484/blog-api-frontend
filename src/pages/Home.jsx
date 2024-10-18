import { Search, ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/loading';
import { fetchPublishedPosts } from '@/api/postsFetch';
import { handleAPIError } from '@/lib/errorHandler';
import BlogDetail from '@/components/BlogDetail';

const Home = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [viewBlogDetail, setViewBlogDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPublishedPosts();
        const fetchedPosts = response.publishPosts;
        setPosts(fetchedPosts);

        // Check if a post is saved in localStorage to maintain detail view
        const savedPost = JSON.parse(localStorage.getItem('selectedPost'));
        if (savedPost) {
          setSelectedPost(savedPost);
          setViewBlogDetail(true); // If a post is stored, show detail view
        }
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleViewBlogDetail = (post) => {
    setSelectedPost(post);
    setViewBlogDetail(true);
    localStorage.setItem('selectedPost', JSON.stringify(post));
  };

  const handleViewBlogCard = () => {
    setViewBlogDetail(false);
    setSelectedPost(null);
    localStorage.removeItem('selectedPost');
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen font-sans pb-16">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Afatech Blog
        </h1>
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </header>

      <main className="p-4">
        {loading && (
          <div className="flex items-center justify-center">
            <Loading height={24} width={24} color="#000020" />
          </div>
        )}

        {error && <p className="text-red-500">{error.message}</p>}

        {viewBlogDetail && selectedPost ? (
          <BlogDetail
            date={new Date(selectedPost.createdAt).toLocaleString('en-US')}
            handleViewBlogCard={handleViewBlogCard}
            title={selectedPost.title}
            content={selectedPost.content}
            tag={
              selectedPost.tags.length === 0
                ? 'Default'
                : selectedPost.tags.map((tag) => tag.name).join(', ')
            }
          />
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <BlogCard
              key={post.id}
              date={new Date(post.createdAt).toLocaleString('en-US')}
              title={post.title}
              excerpt={post.content.slice(0, 100)}
              tag={
                post.tags.length === 0
                  ? 'Default'
                  : post.tags.map((tag) => tag.name).join(', ')
              }
              handleViewBlogDetail={() => handleViewBlogDetail(post)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p>No articles available.</p>
          </div>
        )}

        {/* "Load more" button */}
        {!viewBlogDetail && posts.length > 0 && !loading && (
          <button
            className="w-full py-3 text-blue-600 font-medium flex items-center justify-center"
            onClick={() => {
              /* Load more functionality */
            }}
          >
            {posts.length === 0 ? 'Load Posts' : 'Load More'}{' '}
            <ChevronDown size={20} className="ml-1" />
          </button>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          {['Home', 'Latest', 'Tags', 'About Blog'].map((item, index) => (
            <button key={index} className="text-xs font-medium text-gray-600">
              {item}
            </button>
          ))}
        </div>
      </nav>

      <Link
        to="login"
        className="fixed bottom-16 right-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-medium hover:bg-blue-700"
      >
        Log In
      </Link>
    </div>
  );
};

export default Home;
