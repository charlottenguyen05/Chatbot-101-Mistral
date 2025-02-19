import { useContext, useEffect, useRef, useState } from "react";
import { Typography, Box, IconButton, Button, Avatar } from "@mui/material";
import { AuthContext } from "../providers/AuthProvider";
import ChatLine from "../components/ChatLine";
import {
  deleteUserChats,
  sendChatRequest,
  getUserChats,
} from "../services/chatService";
import { IoMdSend } from "react-icons/io";
import red from "@mui/material/colors/red";
import Recorder from "../components/Recorder";

type ChatType = {
  role: "assistant" | "user";
  content: String | null;
};

const welcomeChat: ChatType = {
  role: "assistant",
  content: "Bonjour, comment je peux vous aider",
};

const Chat = () => {
  const auth = useContext(AuthContext);
  const [chats, setChats] = useState<ChatType[]>([welcomeChat]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;
    if (inputRef.current && inputRef) {
      inputRef.current.value = "";
    }
    const newMessage: ChatType = { role: "user", content };
    setChats((prev) => [...prev, newMessage]);

    // Send new message to Mistral API and update with a response
    const response = await sendChatRequest(content);
    setChats([...response.chats]);

    const messages = document.getElementById('scroll-box');
    messages!.scrollTop = messages!.scrollHeight
  };

  const handleDeleteChats = async () => {
    await deleteUserChats();
    setChats([welcomeChat]);
  };

  // Get all the chats to present it
  useEffect(() => {
    const getAllChats = async () => {
      const data = await getUserChats();
      if (data.chats.length > 0) {
        setChats(data.chats);
      }
    };
    getAllChats();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 15,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto" }}>
          Vous discutez avec un ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", mt:4, p: 2, display: "flex", textAlign: "center" }}>
          💡 Posez vos questions sur le savoir, le monde des affaires, les conseils, l'éducation et bien d'autres sujets.
          </Typography>
          <Typography sx={{ mx: "auto", p:2, display: "flex", textAlign: "center" }}>
          ⚠️ Évitez de partager des informations personnelles.
          </Typography>
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Supprime l'historique du chat
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model: Mistral Small
        </Typography>
        <Box
          id="scroll-box"
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chats.map((chat, index) => (
            //@ts-ignore
            <ChatLine content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          {" "}
          <input
            ref={inputRef}
            name="content"
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <Recorder/>
          <IconButton type="submit" sx={{ color: "white", mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
