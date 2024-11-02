import React, { useState } from 'react';
import { Pencil, X, Plus, FileX } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useTagContext from '@/hooks/useTagsContext';
import {
  createTagFetch,
  deleteTagFetch,
  updateTagFetch,
} from '@/api/tagsFetch';
import { SuccessAlert } from './SuccessAlert';
import useAuth from '@/hooks/useAuth';

const TagManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '' });

  const { tags, setTags } = useTagContext();
  const { isAuth } = useAuth();

  const handleOpenDialog = (tag = null) => {
    setEditingTag(tag);
    setTagName(tag ? tag.name : '');
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!tagName.trim()) return;

    if (editingTag) {
      const response = await updateTagFetch(editingTag.id, tagName);

      setTags(
        tags.map((tag) =>
          tag.id === editingTag.id ? { ...response.updatedTag } : tag
        )
      );

      setAlert({
        show: true,
        message: 'Tag Updated successfully!',
      });
    } else {
      const response = await createTagFetch(tagName);

      setTags([...tags, { id: response.tag.id, name: response.tag.name }]);

      setAlert({
        show: true,
        message: 'Tag created successfully!',
      });
    }

    setIsOpen(false);
    setTagName('');
    setEditingTag(null);
  };

  const handleDelete = async (tagId) => {
    await deleteTagFetch(tagId);
    setTags(tags.filter((tag) => tag.id !== tagId));

    setAlert({
      show: true,
      message: 'Tag Deleted successfully!',
    });
  };

  return (
    isAuth && (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Tags</h2>

          <Button
            onClick={() => handleOpenDialog()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus size={16} />
            New Tag
          </Button>
        </div>

        <SuccessAlert
          show={alert.show}
          message={alert.message}
          onClose={() => setAlert({ show: false, message: '' })}
        />

        <div className="space-y-3">
          {tags && tags.length > 0 ? (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors group"
              >
                <span className="text-gray-700">{tag.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenDialog(tag)}
                    className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    aria-label="Edit tag"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    aria-label="Delete tag"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>There are no tags at the moment.</p>
            </div>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                {editingTag ? 'Edit Tag' : 'Create New Tag'}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                placeholder="Enter tag name"
                className="w-full border-2"
              />
            </div>
            <DialogFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="bg-red-600 text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-green-600 text-white"
              >
                {editingTag ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
};

export default TagManager;
