import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext, useState } from "react";
import { Label, List, Table } from "semantic-ui-react";

import bloques from "../bloques.json";
import dias from "../dias.json";
import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

const TablaHorario = () => {
  /**
   * {
   *      "0-1": 2,
   *      "2-3": 4
   * }
   */
  const [contadoresHorarios, setContadoresHorarios] = useState<
    Record<string, number>
  >({});

  /**
   * ["0-1", "2-3", "5-1"]
   */
  const [horariosVotados, setHorariosVotados] = useState<string[]>([]);

  console.log({
    contadoresHorarios,
    horariosVotados
  });

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          {dias.map(dia => {
            return <Table.HeaderCell key={dia}>{dia}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {bloques.map((bloque, x) => {
          return (
            <Table.Row key={bloque.id}>
              <Table.Cell textAlign="center">
                {bloque.inicio}-{bloque.fin}
              </Table.Cell>
              {dias.map((dia, y) => {
                const posicion = `${x}-${y}`;
                const contador =
                  contadoresHorarios[posicion] || Math.round(Math.random() * 5); // Quitar este random

                return (
                  <Table.Cell
                    key={dia}
                    onClick={() => {
                      if (horariosVotados.includes(posicion)) {
                        setContadoresHorarios({
                          ...contadoresHorarios,
                          [posicion]: contador - 1
                        });
                        setHorariosVotados(
                          horariosVotados.filter(
                            posicionValue => posicionValue !== posicion
                          )
                        );
                      } else {
                        setContadoresHorarios({
                          ...contadoresHorarios,
                          [posicion]: contador + 1
                        });
                        setHorariosVotados([...horariosVotados, posicion]);
                      }
                    }}
                  >
                    {contador}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const UsersList: FC = () => {
  const [{ data, loading, error }] = useAxios<User[]>("/api/users");

  if (loading) {
    return <p>Cargando Usuarios...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error! {error.message}</p>;
  }

  return (
    <div>
      <List ordered animated divided>
        {data.map(({ email, password }, key) => (
          <List.Item key={key}>
            <List bulleted>
              <List.Item>Email: {email}</List.Item>
              <List.Item>Contraseña: {password}</List.Item>
            </List>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const Index: NextPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Label>Cargando...</Label>;
  }
  if (user) {
    return <UsersList />;
  }

  return (
    <div>
      <div className="back">
        <div className="tll1">
          <Label>¡Tienes que haber iniciado sesión!</Label>
        </div>
        <TablaHorario />
      </div>
    </div>
  );
};

export default Index;
