import { useState } from "react";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Answer = ({ response }) => {
 const [thumbDownClicked, setThumbDownClicked] = useState(false);
 const handleThumbDownClick = () => {
   setThumbDownClicked(true);
 };
    
   return (
        <>
         <li>
          {response}
          <ThumbDownIcon onClick={handleThumbDownClick} style={{ color: thumbDownClicked ? 'red' : 'inherit' }} />
         </li>
        </>
    )
}
export default Answer;

