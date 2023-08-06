import { ButtonLink, Table, SearchBar, CardValue, HeadComp } from "@/components";
import { readAll, remove as removeDoc, update } from "@/firebase";
import { WithAuth } from "@/hooks";
import React, { useEffect, useState } from "react";
import * as Chakra from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiRefreshCcw } from "react-icons/fi";

const badgeColor = {
  enemy: "red",
  friend: "green",
};

const Dashboard = () => {
  const [contacts, setContacts] = useState(null);
  const [contactsFilter, setContactsFilter] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);

    const result = await readAll("contacts");

    console.log(result);
    setContacts(result);
    setContactsFilter(result);

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const edit = (data) => {
    router.push(
      `/contacts/form?id=${data.id}`
    );
  };

  const remove = (id) => {
    removeDoc("contacts", id);
    fetchData();
    alert("Item apagado com sucesso");
  };

  return (
    <Chakra.Stack p={5}>
      <HeadComp title="Contatos" />
      <Chakra.Wrap spacing={3}>
        <CardValue
          title="Total"
          value={loading ? 0 : contacts?.length}
          color="gray"
        />
        <CardValue
          title="Amigos"
          value={
            loading
              ? 0
              : contacts?.filter((item) => item.type === "friend").length
          }
          color="green"
        />
        <CardValue
          title="Inimigos"
          value={
            loading
              ? 0
              : contacts?.filter((item) => item.type === "enemy").length
          }
          color="red"
        />
      </Chakra.Wrap>
      <Chakra.HStack>
        <ButtonLink w="80%" colorScheme="green" alignSelf="start" href="/contacts/form">
          Criar
        </ButtonLink>
        <Chakra.Button onClick={fetchData}>
          <FiRefreshCcw />
        </Chakra.Button>
      </Chakra.HStack>
      <SearchBar
        data={contacts}
        collection="contacts"
        field="name"
        setData={setContactsFilter}
      />
      <Table variant="striped" colorScheme="gray" loading={loading}>
        <Chakra.Thead>
          <Chakra.Tr>
            <Chakra.Th>Nome</Chakra.Th>
            <Chakra.Th>Email</Chakra.Th>
            <Chakra.Th>Tipo</Chakra.Th>
            <Chakra.Th>Última modificação</Chakra.Th>
          </Chakra.Tr>
        </Chakra.Thead>
        <Chakra.Tbody>
          {contactsFilter &&
            contactsFilter.map((contact) => {
              console.log(contacts);
              return (
                <Chakra.Tr key={contact.id}>
                  <Chakra.Td>{contact.name}</Chakra.Td>
                  <Chakra.Td>{contact.email}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Badge colorScheme={badgeColor[contact.type]}>
                      {contact.type || "Inexistente"}
                    </Chakra.Badge>
                  </Chakra.Td>
                  <Chakra.Td>{contact.updatedAt}</Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="orange"
                      onClick={() => edit(contact)}
                    >
                      Editar
                    </Chakra.Button>
                  </Chakra.Td>
                  <Chakra.Td>
                    <Chakra.Button
                      colorScheme="red"
                      onClick={() => remove(contact.id)}
                    >
                      Apagar
                    </Chakra.Button>
                  </Chakra.Td>
                </Chakra.Tr>
              );
            })}
        </Chakra.Tbody>
      </Table>
    </Chakra.Stack>
  );
};

export default WithAuth(Dashboard);
