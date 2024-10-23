import { useEffect, useState } from 'react';
import usePostContext from '@/hooks/usePostContext';
import { Home, Clock, Tag, Info } from 'lucide-react';
import useTagContext from '@/hooks/useTagsContext';

const NavBar = ({ handleViewBlogCard, showBlogAbout }) => {
  const { handleApiToFetch } = usePostContext();
  const [showTags, setShowTags] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');

  // const tags = ['Tech', 'Science', 'Agric', 'Stats'];
  const { tags } = useTagContext();

  // tags.map((tag) => {
  //   console.log(tag.name);
  // });

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
      case 'About Blog':
        showBlogAbout();
        setShowTags(false);
        break;
      default:
        if (tags.includes(section)) {
          handleApiToFetch(`posts/${section.name}`);
          setShowTags(false);
          handleViewBlogCard();
        }
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
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block sticky inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg h-dvh">
        <div className="flex flex-col h-full">
          {/* Brand/Logo Area */}
          <div className="flex items-center px-6 py-9 border-b border-gray-100">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Afatech Blog
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.name)}
                className={`flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium
                          transition-all duration-200 group hover:bg-blue-50
                          ${
                            activeItem === item.name
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:text-blue-600'
                          }`}
              >
                <item.icon
                  className={`h-5 w-5 mr-3 transition-colors duration-200
                                   ${
                                     activeItem === item.name
                                       ? 'text-blue-600'
                                       : 'text-gray-400 group-hover:text-blue-600'
                                   }`}
                />
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Tags Panel - Desktop */}
          {showTags && (
            <div className="absolute left-64 top-0 w-64 h-full bg-white border-r border-gray-200 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Select a tag
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => handleNavigation(tag)}
                    className="px-4 py-2 text-sm font-medium rounded-lg
                             bg-blue-50 text-blue-600 hover:bg-blue-100
                             transition-colors duration-200"
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-6 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.name)}
              className={`flex flex-col items-center space-y-1
                         transition-colors duration-200
                         ${
                           activeItem === item.name
                             ? 'text-blue-600'
                             : 'text-gray-600 hover:text-blue-600'
                         }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Tags Panel */}
      {showTags && (
        <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Select a tag
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleNavigation(tag)}
                className="px-3 py-1.5 text-sm font-medium rounded-md
                         bg-blue-50 text-blue-600 hover:bg-blue-100
                         transition-colors duration-200"
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
