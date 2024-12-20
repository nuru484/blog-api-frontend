import { Tag, FileText, Send, CircleCheckBig } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';
import { Editor } from '@tinymce/tinymce-react';

const PostForm = ({
  loading,
  error,
  success,
  handleSubmit,
  handleChange,
  handleEditorChange,
  handleTagSelection,
  post,
  setPost,
  availableTags,
  isEditing,
  onCancel,
}) => {
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 w-11/12 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          {isEditing ? 'Update Post' : 'Create New Post'}
        </h2>

        {success && (
          <Alert className="border-green-600 fixed top-4 left-1/2 transform -translate-x-1/2 max-w-md w-full mx-auto bg-white shadow-lg p-4 rounded-md z-50">
            <CircleCheckBig className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-600">
              {isEditing
                ? 'Post updated successfully!'
                : 'Post created successfully!'}
            </AlertDescription>
          </Alert>
        )}

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
            <Editor
              apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
              init={{
                height: 500,
                menubar: true,
                plugins:
                  'advlist autolink lists link image charmap preview anchor ' +
                  'searchreplace visualblocks code fullscreen ' +
                  'insertdatetime media table code help wordcount',
                toolbar:
                  'undo redo | formatselect | ' +
                  'bold italic backcolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
              }}
              value={post.content}
              onEditorChange={handleEditorChange}
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
              value={post.tagIDs}
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

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <span className="inline-block mr-2">
                    {isEditing ? 'Updating Post' : 'Creating Post'}
                  </span>
                  <Loading height={24} width={24} />
                </>
              ) : (
                <>
                  {isEditing ? 'Update Post' : 'Create Post'}
                  <Send className="inline-block ml-2" size={18} />
                </>
              )}
            </button>
            {isEditing && onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 bg-gray-200 text-gray-700 text-center py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
            )}
          </div>

          {error && (
            <Alert className="border-red-600 mt-4">
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

export default PostForm;
