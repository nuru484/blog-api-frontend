import React from 'react';
import { Search, ChevronDown } from 'lucide-react';
import BlogCard from '../components/BlogCard';

const Home = () => {
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
        {['Technology', 'Lifestyle', 'Travel'].map((tag, index) => (
          <BlogCard
            key={index}
            date="Oct 12, 2024"
            title={`The Future of ${tag}`}
            excerpt="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            tag={tag}
          />
        ))}
        <button className="w-full py-3 text-blue-600 font-medium flex items-center justify-center">
          Load more <ChevronDown size={20} className="ml-1" />
        </button>
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

      <button className="fixed bottom-16 right-4 bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg font-medium hover:bg-blue-700">
        Log In
      </button>
    </div>
  );
};

export default Home;
