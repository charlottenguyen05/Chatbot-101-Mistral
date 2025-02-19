import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Box, IconButton, Tooltip } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support voice recorder")
  }

  return (
      <Tooltip title={listening ? "Stop Recording" : "Start Recording"}>
        <IconButton
          color={listening ? "error" : "primary"}
          onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening()}
        >
          {listening ? <StopIcon /> : <MicIcon />}
        </IconButton>
      </Tooltip>
  );
};
export default Dictaphone;
  {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>  */}