import { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { FaPooStorm } from "react-icons/fa";
import { Stack } from "@mui/material";

const Answer = ({ response }) => {
  const [thumbDownClicked, setThumbDownClicked] = useState(false);
  const handleThumbDownClick = () => {
    setThumbDownClicked(!thumbDownClicked);
  };
  const handleCopyAllClick = (response) => {
    // Copy the provided response from variousBotResponses array
    navigator.clipboard.writeText(response);
    alert(response + " has been copied to clipboard");
  };

  return (
    <>
      <li>
        <Stack direction="row" spacing={2}>
          <FaPooStorm />
          <span>{response}</span>
          <ThumbDownIcon
            onClick={handleThumbDownClick}
            style={{ color: thumbDownClicked ? "red" : "inherit" }}
          />
          <CopyAllIcon onClick={() => handleCopyAllClick(response)} />
        </Stack>
      </li>
    </>
  );
};
export default Answer;
