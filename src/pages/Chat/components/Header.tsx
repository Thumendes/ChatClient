import { Flex, Link, Text } from "@chakra-ui/layout";
import { useChat } from "../logic/useChat";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Header = () => {
  const { channel, user } = useChat();

  return (
    <Flex justifyContent="space-between">
      <Flex flexDir="column" justify="center">
        <Flex align="center">
          <Text color="gray.400" mr={4} fontSize={12}>
            Sala
          </Text>
          <Text fontWeight="bold" fontSize={24}>
            {channel}
          </Text>
        </Flex>

        <Flex align="center">
          <Text color="gray.400" mr={4} fontSize={12}>
            Usuário
          </Text>
          <Text color="gray.300" fontSize={18}>
            {user}
          </Text>
        </Flex>
      </Flex>

      <Flex align="center">
        <RouterLink to="/">
          <Link
            colorScheme="pink"
            display="flex"
            flexDir="row"
            alignItems="center"
          >
            <Text mr={2}>Voltar</Text>
            <FiLogOut />
          </Link>
        </RouterLink>
      </Flex>
    </Flex>
  );
};

export default Header;
