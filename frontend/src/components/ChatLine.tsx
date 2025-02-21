import Markdown from 'react-markdown'
import { Box, Avatar, Typography } from "@mui/material";
import { useContext } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AuthContext } from "../providers/AuthProvider";


function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks; 
  }
}


function isCodeBlock(str: string) {
  if (
    str.includes("=") ||   
    str.includes(";") ||   
    str.includes("[") ||   
    str.includes("]") ||   
    str.includes("{") || 
    str.includes("}") ||   
    str.includes("npm") ||
    str.includes("├──")
  ) {
    return true;
  }
  return false;
}

/**
 * The ChatItem component renders an individual chat message.
 * It handles two types of messages: one from the assistant and one from the user.
**/
const ChatLine = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const auth = useContext(AuthContext);
  // Use the helper function to attempt to extract code blocks from the content.
  const messageBlocks = extractCodeFromString(content);
  console.log(content)

  return role == "assistant" ? (
    // Rendering for the assistant's message.
    <Box
      sx={{
        display: "flex",           
        p: 2,                      
        bgcolor: "#072038",      
        gap: 2,                    
        borderRadius: 2,       
        my: 1,              
      }}
    >

      <Avatar sx={{ ml: "0", mt:2}}>
        <img src="chatbot.png" alt="openai" width={"30px"} />
      </Avatar>


      <Box>
        {/* If no code blocks were found, render the entire content as simple text. */}
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px" }}><Markdown>{content}</Markdown></Typography>
        )}

        {/* If code blocks exist, iterate over each block. */}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            // Check if the current block appears to be code.
            isCodeBlock(block) ? (
              // Render the block as highlighted code.
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              // Otherwise, render the block as standard text.
              <Typography sx={{ fontSize: "16px" }}><Markdown>{block}</Markdown></Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    // Rendering for the user's message.
    <Box
      sx={{
        display: "flex",        
        p: 2,                    
        bgcolor: "#004d56",    
        gap: 2,                 
        borderRadius: 2,      
      }}
    >
      <Avatar sx={{ ml: "0", bgcolor: "red", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>

      {/* Container for the message content. */}
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "16px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block) =>
            isCodeBlock(block) ? (
              // Render the block as highlighted code.
              <SyntaxHighlighter style={coldarkDark} language="javascript">
                {block}
              </SyntaxHighlighter>
            ) : (
              // Otherwise, render the block as regular text.
              <Typography sx={{ fontSize: "16px" }}><Markdown>{block}</Markdown></Typography>
            )
          )}
      </Box>
    </Box>
  );
};

// Export the ChatItem component as the default export of this module.
export default ChatLine;
