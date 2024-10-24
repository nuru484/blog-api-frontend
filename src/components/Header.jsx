import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import usePostContext from '@/hooks/usePostContext';
import { handleAPIError } from '@/lib/errorHandler';
import { fetchPosts } from '@/api/postsFetch';

const Header = ({ handleViewBlogCard }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postsToSearch, setPostsToSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setPosts } = usePostContext();

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
      <header className="bg-white shadow-sm p-4 md:flex gap-4 md:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-center text-blue-600 lg:hidden">
          Afatech Blog
        </h1>
        <div className="mt-4 relative md:mt-0">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search articles..."
            className="w-full py-2 px-10 border border-gray-300 rounded-full"
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
