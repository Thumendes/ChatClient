import { Flex, Text } from "@chakra-ui/layout";
import { useChat } from "../logic/useChat";

const Header = () => {
  const { channel, user } = useChat();

  return (
    <Flex flexDir="column" justify="center">
      <Text fontWeight="bold" fontSize={24}>
        {user}
      </Text>
      <Text color="gray.300">{channel}</Text>
    </Flex>
  );
};

export default Header;
