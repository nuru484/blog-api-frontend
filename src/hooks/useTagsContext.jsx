import { useContext } from 'react';
import { TagsContext } from '@/context/TagsContext';

const useTagContext = () => useContext(TagsContext);

export default useTagContext;
