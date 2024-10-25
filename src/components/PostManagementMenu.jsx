import React from 'react';
import { Plus, FileText, FileX, MoreVertical } from 'lucide-react';

const PostManagementMenu = () => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
      <button className="flex items-center gap-2 w-full p-3 text-left text-blue-600 hover:bg-blue-50 rounded-md mb-2 font-medium">
        <Plus className="w-5 h-5" />
        <span>Create Post</span>
      </button>

      {/* Divider */}
      <div className="h-px bg-gray-200 my-1" />

      {/* Post Management Options */}
      <button className="flex items-center gap-2 w-full p-3 text-left hover:bg-gray-50 rounded-md">
        <FileText className="w-5 h-5 text-gray-600" />
        <div className="flex flex-col">
          <span>Published Posts</span>
          <span className="text-sm text-gray-500">
            View all your live posts
          </span>
        </div>
      </button>

      <button className="flex items-center gap-2 w-full p-3 text-left hover:bg-gray-50 rounded-md">
        <FileX className="w-5 h-5 text-gray-600" />
        <div className="flex flex-col">
          <span>Unpublished Posts</span>
          <span className="text-sm text-gray-500">View your drafts</span>
        </div>
      </button>

      {/* More Options */}
      <button className="flex items-center gap-2 w-full p-3 text-left hover:bg-gray-50 rounded-md">
        <MoreVertical className="w-5 h-5 text-gray-600" />
        <span>More Options</span>
      </button>
    </div>
  );
};

export default PostManagementMenu;
