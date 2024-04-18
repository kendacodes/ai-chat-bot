import React, { useState } from 'react';
import Button from "./components/Button";
import Display from "./components/Display";
import Answer from "./components/Answer";
import Header from "./components/Header";
import Greetings from "./components/Greetings";
import { Stack, Box, AppBar, CircularProgress } from "@mui/material";

const App = (props) => {
  // State variables
  const [userInput, setUserInput] = useState("");
  const [suggestedResponses, setSuggestedResponses] = useState(props.suggestions);
  const [response, setResponse] = useState([]);
  const [history, setHistory] = useState([]);
  const [showSuggested, setShowSuggested] = useState(true);
  const [waiting, setWaiting] = useState(false);
  const [editingId, setEditingId] = useState(null); // State to track editing ID

  // Array of various bot responses
  const variousBotResponses = [
    "I dont understand",
    'Let"s talk about that ',
    "Tell me more",
    "That is out of my scope",
    'That"s above me',
    'I"m just a bot',
    "I got you in my next iteration",
  ];

  // Handle user input change
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (userInput < 1) {
      alert("Input required");
      return;
    }
    setWaiting(true);
    setTimeout(() => {
      const newResponse = {
        question: userInput,
        botReply:
          variousBotResponses[
            Math.floor(Math.random() * variousBotResponses.length)
          ],
      };
      setResponse([...response, newResponse]);
      setUserInput("");
      setResponse(response.concat(newResponse));
      setShowSuggested(false);
      setWaiting(false);
    }, 3000);
  };

  // Toggle suggested responses
  const getAutomatedBotResponse = (showSuggested) => {
    setShowSuggested(showSuggested);
  };

  // Handle automated bot response
  const automatedResponseHandler = (event) => {
    getAutomatedBotResponse();
    const matchedSuggestion = suggestedResponses.find(
      (suggested) => suggested.userId === event.target.id
    );
    if (matchedSuggestion) {
      setResponse([...response, matchedSuggestion]);
    }
    setShowSuggested(false);
  };

  // Handle editing an entry
  const handleEdit = (id, newText) => {
    const updatedResponse = response.map((entry) =>
      entry.id === id ? { ...entry, question: newText } : entry
    );
    setResponse(updatedResponse);
    setEditingId(null); // Reset editing ID
  };

  // Handle new search
  const handleNewSearch = () => {
    setHistory(history.concat(response));
    setShowSuggested(true);
    setUserInput("");
    setSuggestedResponses([]);
    setResponse([]);
  };

  return (
    <>
      {/* Header */}
      <AppBar
        sx={{
          backgroundColor: "#242424",
          fontWeight: 700,
          height: "5rem",
          padding: "1rem",
          position: "static",
          minWidth: "100px",
        }}
      >
        <Header onClick={handleNewSearch} />
      </AppBar>

      <Stack
        direction="column"
        spacing={2}
        sx={{ display: "flex", "align-items": "center" }}
      >
        {/* Main content */}
        <div></div>
        <Box
          sx={{
            margin: "0 1rem",
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: 300,
            overflow: "scroll",
          }}
        >
          {showSuggested && <Greetings />}

          {waiting ? (
            <CircularProgress sx={{ color: "LightGray", margin: "0 1rem" }} />
          ) : (
            <ul className="outer-ul">
              {/* Map through response array to render Display and Answer components */}
              {response.map((input) => (
                <React.Fragment key={input.id}>
                  <Display
                    key={`display-${input.id}`}
                    response={input.question}
                    id={input.id}
                    onEdit={handleEdit}
                    isEditing={editingId === input.id}
                  />
                  <Answer
                    key={`answer-${input.id}`}
                    response={input.botReply}
                    variousBotResponses={variousBotResponses}
                    setResponse={setResponse}
                  />
                </React.Fragment>
              ))}
            </ul>
          )}
        </Box>
        {/* Suggested buttons and form */}
        <div className="search-container">
          <div className="btn-container">
            {showSuggested &&
              suggestedResponses.map((suggested) => (
                <Button
                  key={suggested.userId}
                  text={suggested.question}
                  id={suggested.userId}
                  onClick={automatedResponseHandler}
                  type="text"
                />
              ))}
          </div>

          <div className="form-container">
            <form className="form" onSubmit={handleFormSubmit}>
              <textarea
                className="textArea"
                value={userInput}
                onChange={handleUserInput}
                placeholder="Ask StormAI anything!"
              />
              <Button text="submit" type="submit" />
            </form>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default App;
