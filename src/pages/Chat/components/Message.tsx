import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Message as MessageType, useChat } from "../logic/useChat";

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { user } = useChat();

  const getDate = (messageDate: string | Date) => {
    const date =
      typeof messageDate === "string" ? new Date(messageDate) : messageDate;

    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute}`;
  };

  const messageOtherBg = useColorModeValue("gray.300", "gray.600");
  const messageOwnBg = useColorModeValue("pink.300", "pink.500");
  const dateColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Flex
      justifyContent="space-between"
      mb={2}
      p={4}
      rounded="lg"
      w={["90%", "80%", "60%"]}
      shadow="lg"
      alignSelf={message.user === user ? "flex-end" : "flex-start"}
      bg={message.user === user ? messageOwnBg : messageOtherBg}
    >
      <Box>
        <Text fontWeight="bold">{message.user}</Text>
        <Text>{message.message}</Text>
      </Box>
      <Box textAlign="end">
        <Text fontSize={12} color={dateColor}>
          {getDate(message.date)}
        </Text>
      </Box>
    </Flex>
  );
};

export default Message;
