import { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingContent, setEditingContent] = useState({ title: '', content: '' });

  // Load notes
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create
  const handleCreateNote = async () => {
    if (!newNote.title || !newNote.content) return;
    try {
      const res = await axios.post('http://localhost:5000/api/notes', newNote);
      setNotes([...notes, res.data]);
      setNewNote({ title: '', content: '' });
    } catch (err) {
      console.error(err);
    }
  };

  // Edit
  const handleEdit = (note) => {
    setEditingNoteId(note._id);
    setEditingContent({ title: note.title, content: note.content });
  };

  // Update
  const handleUpdateNote = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/${editingNoteId}`, editingContent);
      setNotes(notes.map(note => note._id === editingNoteId ? res.data : note));
      setEditingNoteId(null);
      setEditingContent({ title: '', content: '' });
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Drag
  const handleStopDrag = async (e, data, note) => {
    const updatedPosition = { x: data.x, y: data.y };
    try {
      const res = await axios.put(`http://localhost:5000/api/notes/${note._id}`, {
        ...note,
        position: updatedPosition
      });
      setNotes(notes.map(n => n._id === note._id ? res.data : n));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>PinBoard Notes</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleCreateNote} style={{ marginLeft: "10px" }}>Add Note</button>
      </div>

      <div style={{ position: 'relative', height: '80vh' }}>
        {notes.map(note => (
          <Draggable
            key={note._id}
            defaultPosition={note.position || { x: 0, y: 0 }}
            onStop={(e, data) => handleStopDrag(e, data, note)}
          >
            <div style={{
              position: 'absolute',
              width: '200px',
              padding: '15px',
              backgroundColor: '#fff8b0',
              border: '1px solid #ccc',
              borderRadius: '10px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
              cursor: 'move'
            }}>
              {editingNoteId === note._id ? (
                <>
                  <input
                    type="text"
                    value={editingContent.title}
                    onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                    style={{ width: '100%', marginBottom: '5px' }}
                  />
                  <textarea
                    value={editingContent.content}
                    onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                    style={{ width: '100%' }}
                  />
                  <button onClick={handleUpdateNote}>Save</button>
                </>
              ) : (
                <>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => handleEdit(note)}>Edit</button>
                    <button onClick={() => handleDelete(note._id)} style={{ color: 'red' }}>Delete</button>
                  </div>
                </>
              )}
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
