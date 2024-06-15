import api from "../api";

export const getNotes = function (setNotes) {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((error) => alert(error));
  };

export const deleteNote = (id) => {
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

export const createNote = (e) => {
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