import { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { FaPooStorm } from "react-icons/fa";
import { Stack } from "@mui/material";

const Answer = ({ response }) => {
  const [thumbDownClicked, setThumbDownClicked] = useState(false);
  const handleThumbDownClick = () => {
    setThumbDownClicked(true);
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
        </Stack>
      </li>
    </>
  );
};
export default Answer;
