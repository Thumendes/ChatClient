import { useColorModeValue } from "@chakra-ui/color-mode";
import { Flex } from "@chakra-ui/layout";
import { useChat } from "../logic/useChat";
import Message from "./Message";

const Messages = () => {
  const { messages } = useChat();

  const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex
      bg={bgColor}
      h="calc(100vh - 160px)"
      p={6}
      overflow="auto"
      rounded="lg"
      flexDir="column"
    >
      {messages.map((message, index) => (
        <Message message={message} key={index} />
      ))}
    </Flex>
  );
};

export default Messages;
