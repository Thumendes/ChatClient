import { Box, Flex, Text } from "@chakra-ui/layout";
import { useChat } from "../logic/useChat";

const Messages = () => {
  const { messages } = useChat();

  const getDate = (messageDate: string | Date) => {
    const date =
      typeof messageDate === "string" ? new Date(messageDate) : messageDate;

    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${hour}:${minute}`;
  };

  return (
    <Flex
      bg="gray.700"
      h="calc(100vh - 160px)"
      p={6}
      overflow="auto"
      rounded="lg"
      flexDir="column"
    >
      {messages.map((message, index) => (
        <Flex key={index} justifyContent="space-between" mb={2}>
          <Box>{message.message}</Box>
          <Box textAlign="end">
            <Text fontWeight="bold">
              {message.user}
            </Text>
            <Text fontSize={12} color="gray.300">
              {getDate(message.date)}
            </Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  );
};

export default Messages;
