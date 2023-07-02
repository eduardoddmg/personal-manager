import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Input, InputNumber, Select } from "@/components";
import { create, signUp, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FormContact = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const auth = useAuth();
  const router = useRouter();

  const onSubmit = (data) => {
    data.userId = auth.token;
    if (router.query.id)
      update("contacts", router.query.id, data)
      .then(() => router.push("/contacts"));
    else 
      create("contacts", data)
      .then(() => router.push("/contacts"));
  };

  useEffect(() => {
    setValue("name", router.query.name);
    setValue("email", router.query.email);
    setValue("type", router.query.type);
  }, []);

  return (
    <Stack p={20}>
      <Heading as="h2" textAlign="center" mb={6}>
        Registro
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Email"
          type="email"
          errors={errors?.email}
          {...register("email")}
          defaultValue="email@email.com"
        />
        <Input
          title="Nome"
          type="text"
          errors={errors?.name}
          {...register("name")}
          defaultValue="teste"
        />
        <InputNumber
          title="Idade"
          errors={errors?.age}
          {...register("age")}
          defaultValue={10}
        />
        <Select title="Tipo" {...register("type")}>
          <option value="friend">Amigo</option>
          <option value="enemy">Inimigo</option>
        </Select>
        <Button colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormContact);
