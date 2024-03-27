import { Alert } from "@mui/material"
import ErrorProps from "../types/Error";

const Error: React.FC<ErrorProps> = ({ errorMessage }) => {
  return (
    <Alert severity="error" sx={{ width: '50%', height: '50px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {errorMessage}
    </Alert>
  )
}

export default Error;