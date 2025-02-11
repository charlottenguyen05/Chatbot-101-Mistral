import Markdown from 'react-markdown'
import { Box, Avatar, Typography } from "@mui/material";
import { useContext } from "react";

// Import the SyntaxHighlighter component to display formatted code blocks.
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

// Import a dark theme style for the code highlighting.
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { AuthContext } from "../providers/AuthProvider";

/**
 * A helper function that checks if a message contains code blocks marked by triple backticks (```).
 * If found, it splits the message into an array of strings separated by the triple backticks.
**/
function extractCodeFromString(message: string) {
  // Check if the message includes the triple backtick marker.
  if (message.includes("```")) {
    // Split the message into blocks based on the triple backticks.
    const blocks = message.split("```");
    return blocks; // Return the resulting array of blocks.
  }
}

/**
 * A helper function to determine if a given string segment looks like code.
 * It checks for the presence of common code characters such as '=', ';', '[', ']', '{', '}', '#', and '//'.
 **/
function isCodeBlock(str: string) {
  if (
    str.includes("=") ||   
    str.includes(";") ||   
    str.includes("[") ||   
    str.includes("]") ||   
    str.includes("{") || 
    str.includes("}") ||  
    str.includes("#") ||   
    str.includes("//")     
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

  // Conditional rendering based on the sender's role.
  return role == "assistant" ? (
    // Rendering for the assistant's message.
    <Box
      sx={{
        display: "flex",           // Arrange child components in a flex row.
        p: 2,                      // Apply padding.
        bgcolor: "#004d5612",      // Set a semi-transparent background color for the assistant.
        gap: 2,                    // Set the gap between child elements.
        borderRadius: 2,           // Round the corners.
        my: 1,                     // Set vertical margins.
      }}
    >

      <Avatar sx={{ ml: "0", mt:2}}>
        <img src="chatbot.png" alt="openai" width={"30px"} />
      </Avatar>


      <Box>
        {/* If no code blocks were found, render the entire content as simple text. */}
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}><Markdown>{content}</Markdown></Typography>
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
              <Typography sx={{ fontSize: "20px" }}><Markdown>{content}</Markdown></Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    // Rendering for the user's message.
    <Box
      sx={{
        display: "flex",         // Arrange child components in a flex row.
        p: 2,                    // Apply padding.
        bgcolor: "#004d56",      // Set a background color for the user message.
        gap: 2,                  // Set the gap between child elements.
        borderRadius: 2,         // Round the corners.
      }}
    >
      {/* Render the user's avatar.
          The avatar shows the initials of the user, extracted from the user's name.
          It assumes the user's name has at least two parts (e.g., "First Last"). */}
      <Avatar sx={{ ml: "0", bgcolor: "red", color: "white" }}>
        {auth?.user?.name[0]} {/* First letter of the user's first name */}
      </Avatar>

      {/* Container for the message content. */}
      <Box>
        {/* If no code blocks are detected, render the entire content as simple text. */}
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}

        {/* If there are code blocks, iterate over and render each block appropriately. */}
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
              <Typography sx={{ fontSize: "20px" }}><Markdown>{block}</Markdown></Typography>
            )
          )}
      </Box>
    </Box>
  );
};

// Export the ChatItem component as the default export of this module.
export default ChatLine;
