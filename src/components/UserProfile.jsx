import React from 'react';
import { Camera, LogOut, Lock, UserCog } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserProfileMenu = ({ onLogout, onUpdatePhoto, onUpdatePassword }) => {
  return (
    <DropdownMenu>
      <div className="flex flex-col items-center justify-center">
        <DropdownMenuTrigger className="flex items-center justify-center  w-12 h-12 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
          <UserCog />
        </DropdownMenuTrigger>
        <p className="hidden text-sm lg:block">Profile</p>
      </div>

      <DropdownMenuContent align="end" className="w-48 bg-white">
        <DropdownMenuItem
          className="flex items-center py-2 cursor-pointer"
          onClick={onUpdatePhoto}
        >
          <Camera className="mr-2 h-4 w-4" />
          <span>Update Profile Photo</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center py-2 cursor-pointer"
          onClick={onUpdatePassword}
        >
          <Lock className="mr-2 h-4 w-4" />
          <span>Update Password</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center py-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileMenu;
