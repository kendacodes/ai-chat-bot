import { useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import Answer from "./components/Answer";
import Header from "./components/Header";
import Greetings from "./components/Greetings";
import { Stack, Box, AppBar, CircularProgress } from "@mui/material";

const App = (props) => {
  const [userInput, setUserInput] = useState("");
  const [search, setSearch] = useState(props.suggestions);
  const [response, setResponse] = useState([]);
  const [history, setHistory] = useState([]);
  const [showSuggested, setShowSuggested] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const variousBotResponses = [
    "I dont understand",
    'Let"s talk about that ',
    "Tell me more",
    "That is out of my scope",
    'That"s above me',
    'I"m just a bot',
    "I got you in my next iteration",
  ];

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // On a form submit, we select a random response from the variousBotResponses array
  // Use a newResponse object with the user's input and a randomly selected bot reply, update the response state array with this new response, and clear the userInput state.
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

  // Handling responses for suggested questions button that are on site at page load
  const getAutomatedBotResponse = (showSuggested) => {
    setShowSuggested(showSuggested);
  };

  //  Handling the static response from BOT will change when we plug in api
  const automatedResponseHandler = (event) => {
    getAutomatedBotResponse();
    // map through all of the props.suggestions and which response matched  the current id (event.target.id) return the object that does and insert into response object
    const sqs = props.suggestions;
    const currentSuggestions = sqs.map((suggested) => {
      if (suggested.userId === event.target.id) {
        return setResponse(response.concat(suggested));
      }
    });
    setShowSuggested(false);
  };

  const handleNewSearch = () => {
    setHistory(history.concat(response));
    setShowSuggested(true);
    setUserInput("");
    setSearch([]);
    setResponse([]);
  };

  return (
    <>
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
              {response.map((input) => (
                <>
                  <Display key={input.id} response={input.question} />
                  <Answer
                    key={input.userId}
                    response={input.botReply}
                    variousBotResponses={variousBotResponses}
                    setResponse={setResponse}
                  />
                </>
              ))}
            </ul>
          )}
        </Box>
        <div className="search-container">
          <div className="btn-container">
            {showSuggested &&
              props.suggestions.map((suggested) => (
                <>
                  <Button
                    text={suggested.question}
                    id={suggested.userId}
                    onClick={automatedResponseHandler}
                    type="text"
                  />
                </>
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
