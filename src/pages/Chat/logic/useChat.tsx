import { useToast } from "@chakra-ui/toast";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { io, Socket } from "socket.io-client";

interface ChatContextType {
  channel: string;
  user: string;
  messages: Message[];
  sendMessage(message: string): void;
}

interface Message {
  user: string;
  channel: string;
  message: string;
  date: Date;
}

const ChatContext = createContext({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

const ChatContextProvider: React.FC = ({ children }) => {
  const { channel = "", user = "" } = useParams();
  const [, setSocketId] = useState(null);
  const socket = useRef<Socket>();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);

  const start = useCallback(async () => {
    const url = process.env.REACT_APP_API_URL;

    if (!url)
      return toast({
        title: "Erro",
        description: "Não foi configurado REACT_APP_API_URL!",
        status: "error",
      });

    socket.current = io(url);

    console.log(socket.current);

    socket.current.on("me", (id) => {
      toast({
        title: "Nova conexão",
        description: id,
        status: "success",
      });
      setSocketId(id);
    });

    socket.current.on("@new-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.current.on("@user-joined", (user) => {
      toast({ title: "Usuário entrou!", description: user });
    });

    socket.current.emit("@join-channel", { channel, user });
  }, [toast, channel, user]);

  const sendMessage = useCallback(
    (message: string) => {
      if (!socket.current) return;

      const newMessage: Message = {
        user,
        channel,
        message,
        date: new Date(),
      };

      socket.current.emit("@send-message", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    },
    [user, channel]
  );

  useEffect(() => {
    if (socket.current) return;

    start();
  }, [start]);

  return (
    <ChatContext.Provider value={{ channel, user, messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
