import { Card } from "@/components";
import { useAuth } from "@/context";
import { WithAuth, WithoutAuth } from "@/hooks";
import * as Chakra from "@chakra-ui/react";
import { MdDashboardCustomize } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { FaMoneyCheckAlt, FaQuestionCircle } from "react-icons/fa";
import { AiOutlinePaperClip } from "react-icons/ai";

const Home = () => {
  const auth = useAuth();

  console.log(auth);

  return (
    <Chakra.Flex p={10} direction="column" align="center" justify="center">
      <Chakra.Heading as="h1" size="xl" textAlign="center" mb={3}>
        Bem-vindo {auth.username} ao Sistema Faz-Tudo
      </Chakra.Heading>
      <Chakra.Text fontSize="lg" textAlign="center">
        Aqui você pode gerenciar facilmente todos os seus contatos.
      </Chakra.Text>
      <Chakra.Wrap w="full" spacing={5} my={10}>
        <Card
          href="/contacts"
          title="Contatos"
          subtitle="Aqui é o gerenciador de contatos"
          bg="green.600"
          icon={<BsFillPersonFill fontSize="50px" color="white" />}
        />
        <Card
          href="/expenses"
          title="Finanças"
          subtitle="Gerencie as suas finanças"
          bg="orange.500"
          icon={<FaMoneyCheckAlt fontSize="50px" color="white" />}
        />
        <Card
          href="/personal"
          title="Dados pessoais"
          subtitle="Aqui estão os seus dados pessoais"
          bg="red.500"
          icon={<AiOutlinePaperClip fontSize="50px" color="white" />}
        />
        <Card
          href="/about"
          title="Ajuda"
          subtitle="Tire as suas dúvidas aqui"
          bg="blue.500"
          icon={<FaQuestionCircle fontSize="50px" color="white" />}
        />
      </Chakra.Wrap>
    </Chakra.Flex>
  );
};

export default WithAuth(Home);
