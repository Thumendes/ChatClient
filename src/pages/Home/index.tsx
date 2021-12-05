import {
  Container,
  Flex,
  Heading,
  Input,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const toast = useToast();
  const [form, setForm] = useState({
    user: "",
    channel: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.user) {
      return toast({
        title: "Atenção!",
        description: "O campo usuário é obrigatório!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    const finalChannel = form.channel || uuid().split("-")[0];

    navigate(`/user/${form.user}/channel/${finalChannel}`);
  }

  const onChange =
    (name: string) =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
      setForm({ ...form, [name]: value });

  return (
    <Container maxW="container.xl">
      <Flex align="center" justify="center" h="100vh" flexDir="column">
        <Heading mb={16}>Chat app</Heading>

        <form onSubmit={handleSubmit}>
          <FormControl mb={6}>
            <FormLabel>O nome que vai aparecer para as pessoas</FormLabel>
            <Input
              onChange={onChange("user")}
              focusBorderColor="pink.500"
              placeholder="Comedor de ..."
            />
          </FormControl>

          <FormControl mb={6}>
            <FormLabel>Nome do canal</FormLabel>
            <Input
              onChange={onChange("channel")}
              focusBorderColor="pink.500"
              placeholder="Casa das tia..."
            />
            <FormHelperText>Deixe em branco para criar uma sala</FormHelperText>
          </FormControl>

          <Button colorScheme="pink" w="100%" type="submit">
            Entrar
          </Button>
        </form>
      </Flex>
    </Container>
  );
};

export default HomePage;
