import React, { useState } from 'react';
import { Pencil, X, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tag, FileText, Send, CircleCheckBig } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useTagContext from '@/hooks/useTagsContext';
import { createTag } from '@/api/tagsFetch';

const TagManager = () => {
  const { tags, setTags } = useTagContext();

  const [isOpen, setIsOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleOpenDialog = (tag = null) => {
    setEditingTag(tag);
    setTagName(tag ? tag.name : '');
    setIsOpen(true);
  };

  const handleSubmit = async () => {
    if (!tagName.trim()) return;

    if (editingTag) {
      setTags(
        tags.map((tag) =>
          tag.id === editingTag.id ? { ...tag, name: tagName } : tag
        )
      );
    } else {
      const response = await createTag(tagName);
      console.log(response);
      setSuccess(true);

      setTags([...tags, { id: response.tag.id, name: response.tag.name }]);

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }

    setIsOpen(false);
    setTagName('');
    setEditingTag(null);
  };

  const handleDelete = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
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

      {success && (
        <Alert className="border-green-600 fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-auto bg-white shadow-lg p-4 rounded-md z-50">
          <CircleCheckBig className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-600">
            Post created successfully!
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        {tags.map((tag) => (
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
        ))}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
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
              className="w-full"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingTag ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TagManager;
