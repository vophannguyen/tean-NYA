import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import UploadIcon from '@mui/icons-material/Upload';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Arrow() {
    const iconStyle = {
        width: "40px",
        height: "40px",
      };

    return (
        <ArrowOutwardIcon style={iconStyle} />
    )
};

const ArrowBack = () => {
    const iconStyle = {
        width: "40px",
        height: "40px",
      };
      
      return(
        <ArrowBackIcon style={iconStyle} />
      )
};

export { ArrowBack };