//NEW VERSION REDUX-TOOLKIT

import {
  asyncThunkCreator,
  buildCreateSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import {FormValues} from 'features/addPost/ui/AddPostForm';
import {getRandomInt} from 'shared/lib/randomInt';
import {wait} from 'shared/lib/wait';
import {removeTaskId} from './porfile/model';
import { BASE_URL } from 'shared/config/constanst';

export type Post = {
  id: number;
  title: string;
  body: string;
  status: boolean;
};

const adapter = createEntityAdapter({
  selectId: (item: Post) => item.id,
  sortComparer: (a, b) => b.id - a.id,
});

const createSliceWithThunks = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
});

const postsSlice = createSliceWithThunks({
  name: 'posts',
  initialState: adapter.getInitialState({
    loading: false,
  }),
  reducers: create => ({
    addTask: create.asyncThunk(
      async (data: FormValues) => {
        const form = {id: new Date().getTime().toString(), ...data};
        const res = await fetch(`${BASE_URL}/posts`, {
          method: 'POST',
          body: JSON.stringify(form),
        });

        await wait(getRandomInt(2500, 5500));
        const resp = await res.json();

        return resp;
      },
      {
        fulfilled: (state, action) => adapter.addOne(state, action),
      },
    ),
    editTask: create.asyncThunk(
      async (body: {id: number; data: FormValues}) => {
        const res = await fetch(`${BASE_URL}/posts/${body.id}`, {
          method: 'PUT',
          body: JSON.stringify(body.data),
        });

        const resp = await res.json();

        return resp;
      },
      {
        fulfilled: (state, action) => {
          adapter.updateOne(state, {
            id: action.payload.id,
            changes: action.payload,
          });
        },
      },
    ),
    removeTask: create.asyncThunk(
      async (id: number, {dispatch}) => {
        const res = await fetch(`${BASE_URL}/posts/${id}`, {
          method: 'DELETE',
        });
        dispatch(removeTaskId(id));

        await wait(getRandomInt(500, 2000));
        const resp = await res.json();
        dispatch(removeTaskId(-1));
        return resp;
      },
      {
        fulfilled: (state, action) => {
          adapter.removeOne(state, action.payload.id);
        },
      },
    ),
    //FETCH posts items
    fetchPosts: create.asyncThunk(
      async () => {
        const res = await fetch(`${BASE_URL}/posts`);
        await wait(getRandomInt(500, 1500));
        return (await res.json()) as Post[];
      },
      {
        pending: state => {
          state.loading = true;
        },
        rejected: state => {
          state.loading = false;
        },
        fulfilled: (state, action) => {
          console.log('action', action);
          state.loading = false;
          adapter.upsertMany(state, action.payload);
        },
      },
    ),
  }),
});

const postsSelector = adapter.getSelectors<RootState>((state: RootState) => {
  return state.postsReducer;
});

export const getAllPosts = (state: RootState) => postsSelector.selectAll(state);
export const getIsLoading = (state: RootState) => state.postsReducer.loading;

export const postsReducer = postsSlice.reducer;

export const {fetchPosts, addTask, removeTask, editTask} = postsSlice.actions;
