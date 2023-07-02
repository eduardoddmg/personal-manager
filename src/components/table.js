import React from "react";
import * as Chakra from "@chakra-ui/react";
import { Loading } from "./loading";

export const Table = ({ loading, data, children, ...rest }) => {
  if (!loading && data?.length === 0)
    return (
      <Chakra.Center py={10}>
        <Chakra.Heading>Não há nenhum item cadastrado</Chakra.Heading>
      </Chakra.Center>
    );
  if (!loading) return <Chakra.Table {...rest}>{children}</Chakra.Table>;
  else return <Loading />;
};
