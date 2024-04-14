import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './component/auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage"



function App() {
  const [movieList, setMovieList] = useState([]);

  //New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState("");
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);

  //File upload state
  const [fileUpload, setFileUpload] = useState(null)

  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectRef = collection(db, "movies");

  //get all movie from db
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {

    getMovieList();
  }, []);

  //add movie to db
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  //delete movie
  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (err) {
      console.log(err);
    }
  };

  //Update movie
  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (err) {
      console.log(err);
    }
  };

  //Upload File
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectfiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err)
    }
  };

  return (
    <div>
      <Auth />

      <div>
        <input placeholder='Movie title.../' onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder='release data.../' type="number" onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) => setisNewMovieOscar(e.target.checked)} />
        <label>Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <input placeholder="new title" onChange={(e) => setUpdatedTitle(e.target.value)}></input>
            <button onClick={() => updateMovieTitle(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}></input>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div >


  );

}

export default App;
