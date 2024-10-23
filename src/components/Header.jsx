import { Search } from 'lucide-react';

const Header = () => {
  return (
    <>
      <header className="bg-white shadow-sm p-4 md:flex justify-center items-center gap-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Afatech Blog
        </h1>
        <div className="mt-4 relative md:mt-0">
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
    </>
  );
};

export default Header;
