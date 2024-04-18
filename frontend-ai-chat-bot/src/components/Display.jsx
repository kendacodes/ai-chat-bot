import React, { useState } from 'react';
import { FaRegUser, FaEdit, FaSave } from 'react-icons/fa';
import { Stack } from '@mui/material';

const Display = ({ response, id, onEdit }) => {
  const [editText, setEditText] = useState(response);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is active

  // Handle editing mode
  const handleEdit = () => {
    onEdit(id, editText); // Call the onEdit function with the id and edited text
    setIsEditing(false); // Exit editing mode after saving
  };

  return (
    <div>
      <li>
        <Stack direction="row" spacing={2}>
          <FaRegUser />
          {isEditing ? (
            // Render textarea and save button in editing mode
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <FaSave onClick={handleEdit} />
            </>
          ) : (
            // Render span and edit button in view mode
            <>
              <span>{response}</span>
              <FaEdit onClick={() => setIsEditing(true)} />
            </>
          )}
        </Stack>
      </li>
    </div>
  );
};

export default Display;