import {configureStore} from '@reduxjs/toolkit';
import {commentsReducer} from 'entities/comments/model';
import {postsReducer} from 'entities/model';
import {profileReducer} from 'entities/porfile/model';
import {useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    postsReducer,
    profileReducer,
    commentsReducer,
  },
});

export const useAppDispatch = useDispatch.withTypes<RootDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
