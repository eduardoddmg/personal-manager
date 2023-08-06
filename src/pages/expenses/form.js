import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { HeadComp, Input, InputNumber, InputNumberMoney, Select } from "@/components";
import { create, signUp, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import { useAuth } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { defaultDate, parseDateToBr, parseSecondsToDate } from "@/utils";
import * as schema from "@/schema";
import { yupResolver } from "@hookform/resolvers/yup";

const FormExpenses = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema.expenses) });

  const auth = useAuth();
  const router = useRouter();

  const format = (val) => "$" + val;
  const parse = (val) => val.replace(/^\$/, "");

  const onSubmit = (data) => {
    data.userId = auth.token;
    data.date = parseDateToBr(data.date);

    if (router.query.id)
      update("expenses", router.query.id, data).then(() =>
        router.push("/expenses")
      );
    else create("expenses", data).then(() => router.push("/expenses"));
  };

  useEffect(() => {
    console.log(defaultDate());
    if (Object.keys(router.query).length !== 0) {
      console.log("estou chegando aqui");
      setValue("title", router.query.title);
      setValue("value", router.query.value);
      setValue("type", router.query.type);
      setValue("date", router.query.date);
    }
  }, []);

  return (
    <Stack p={[2,20]} w="50%" mx="auto">
      <HeadComp title="Economias" />
      <Heading as="h2" textAlign="center" mb={6}>
        Registro
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          title="Titulo"
          type="text"
          errors={errors?.title}
          {...register("title")}
        />
        <InputNumberMoney
          title="Valor"
          errors={errors?.value}
          {...register("value")}
          defaultValue={10}
          precision={2}
          step={0.5}
        />
        <Input
          title="Data"
          type="date"
          errors={errors?.date}
          {...register("date")}
          defaultValue={defaultDate()}
        />
        <Select title="Tipo" {...register("type")}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </Select>
        <Button colorScheme="blue" size="lg" width="100%" mb={4} type="submit">
          Registro
        </Button>
      </form>
    </Stack>
  );
};

export default WithAuth(FormExpenses);
