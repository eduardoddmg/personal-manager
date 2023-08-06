import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ButtonLink, Input } from "@/components";
import { signUp } from "@/firebase";
import { WithoutAuth } from "@/hooks";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as schema from "@/schema";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema.register)});

  const router = useRouter();
  const toast = Chakra.useToast();

  const onSubmit = async (data) => {
    const result = await signUp(data.email, data.password, data.username);
    if (result.success) {
      router.push("/login");
    }
    toast({
      title: result.message,
      status: result.status,
      duration: 2000,
    });
    console.log(data);
  };

  return (
    <Flex py={20} align="center" justify="center">
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w={["100%", "80%", "50%"]}
      >
        <Heading as="h2" textAlign="center" mb={6}>
          Registro
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            title="Email"
            type="email"
            errors={errors?.email}
            {...register("email")}
          />
          <Input
            title="Username"
            type="text"
            errors={errors?.username}
            {...register("username")}
          />
          <Input
            title="Senha"
            type="password"
            errors={errors?.password}
            {...register("password")}
          />
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            mb={4}
            type="submit"
          >
            Registro
          </Button>
        </form>
        <Chakra.Text textAlign="center">
          Entre na sua conta?{" "}
          <ButtonLink variant="link" href="/login" color="blue.500">
            {" "}
            Entre na sua conta{" "}
          </ButtonLink>
        </Chakra.Text>
      </Box>
    </Flex>
  );
};

export default WithoutAuth(Register);
