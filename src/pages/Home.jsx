import { Search, ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/loading';
import BlogDetail from '@/components/BlogDetail';
import usePostContext from '@/hooks/usePostContext';
import NabBar from '@/components/NabBar';
import About from '@/components/About';

const Home = () => {
  const [viewBlogDetail, setViewBlogDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [aboutBlog, setAboutBlog] = useState(false);

  const { posts, loading, error } = usePostContext();

  const handleAboutBlog = () => {
    setAboutBlog(true);
    setViewBlogDetail(false);
    setSelectedPost(null);
    localStorage.removeItem('selectedPost');
  };

  useEffect(() => {
    if (!aboutBlog) {
      const savedPost = JSON.parse(localStorage.getItem('selectedPost'));
      if (savedPost) {
        const updatedPost = posts.find((post) => post.id === savedPost.id);
        if (updatedPost) {
          setSelectedPost(updatedPost);
          localStorage.setItem('selectedPost', JSON.stringify(updatedPost));
        } else {
          setSelectedPost(savedPost);
        }
        setViewBlogDetail(true);
      }
    }
  }, [posts, aboutBlog]);

  const handleViewBlogDetail = (post) => {
    setSelectedPost(post);
    setViewBlogDetail(true);
    setAboutBlog(false);
    localStorage.setItem('selectedPost', JSON.stringify(post));
  };

  const handleViewBlogCard = () => {
    setViewBlogDetail(false);
    setSelectedPost(null);
    setAboutBlog(false);
    localStorage.removeItem('selectedPost');
  };

  const renderContent = () => {
    if (aboutBlog) {
      return <About />;
    }

    if (loading) {
      return (
        <div className="flex items-center justify-center">
          <Loading height={24} width={24} color="#000020" />
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500">{error.message}</p>;
    }

    if (viewBlogDetail && selectedPost) {
      return (
        <BlogDetail
          date={new Date(selectedPost.createdAt).toLocaleString('en-US')}
          handleViewBlogCard={handleViewBlogCard}
          title={selectedPost.title}
          content={selectedPost.content}
          author={
            selectedPost.author
              ? `${selectedPost.author.firstname} ${selectedPost.author.lastname}`
              : 'Unknown'
          }
          post={selectedPost}
          tags={
            selectedPost.tags.length === 0 ? ['Default'] : selectedPost.tags
          }
        />
      );
    }

    if (posts && posts.length > 0) {
      return (
        <>
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              date={new Date(post.createdAt).toLocaleString('en-US')}
              title={post.title}
              post={post}
              excerpt={post.content.slice(0, 100)}
              tag={post.tags.length === 0 ? 'Default' : post.tags[0].name}
              handleViewBlogDetail={() => handleViewBlogDetail(post)}
            />
          ))}
          {!loading && (
            <button
              className="w-full py-3 text-blue-600 font-medium flex items-center justify-center"
              onClick={() => {}}
            >
              {posts.length === 0 ? 'Load Posts' : 'Load More'}
              <ChevronDown size={20} className="ml-1" />
            </button>
          )}
        </>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <p>No articles available.</p>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen font-sans pb-16">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Afatech Blog
        </h1>
        {!aboutBlog && (
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
        )}
      </header>

      <main className="p-4">{renderContent()}</main>

      <NabBar
        handleViewBlogCard={handleViewBlogCard}
        showBlogAbout={handleAboutBlog}
      />

      <Link
        to="login"
        className="fixed bottom-12 right-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-medium hover:bg-blue-700"
      >
        Log In
      </Link>
    </div>
  );
};

export default Home;
