import { FaRegUser } from "react-icons/fa";
import { Stack } from "@mui/material";

const Display = ({ response }) => {
  return (
    <div>
      <li>
        <Stack direction="row" spacing={2}>
          <FaRegUser />
          <span>{response}</span>
        </Stack>
      </li>
    </div>
  );
};
export default Display;
