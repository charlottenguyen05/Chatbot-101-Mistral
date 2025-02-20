import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Box, IconButton, Tooltip } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { Dispatch, SetStateAction, useEffect } from "react";

const Recorder = ({
  setMessage
}: {
  setMessage: Dispatch<SetStateAction<string>>;
}) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support speech recognition")
  }

  useEffect(() => {
    setMessage(transcript)
  }, [transcript])

  const handleStopRecording = () => {
    SpeechRecognition.startListening()
    resetTranscript()
  }
  
  return (
    <Tooltip title={listening ? "Stop Recording" : "Start Recording"}>
      <IconButton
        sx={{ color: "white" }}
        onClick={() =>
          listening
            ? handleStopRecording
            : SpeechRecognition.startListening(({
              language: "fr-FR", // Pass selected language here
            }))}
      >
        {listening ? <StopIcon /> : <MicIcon />}
      </IconButton>
    </Tooltip>
  );
};
export default Recorder;
{
  /* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>  */
}
