import { FaEdit, FaPooStorm } from "react-icons/fa";
import { Stack } from "@mui/material";

const Header = ({ onClick }) => {
  return (
    <Stack direction="row" spacing={2}>
      <p onClick={onClick}>
        {" "}
        <FaEdit />{" "}
      </p>
      <span>STORM AI</span>{" "}
      <span>
        <FaPooStorm />{" "}
      </span>
    </Stack>
  );
};

export default Header;
