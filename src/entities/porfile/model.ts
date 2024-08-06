import {asyncThunkCreator, buildCreateSlice} from '@reduxjs/toolkit';
import {BASE_URL} from 'shared/config/constanst';

import {getRandomInt} from 'shared/lib/randomInt';
import {wait} from 'shared/lib/wait';

type State = {
  name: string;
  disabled: {
    id: string;
    action: string;
  };
};

const createSliceWithThunks = buildCreateSlice({
  creators: {asyncThunk: asyncThunkCreator},
});

const profileSlice = createSliceWithThunks({
  name: 'profile',
  initialState: {
    disabled: {
      id: '-1',
      action: '',
    },
  } as State,
  reducers: create => ({
    //FETCH Profile
    fetchProfile: create.asyncThunk(
      async () => {
        const res = await fetch(`${BASE_URL}/profile`);
        await wait(getRandomInt(500, 1500));
        return (await res.json()) as State;
      },
      {
        fulfilled: (state, action) => {
          return {...state, ...action.payload};
        },
      },
    ),
    removeTaskId: create.reducer<string>((state, action) => {
      state.disabled.id = action.payload;
      state.disabled.action = 'remove';
    }),
  }),
  selectors: {},
});

export const profileReducer = profileSlice.reducer;

export const {fetchProfile, removeTaskId} = profileSlice.actions;
