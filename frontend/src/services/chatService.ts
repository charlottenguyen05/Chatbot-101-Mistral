import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true;

export async function sendChatRequest(prompt: string) {
    const res = await axios.post("/chatbot/new", {prompt})
    if (!res) {
        throw new Error("Unable to send chat")
    }
    return await res.data;
}

export const getUserChats = async () => {
    const res = await axios.get("/chatbot/all-chats");
    if (res.status !== 200) {
      throw new Error("Unable to get chats");
    }
    return await res.data;
  };
  
export const deleteUserChats = async () => {
    const res = await axios.delete("/chatbot/delete");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    return await res.data;
  };