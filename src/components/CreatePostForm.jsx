import React, { useState } from 'react';
import { AlertCircle, Check, Tag, FileText, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CreatePostForm = ({
  loading,
  error,
  handleSubmit,
  handleChange,
  handleTagSelection,
  post,
  setPost,
  availableTags,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8  w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <FileText
              className="absolute top-3 left-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              name="title"
              placeholder="Post Title"
              value={post.title}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <textarea
              type="text"
              name="content"
              placeholder="Post Content"
              value={post.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <fieldset>
              <legend className="text-sm font-medium text-gray-700 mb-2">
                Publish Status
              </legend>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="published"
                    value="true"
                    checked={post.published}
                    onChange={() =>
                      setPost((prev) => ({ ...prev, published: true }))
                    }
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Publish</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="published"
                    value="false"
                    checked={!post.published}
                    onChange={() =>
                      setPost((prev) => ({ ...prev, published: false }))
                    }
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Draft</span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="mb-6 relative">
            <Tag className="absolute top-3 left-3 text-gray-400" size={20} />
            <select
              multiple
              name="tagIDs"
              onChange={handleTagSelection}
              value={post.tags}
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {availableTags.map((tag) => (
                <option key={tag.id} value={tag.id} name="tagIDs">
                  {tag.name}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Hold Ctrl (Cmd on Mac) to select multiple tags
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white text-center py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <>
                <p className="inline-block mr-2">Creating Post</p>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                Create Post
                <Send className="inline-block ml-2" size={18} />
              </>
            )}
          </button>

          {error && (
            <Alert className="border-red-600 mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-600">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
