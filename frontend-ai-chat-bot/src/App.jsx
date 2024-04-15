import { useState } from "react";
import Button from "./components/Button";
import Display from "./components/Display";
import Answer from "./components/Answer";
import AddIcon from '@mui/icons-material/Add';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import ReplayIcon from '@mui/icons-material/Replay';

const App = (props) => {

  const [userInput, setUserInput] = useState("");
  const [search, setSearch] = useState(props.suggestions);
  const [response, setResponse] = useState([]);
  const [suggestedQuestion, setSuggestedQuestion] = useState("");
  const [history, setHistory] = useState([]);
  const [showSuggested, setShowSuggested] = useState(true)
  // const [thumbDownClicked, setThumbDownClicked] = useState(false);

  const variousBotResponses = [
    'I dont understand',
    'Let"s talk about that ',
    'Tell me more',
    'That is out of my scope',
    'That"s above me',
    'I"m just a bot', 
    'I got you in my next iteration'
  ]

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
    setTimeout(() => {
      const newResponse = {
        question: userInput,
        botReply:
          variousBotResponses[
          Math.floor(Math.random() * variousBotResponses.length)
          ]
      };
      setResponse([...response, newResponse]);
      setUserInput("");
      setResponse(response.concat(newResponse));
    }, 3000);
  };

  // Handling responses for suggested questions button that are on site at page load
  const getAutomatedBotResponse = (showSuggested) => {
    setShowSuggested(showSuggested);
  };

  //  Handling the static response from BOT will change when we plug in api 
  const automatedResponseHandler = (event) => {
    getAutomatedBotResponse()
    // map through all of the props.suggestions and which response matched  the current id (event.target.id) return the object that does and insert into response object
    const sqs = props.suggestions
    const currentSuggestions = sqs.map((suggested) => {
      if (suggested.userId === event.target.id) {
        return setResponse(response.concat(suggested));
      }
    })
    const buttonText = event.target.textContent;
    setSuggestedQuestion(buttonText);
    setShowSuggested(false)
  };

  const handleNewSearch = () => {
    setHistory(history.concat(response));
    setShowSuggested(true)
    setUserInput("");
    setSearch([]);
    setResponse([]);
    setSuggestedQuestion("");
  };
 
//   const handleThumbDownClick = () => {
//    setThumbDownClicked(true);
//  };
  const handleCopyAllClick = (response) => {
   // Copy the provided response from variousBotResponses array
   navigator.clipboard.writeText(response);
   alert(response + ' has been copied to clipboard');
  }; 
  const handleReplayClick = () => {
   const newResponse = generateRandomResponse(variousBotResponses);
   setResponse(prevResponse => [...prevResponse, newResponse]);
  };
  const generateRandomResponse = (responses) => {
  return {
    question: userInput,
    botReply: responses[Math.floor(Math.random() * responses.length)]
    };
  };

  return (
    <div>
        <AddIcon onClick={handleNewSearch}></AddIcon>
      <div>
        <h1>How can I help you today?</h1>
      </div>
      <ul>
        {response.map((input) => (
          <>
            <Display key={input.id} response={input.question} />
            <ul>
              <Answer key={input.userId} response={input.botReply} variousBotResponses={variousBotResponses} setResponse={setResponse}  />
              {/* <ThumbDownIcon onClick={handleThumbDownClick} style={{ color: thumbDownClicked ? 'red' : 'inherit' }} /> */}
              <CopyAllIcon onClick={() => handleCopyAllClick(input.botReply)} />
              <ReplayIcon onClick={handleReplayClick} />
            </ul>
          </>
        ))}
      </ul>
      <div className="search-container">
        <div className="btn-container">
          {showSuggested && props.suggestions.map((suggested) => (
            <>
              <Button
                text={suggested.question}
                id={suggested.userId}
                onClick={automatedResponseHandler}
                type="text"
              />
            </>
          ))
          }
        </div>
        <div>
          <form onSubmit={handleFormSubmit}>
            <input value={userInput} onChange={handleUserInput} />
            <Button text="submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;