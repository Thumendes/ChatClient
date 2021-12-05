import { Container, Grid } from "@chakra-ui/layout";
import Form from "./components/Form";
import Header from "./components/Header";
import Messages from "./components/Messages";
import ChatContextProvider from "./logic/useChat";

const ChatPage = () => {
  return (
    <ChatContextProvider>
      <Container maxW="container.xl">
        <Grid templateRows="80px 1fr 80px">
          <Header />
          <Messages />
          <Form />
        </Grid>
      </Container>
    </ChatContextProvider>
  );
};

export default ChatPage;
