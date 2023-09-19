import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MAIN_TITLE } from './../constants'
import { setCurrentPage } from './../features/auth/authSlice';
const useTitle = (currentPage, title) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage(currentPage));
        document.title = `${MAIN_TITLE} | ${title}`;
    }, [currentPage, title, dispatch]);
    return null;
}
export default useTitle;