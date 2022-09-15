import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Form from "./components/Form";
import List from "./components/List";
import styles from "./Films.module.css";
import { film } from "./types";
import { createFilmAsync, deleteFilmAsync, fetchFilmsAsync } from "./filmsSlice";

function Films(): JSX.Element {
  const films = useAppSelector(state => state.films.films)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchFilmsAsync())
  }, [dispatch])

  return (
      <div className={styles.container}>
        <div className={styles.list}><List list={films} onDelete={(id: number) => dispatch(deleteFilmAsync(id))}/></div>
        <div className={styles.form}><Form onSubmit={(film: film) => dispatch(createFilmAsync(film))}/></div>
      </div>
  );
}

export default Films;
