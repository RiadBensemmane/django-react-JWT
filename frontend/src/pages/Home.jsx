import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";
import { Navigate} from "react-router-dom";
import { Logout} from "../App";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = function () {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((error) => alert(error));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully");
        } else {
          alert("Note deletion failed");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();

    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
        } else {
          alert("Note creation failed");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };

  if (logout){
    return <Logout></Logout>
  }

  return (
    <div>
      <div>
        <button onClick={() => setLogout(true)}>Log out</button>
        <h2>Notes</h2>
        {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
      </div>
      <h2>Create a note</h2>
      <form action="" onSubmit={createNote}>
        <label htmlFor="title">Title: </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="content">Content: </label>
        <textarea
          name="content"
          id="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
