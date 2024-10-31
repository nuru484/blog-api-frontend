import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlusCircle, FileText, FileX, Tags, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PostManagementMenu = ({
  onCreatePost,
  onViewPublished,
  onViewUnpublished,
  onManageTags,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
        >
          Manage Posts
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 mt-2 bg-white">
        <DropdownMenuItem
          onClick={onCreatePost}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create Post</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200" />

        <DropdownMenuItem
          onClick={onViewPublished}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200"
        >
          <FileText className="h-4 w-4" />

          <span>Published Posts</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onViewUnpublished}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200"
        >
          <FileX className="h-4 w-4" />
          <span>Unpublished Posts</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onManageTags}
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-200"
        >
          <Tags className="h-4 w-4" />
          <span>Manage Tags</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostManagementMenu;
