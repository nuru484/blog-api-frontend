import { AlertCircle, Tag, FileText, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';

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
      <div className="bg-white p-8  w-11/12 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-indigo-500">
              <FileText className="ml-3 text-gray-400" size={20} />
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={post.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-md focus:outline-none"
              />
            </div>
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
                    className="form-radio text-blue-600"
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
                    className="form-radio text-blue-600"
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
            className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <>
                <span className="inline-block mr-2">Creating Post</span>
                <Loading height={24} width={24} />
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
