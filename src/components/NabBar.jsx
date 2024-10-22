import { useState } from 'react';
import usePostContext from '@/hooks/usePostContext';
import { Home, Clock, Tag, Info } from 'lucide-react';

const NavBar = ({ handleViewBlogCard }) => {
  const { handleApiToFetch } = usePostContext();
  const [showTags, setShowTags] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  const tags = ['Tech', 'Science', 'Agric', 'Stats'];

  const handleNavigation = (section) => {
    setActiveItem(section);
    switch (section) {
      case 'Home':
        handleApiToFetch('posts/published');
        setShowTags(false);
        handleViewBlogCard();
        break;
      case 'Latest':
        handleApiToFetch('posts/latest');
        setShowTags(false);
        handleViewBlogCard();
        break;
      case 'Tags':
        setShowTags(!showTags);
        break;
      default:
        handleApiToFetch(`posts/${section}`);
        setShowTags(false);
        handleViewBlogCard();
        break;
    }
  };

  const navItems = [
    { name: 'Home', icon: Home },
    { name: 'Latest', icon: Clock },
    { name: 'Tags', icon: Tag },
    { name: 'About Blog', icon: Info },
  ];

  return (
    <div className="relative">
      {/* Tags Popup */}
      {showTags && (
        <div className="fixed max-w-md mx-auto bottom-16 left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 transition-all duration-300 ease-in-out">
          <div className="">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Select a tag
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleNavigation(tag)}
                  className="px-3 py-1.5 text-sm font-medium rounded-md 
                           bg-blue-100 text-blue-800 hover:bg-blue-200 
                           transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="fixed max-w-md mx-auto bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-4 py-2">
        <div className=" ">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`flex flex-col items-center space-y-1 px-3 py-1 rounded-md
                          transition-colors duration-200
                          ${
                            activeItem === item.name
                              ? 'text-blue-600'
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
              >
                <item.icon size={18} />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
