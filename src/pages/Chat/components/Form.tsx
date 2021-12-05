import { Button } from "@chakra-ui/button";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useChat } from "../logic/useChat";

const Form = () => {
  const [input, setInput] = useState("");
  const { sendMessage } = useChat();

  const onSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setInput(target.value);

  return (
    <Flex align="center">
      <form style={{ width: "100%" }} onSubmit={onSend}>
        <InputGroup w="100%">
          <Input
            onChange={onChange}
            value={input}
            variant="filled"
            focusBorderColor="pink.500"
            placeholder="Digite uma mensagem..."
          />
          <InputRightElement>
            <Button colorScheme="pink" type="submit">
              <FiSend size={34} />
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </Flex>
  );
};

export default Form;
