import { ButtonLink, Table, SearchBar, CardMoney } from "@/components";
import { readAll, remove as removeDoc, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";
import { parseDateToEn, sortByDateBr, sortByValue } from "@/utils";

const badgeColor = {
  entrada: "green",
  saida: "red",
};

const Expenses = () => {
  const [expenses, setExpenses] = useState(null);
  const [expensesFilter, setExpensesFilter] = useState(null);

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await readAll("expenses");

    setExpenses(result);
    setExpensesFilter(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const total = () => {
    return expenses?.reduce(
      (sum, item) =>
        parseInt(item.value) < 0
          ? sum - parseInt(item.value)
          : sum + parseInt(item.value),
      0
    );
  };

  const totalInput = () => {
    return expenses?.filter(item => item.type === "entrada").reduce(
      (sum, item) =>
        parseInt(item.value) < 0
          ? sum - parseInt(item.value)
          : sum + parseInt(item.value),
      0
    );
  };

  const totalExpense = () => {
    return expenses?.filter(item => item.type === "saida").reduce(
      (sum, item) =>
        parseInt(item.value) < 0
          ? sum - parseInt(item.value)
          : sum + parseInt(item.value),
      0
    );
  };

  const edit = (data) => {
    router.push(
      `/expenses/form?id=${data.id}&title=${data.title}&value=${
        data.value
      }&type=${data.type}&date=${parseDateToEn(data.date)}`
    );
  };

  const remove = (id) => {
    removeDoc("expenses", id);
    fetchData();
  };

  return (
    <Chakra.Stack p={5}>
      <Chakra.Wrap spacing={3} justify="start">
        <CardMoney title="Total" value={loading ? 0 : total()} color="gray" />
        <CardMoney title="Entrada" value={loading ? 0 : totalInput()} color="green" />
        <CardMoney title="Saída" value={loading ? 0 : totalExpense()} color="red" />
      </Chakra.Wrap>
      <Chakra.HStack>
        <ButtonLink w="80%" colorScheme="green" alignSelf={["stretch", "start"]} href="/expenses/form">
          Criar
        </ButtonLink>
        <Chakra.Button onClick={fetchData}>
          <FiRefreshCcw />
        </Chakra.Button>
      </Chakra.HStack>
      <SearchBar
        data={expenses}
        collection="expenses"
        field="name"
        setData={setExpensesFilter}
      />
      <Table
        variant="striped"
        colorScheme="gray"
        loading={loading}
        data={expenses}
      >
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>Titulo</Chakra.Th>
            <Chakra.Th>Valor</Chakra.Th>
            <Chakra.Th>Tipo</Chakra.Th>
            <Chakra.Th>Data</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>
          {expensesFilter &&
            sortByDateBr(expensesFilter, "date", false).map((expense) => {
              return (
                <Chakra.Tr key={expense.id}>
                  <Chakra.Td>{expense.title}</Chakra.Td>
                  <Chakra.Td>R$ {expense.value}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Badge colorScheme={badgeColor[expense.type]}>
                      {expense.type || "Inexistente"}
                    </Chakra.Badge>
                  </Chakra.Td>
                  <Chakra.Td>{expense.date}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="orange"
                      onClick={() => edit(expense)}
                    >
                      Editar
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="red"
                      onClick={() => remove(expense.id)}
                    >
                      Apagar
                    </Chakra.Button>
                  </Chakra.Td>
                </Chakra.Tr>
              )
            })}
        </Chakra.Tbody>
      </Table>
    </Chakra.Stack>
  );
};

export default WithAuth(Expenses);
