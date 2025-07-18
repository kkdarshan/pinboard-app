import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';

const NotesBoard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [color, setColor] = useState('lightyellow');

  return (
    <div>
      <h2>PinBoard App</h2>
      <label>Choose color: </label>
      <select onChange={(e) => setColor(e.target.value)} value={color}>
        <option value="lightyellow">Yellow</option>
        <option value="lightblue">Blue</option>
        <option value="lightgreen">Green</option>
        <option value="lightpink">Pink</option>
        <option value="lightgray">Gray</option>
      </select>
    </div>
  );
};


  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  const addOrEditNote = async () => {
    if (editId) {
      const res = await axios.put(`http://localhost:5000/api/notes/${editId}`, {
        title,
        content,
      });
      setNotes(notes.map(note => (note._id === editId ? res.data : note)));
      setEditId(null);
    } else {
      const res = await axios.post('http://localhost:5000/api/notes', {
        title,
        content,
        x: 100,
        y: 100,
      });
      setNotes([...notes, res.data]);
    }

    setTitle('');
    setContent('');
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    setNotes(notes.filter(note => note._id !== id));
  };

  const updatePosition = async (id, x, y) => {
    await axios.put(`http://localhost:5000/api/notes/${id}`, { x, y });
  };

  return (
    <div>
      <h2>PinBoard App</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      /><br/>
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      /><br/>
      <button onClick={addOrEditNote}>
        {editId ? 'Update Note' : 'Add Note'}
      </button>

      <div>
        {notes.map(note => (
          <Draggable
            key={note._id}
            defaultPosition={{ x: note.x || 0, y: note.y || 0 }}
            onStop={(e, data) => updatePosition(note._id, data.x, data.y)}
          >
            <div style={{
              border: '1px solid gray',
              padding: '10px',
              position: 'absolute',
              backgroundColor: 'lightyellow',
              cursor: 'move',
              minWidth: '200px',
              zIndex: 1,
              borderRadius: '8px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => {
                    setEditId(note._id);
                    setTitle(note.title);
                    setContent(note.content);
                  }}
                  style={{ marginRight: '5px' }}
                ></button>
                <button
                  onClick={() => deleteNote(note._id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                ></button>
              </div>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );

export default NotesBoard;
