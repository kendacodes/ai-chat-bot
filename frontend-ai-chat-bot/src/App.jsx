import { useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import ReplayIcon from '@mui/icons-material/Replay';

const App = (props) => {
  // State variables
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState([]);
  const [showSuggested, setShowSuggested] = useState(true);
  const [editId, setEditId] = useState(null);

  // Bot response options
  const variousBotResponses = [
    'I dont understand',
    'Let"s talk about that ',
    'Tell me more',
    'That is out of my scope',
    'That"s above me',
    'I"m just a bot', 
    'I got you in my next iteration'
  ];

  // Handle user input change
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userInput.trim().length === 0) {
      alert("Input required");
      return;
    }

    // Randomly select a bot reply
    const botReply = variousBotResponses[Math.floor(Math.random() * variousBotResponses.length)];
    
    // Create a new entry
    const newEntry = {
      question: userInput,
      botReply: botReply,
      id: response.length + 1
    };

    // Check if editing an existing entry
    if (editId !== null) {
      const updatedResponse = response.map((entry) =>
        entry.id === editId ? { ...entry, question: userInput } : entry
      );
      setResponse(updatedResponse);
      setEditId(null);
    } else {
      setResponse([...response, newEntry]);
    }
    
    // Clear user input
    setUserInput("");
  };

  // Clear user input and response list
  const handleNewSearch = () => {
    setUserInput("");
    setResponse([]);
    setEditId(null);
  };

  // Handle editing an entry
  const handleEdit = (id, question) => {
    setEditId(id);
    setUserInput(question);
  };

  // Handle copying text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(text + ' has been copied to clipboard');
  };

  // Handle copying both question and bot reply to clipboard
  const handleCopyAll = (question, botReply) => {
    const textToCopy = `${question} - ${botReply}`;
    navigator.clipboard.writeText(textToCopy);
    alert(textToCopy + ' has been copied to clipboard');
  };

  return (
    <div>
      {/* Add search icon */}
      <AddIcon onClick={handleNewSearch}></AddIcon>
      <div>
        {/* Header */}
        <h1>How can I help you today?</h1>
      </div>
      <div className="suggestions-container">
        {/* Display suggested questions */}
        {showSuggested && props.suggestions.map((suggested) => (
          <Button
            key={suggested.userId}
            text={suggested.question}
            onClick={() => {
              const newEntry = {
                question: suggested.question,
                botReply: variousBotResponses[Math.floor(Math.random() * variousBotResponses.length)],
                id: response.length + 1
              };
              setResponse([...response, newEntry]);
            }}
          />
        ))}
      </div>
      <ul>
        {/* Display user input and bot replies */}
        {response.map((entry) => (
          <div key={entry.id}>
            <Display response={entry.question} />
            <Display response={entry.botReply} />
            <div>
              {/* Edit button */}
              <EditIcon onClick={() => handleEdit(entry.id, entry.question)} />
              {/* Copy bot reply */}
              <CopyAllIcon onClick={() => handleCopyAll(entry.question, entry.botReply)} />
              {/* Replay (Placeholder for now) */}
              <ReplayIcon />
            </div>
          </div>
        ))}
      </ul>
      <div className="search-container">
        {/* User input form */}
        <form onSubmit={handleFormSubmit}>
          <input
            value={userInput}
            onChange={handleUserInput}
          />
          <Button text="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default App;
