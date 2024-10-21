import { useContext } from 'react';
import { PostContext } from '@/context/PostContext';

const usePostContext = () => useContext(PostContext);

export default usePostContext;
