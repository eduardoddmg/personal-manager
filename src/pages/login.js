import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, Input } from "@/components";
import { login } from "@/firebase";
import { useAuth } from "@/context";
import { WithoutAuth } from "@/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.login)});

  const auth = useAuth();

  const onSubmit = async (data) => {
    console.log(data);
    auth.login(data.email, data.password);
  };

  return (
    <Chakra.Flex py={20} align="center" justify="center">
      <Chakra.Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        maxWidth="400px"
        width="100%"
      >
        <Chakra.Heading as="h2" textAlign="center" mb={6}>
          Login
        </Chakra.Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            title="Email"
            type="email"
            errors={errors?.email}
            {...register("email")}
          />
          <Input
            title="Senha"
            type="password"
            errors={errors?.password}
            {...register("password")}
          />
          <Chakra.Button
            colorScheme="blue"
            size="lg"
            width="100%"
            mb={4}
            type="submit"
          >
            Login
          </Chakra.Button>
        </form>
        <Chakra.Text textAlign="center">
          Esqueceu a sua senha?{" "}
          <ButtonLink variant="link" href="/forgot-password" color="blue.500"> Clique aqui </ButtonLink>
        </Chakra.Text>
        <Chakra.Divider pt={3} />
        <Chakra.Text textAlign="center" pt={3}>
          Ainda não tem uma conta?{" "}
          <ButtonLink variant="link" href="/register" color="blue.500"> Crie sua conta </ButtonLink>
        </Chakra.Text>
      </Chakra.Box>
    </Chakra.Flex>
  );
};

export default WithoutAuth(Login);