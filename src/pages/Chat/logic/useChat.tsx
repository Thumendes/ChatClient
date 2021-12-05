import { useToast } from "@chakra-ui/toast";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useParams } from "react-router";
import { ChatEvents } from "../../../data/chat";
import ws from "../../../services/ws";

interface ChatContextType {
  channel: string;
  user: string;
  messages: Message[];
  sendMessage(message: string): void;
}

export interface Message {
  user: string;
  channel: string;
  message: string;
  date: Date;
}

const cache = {
  started: false,
};

const ChatContext = createContext({} as ChatContextType);

export const useChat = () => useContext(ChatContext);

const ChatContextProvider: React.FC = ({ children }) => {
  const { channel = "", user = "" } = useParams();
  const [, setSocketId] = useState(null);
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);

  const start = useCallback(() => {
    ws.on(ChatEvents.Me, (id) => {
      toast({
        title: "Nova conexão",
        description: id,
        status: "success",
      });
      setSocketId(id);
    });

    ws.on(ChatEvents.NewMessage, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    ws.on(ChatEvents.UserJoined, (user) => {
      toast({ title: "Usuário entrou!", description: user });
    });

    ws.send(ChatEvents.JoinChannel, { channel, user });

    return () => {
      ws.clear(ChatEvents.Me);
      ws.clear(ChatEvents.NewMessage);
      ws.clear(ChatEvents.UserJoined);
      ws.clear(ChatEvents.JoinChannel);
    };
  }, [toast, channel, user]);

  const sendMessage = useCallback(
    (message: string) => {
      const newMessage: Message = {
        user,
        channel,
        message,
        date: new Date(),
      };

      ws.send(ChatEvents.SendMessage, newMessage);
      setMessages((prev) => [...prev, newMessage]);
    },
    [user, channel]
  );

  useEffect(() => {
    if (cache.started) return;

    const clear = start();
    cache.started = true;

    return () => clear();
  }, [start]);

  return (
    <ChatContext.Provider value={{ channel, user, messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
