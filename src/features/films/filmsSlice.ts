import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createFilm, deleteFilm, fetchFilms} from './filmsAPI';
import { film } from './types';


export interface FilmsState {
  films: film[]
  status: 'idle' | 'loading' | 'failed';
}

const initialState: FilmsState = {
  films: [],
  status: 'idle',
};

export const fetchFilmsAsync = createAsyncThunk(
  'film/fetch',
  async () => {
    return await fetchFilms();
  }
);

export const createFilmAsync = createAsyncThunk(
  'film/create',
  async (payload: film, {dispatch}) => {
    await createFilm(payload);
    await dispatch(fetchFilmsAsync())
  }
);

export const deleteFilmAsync = createAsyncThunk(
  'film/delete',
  async (payload: number, {dispatch}) => {
    await deleteFilm(payload);
    await dispatch(fetchFilmsAsync())
  }
);

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilmsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.films = action.payload;
      })
      .addCase(fetchFilmsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// export const {} = filmsSlice.actions;

export default filmsSlice.reducer;
