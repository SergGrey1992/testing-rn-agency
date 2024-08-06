//PREV VERSION REDUX-TOOLKIT REALIZATION

import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {FormCommentValues} from 'features/addComment/ui/AddComment';
import {BASE_URL} from 'shared/config/constanst';

export type CommentType = {
  id: string;
  postId: string;
  text: string;
};

const adapter = createEntityAdapter({
  selectId: (item: CommentType) => item.id,
});

export const fetchComment = createAsyncThunk<CommentType[], {id: string}>(
  'comments/fetchComment',
  async ({id}, {rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/comments`);
      const resp = (await res.json()) as CommentType[];

      return resp.filter(com => com.postId === id) as CommentType[];
    } catch (error) {
      return rejectWithValue('Failed load comments');
    }
  },
);

export const createComment = createAsyncThunk<
  CommentType,
  FormCommentValues & {postId: number}
>('comments/createComment', async ({text, postId}) => {
  try {
    const res = await fetch(`${BASE_URL}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text,
        id: new Date().getTime().toString(),
        postId: postId.toString(),
      }),
    });

    const resp = await res.json();
    return {...resp, text, postId: postId.toString(),};
  } catch (error) {}
});

export const removeComment = createAsyncThunk<CommentType, {id: number}>(
  'comments/removeComment',
  async ({id}, {rejectWithValue}) => {
    try {
      const res = await fetch(`${BASE_URL}/comments/${id}`, {
        method: 'DELETE',
      });

      const resp = await res.json();
      return {...resp, id} as CommentType;
    } catch (error) {
      return rejectWithValue('remove comment error');
    }
  },
);

export const editComment = createAsyncThunk<
  CommentType,
  FormCommentValues & {id: string; postId: string}
>('comments/editComment', async (body, {rejectWithValue}) => {
  try {
    const res = await fetch(`${BASE_URL}/comments/${body.id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    const resp = await res.json();
    console.log('resp', resp);
    return {...resp, ...body} as CommentType;
  } catch (error) {
    return rejectWithValue('remove comment error');
  }
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: adapter.getInitialState(),
  reducers: {
    resetComments: () => adapter.getInitialState(),
  },
  extraReducers: builder =>
    builder
      .addCase(fetchComment.fulfilled, (state, action) => {
        adapter.addMany(state, action.payload);
      })
      .addCase(createComment.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      })
      .addCase(removeComment.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload.id);
      })
      .addCase(editComment.fulfilled, (state, action) => {
        adapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
      }),
});

export const commentsReducer = commentsSlice.reducer;

export const {resetComments} = commentsSlice.actions;

const commentsSelector = adapter.getSelectors<RootState>((state: RootState) => {
  return state.commentsReducer;
});

export const getAllComments = (state: RootState) =>
  commentsSelector.selectAll(state);
