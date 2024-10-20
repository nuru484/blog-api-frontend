import { AlertCircle, Tag, FileText, Send } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Loading from '@/components/ui/loading';

const CreateCommentForm = ({
  loading,
  error,
  handleSubmit,
  handleChange,
  comment,
}) => {
  return (
    <div className="flex items-center justify-center rounded-md border-2 my-4 bg-gray-100">
      <div className="bg-white p-8  w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Add Comment
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
              placeholder="Comment Title"
              value={comment.title}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <textarea
              type="text"
              name="content"
              placeholder="Comment Content"
              value={comment.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex justify-center items-center"
          >
            {loading ? (
              <>
                <span className="inline-block mr-2">Creating comment</span>
                <Loading height={24} width={24} />
              </>
            ) : (
              <>
                Create Comment
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

export default CreateCommentForm;
