import { Search, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import usePostContext from '@/hooks/usePostContext';
import { handleAPIError } from '@/lib/errorHandler';
import { fetchPosts } from '@/api/postsFetch';
import useAuth from '@/hooks/useAuth';

const Header = ({ handleViewBlogCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postsToSearch, setPostsToSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setPosts } = usePostContext();

  const { authUser, isAuth, logout } = useAuth();

  // Fetch posts to be searched from on mount
  useEffect(() => {
    const fetchPostsFunction = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchPosts('posts/published');
        setPostsToSearch(response.posts);
      } catch (error) {
        handleAPIError(error, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsFunction();
  }, []);

  const handleSearchQuery = () => {
    const filtered = postsToSearch.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPosts(filtered);
    handleViewBlogCard();
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchQuery();
    }
  };

  return (
    <>
      <header className="w-full bg-white shadow-sm p-4 md:p-6 lg:p-8 lg:flex items-center gap-4  lg:w-auto  ">
        <div className="flex justify-between gap-5">
          <h1 className="text-2xl font-bold text-center text-blue-600 lg:hidden">
            Afatech Blog
          </h1>
          {isAuth && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-3xl hover:bg-blue-700">
              <span>Manage Posts</span>
            </button>
          )}
        </div>

        <div className="mt-4 lg:mt-0 relative ">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search articles..."
            className="py-2 px-10 border border-gray-300 rounded-full w-full"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            size={20}
            onClick={handleSearchQuery}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
