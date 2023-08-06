import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, InputNumber, Navigation, Select } from "@/components";
import { create, readOne, signUp, update } from "@/firebase";
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


  const fetchData = async () => {
    const result = await readOne("contacts", router.query.id);

    setValue("name", result.name);
    setValue("email", result.email);
    setValue("type", result.type);
  }

  useEffect(() => {
    if (router.query.id) fetchData();
  }, []);

  return (
    <Stack py={[2,10]}>
      <HeadComp title="Contato" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro
      </Heading>
      <Stack px={8} onSubmit={handleSubmit(onSubmit)} as="form">
        <Input
          title="Email"
          type="email"
          errors={errors?.email}
          {...register("email")}
          defaultValue=""
        />
        <Input
          title="Nome"
          type="text"
          errors={errors?.name}
          {...register("name")}
          defaultValue=""
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
      </Stack>
    </Stack>
  );
};

export default WithAuth(FormContact);
