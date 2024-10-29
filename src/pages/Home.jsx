import { ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import Loading from '@/components/ui/loading';
import BlogDetail from '@/components/BlogDetail';
import usePostContext from '@/hooks/usePostContext';
import NabBar from '@/components/NabBar';
import About from '@/components/About';
import Header from '@/components/Header';
import LoginButton from '@/components/LoginButton';
import useAuth from '@/hooks/useAuth';

const Home = () => {
  const [viewBlogDetail, setViewBlogDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [aboutBlog, setAboutBlog] = useState(false);

  const { posts, loading, error } = usePostContext();

  const { isAuth } = useAuth();

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
        <div>
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
        </div>
      );
    }

    if (posts && posts.length > 0) {
      return (
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                date={new Date(post.createdAt).toLocaleString('en-US')}
                title={post.title}
                post={post}
                excerpt={post.content.slice(0, 250)}
                tag={post.tags.length === 0 ? 'Default' : post.tags[0].name}
                handleViewBlogDetail={() => handleViewBlogDetail(post)}
              />
            ))}
          </div>

          {!loading && (
            <button
              className="w-full py-3 text-blue-600 font-medium flex items-center justify-center mt-4"
              onClick={() => {}}
            >
              {posts.length === 0 ? 'Load Posts' : 'Load More'}
              <ChevronDown size={20} className="ml-1" />
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <p>No articles available.</p>
      </div>
    );
  };

  return (
    <div className="mx-auto bg-gray-100 min-h-screen font-sans pb-16 lg:flex lg:pb-0">
      <div className="sticky top-0 z-10">
        <div className="hidden lg:block sticky top-0">
          <NabBar
            handleViewBlogCard={handleViewBlogCard}
            showBlogAbout={handleAboutBlog}
          />
        </div>

        <div className="lg:hidden flex justify-center items-center bg-white shadow-sm">
          {!aboutBlog && <Header handleViewBlogCard={handleViewBlogCard} />}
        </div>
      </div>

      <div className="flex-1">
        <div className="hidden lg:flex justify-between items-center sticky top-0 pr-6 bg-white shadow-sm">
          <Header handleViewBlogCard={handleViewBlogCard} />
          {!isAuth && (
            <div className="hidden lg:block">
              <LoginButton />
            </div>
          )}
        </div>

        <main className="p-4 lg:px-8">{renderContent()}</main>
      </div>

      {!isAuth && (
        <div className="fixed right-5 bottom-20 lg:hidden">
          <LoginButton />
        </div>
      )}

      <div className="fixed bottom-0 w-full lg:hidden">
        <NabBar
          handleViewBlogCard={handleViewBlogCard}
          showBlogAbout={handleAboutBlog}
        />
      </div>
    </div>
  );
};

export default Home;
