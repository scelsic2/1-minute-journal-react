import { FiEdit, FiDelete, FiSave } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";

const dayjs = require("dayjs");

function Entries(props) {
  const navigate = useNavigate();
  const { uid, entryId } = useParams();

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(`/api/entries/${uid}`).then((res) => {
      setEntries(res.data.entries);
    });
  }, []);

  const [formState, setFormState] = useState({
    entry: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(""); // Move the declaration here

  const UpdateEntry = async (event, entryId, originalEntryText) => {
    event.preventDefault();
    console.log("Entry updated");
    console.log(formState);
  
    setIsEditing(true);
  
    try {
      const res = await axios.put(`/api/entries/${uid}/${entryId}`, formState);
      const updatedEntry = { ...entries.find(entry => entry._id === entryId), entry: editedText };
      setEntries(entries.map(entry => entry._id === entryId ? updatedEntry : entry));
      setIsEditing(false);
    } catch (err) {
      if (err.code === 402) {
        console.log(err);
      }
    }
  };
  

  const OutputEntries = ({ entries }) => {
    const sortedEntries = entries.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  
    const [editedTextMap, setEditedTextMap] = useState(new Map());
    const [isEditingMap, setIsEditingMap] = useState(new Map());
  
    const handleEditClick = (entryId) => {
      setIsEditingMap(new Map(isEditingMap.set(entryId, true)));
      setEditedTextMap(
        new Map(editedTextMap.set(entryId, getEntryTextById(entryId)))
      );
    };
  
    const handleTextareaChange = (event, entryId) => {
      const newText = event.target.value;
      setEditedTextMap(new Map(editedTextMap.set(entryId, newText)));
    };
  
    const handleSaveClick = (event, entryId) => {
      setIsEditingMap(new Map(isEditingMap.set(entryId, false)));
      UpdateEntry(event, entryId, editedTextMap.get(entryId));
    };
  
    const getEntryTextById = (entryId) => {
      const entry = sortedEntries.find((entry) => entry._id === entryId);
      return entry ? entry.entry : "";
    };

    return (
        <>
          {sortedEntries.map((entry) => (
            <div className="entry-div" key={entry._id}>
              <h5 className="entry-date">
                {dayjs(entry.createdAt).format("MM/DD/YY h:mmA")}
              </h5>
              <h4 className="entry-prompt">{entry.prompt}</h4>
    
              {isEditingMap.get(entry._id) ? (
                <textarea
                  value={editedTextMap.get(entry._id)}
                  onChange={(e) => handleTextareaChange(e, entry._id)}
                />
              ) : (
                <p className="entry-text">{entry.entry}</p>
              )}
    
              <div className="edit-delete-div">
                {isEditingMap.get(entry._id) ? (
                  <FiSave
                    color="var(--header-color)"
                    fontSize={20}
                    onClick={(event) => handleSaveClick(event, entry._id)}
                  />
                ) : (
                  <FiEdit
                    color="var(--header-color)"
                    fontSize={20}
                    onClick={() => handleEditClick(entry._id)}
                  />
                )}
    
                <FiDelete color="var(--header-color)" fontSize={20} />
              </div>
            </div>
          ))}
        </>
      );
    };

  return (
    <>
      <section className="entries-section">
        <OutputEntries entries={entries} />
      </section>
    </>
  );
}

export default Entries;
