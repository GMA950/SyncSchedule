import useAxios from "axios-hooks";
import { NextPage } from "next";
import { FC, useContext, useState } from "react";
import { Label, List, Table } from "semantic-ui-react";

import bloques from "../bloques.json";
import dias from "../dias.json";
import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

const TablaHorario: FC = () => {
/*const UsersList: FC = () => {*/

  /**
   * [[0,1], [3,2], [5,7]]
   */
  const [horariosBloqueados, setHorariosBloqueados] = useState<
    [number, number][]
  >([]);

  console.log({
    horariosBloqueados
  });


  const [{ data, loading, error }] = useAxios<User[]>("/api/users");

  if (loading) {
    return <p>Cargando Usuarios...</p>;
  }
  if (error) {
    console.error(error);
    return <p>Error! {error.message}</p>;
  }
  
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
                return (
                  <Table.Cell
                    key={dia}
                    onClick={() => {
                      if (
                        horariosBloqueados.find(posicion => {
                          return posicion[0] === x && posicion[1] === y;
                        })
                      ) {
                        // Liberar horario
                        setHorariosBloqueados(
                          horariosBloqueados.filter(posicion => {
                            return !(posicion[0] === x && posicion[1] === y);
                          })
                        );
                      } else {
                        // Bloquear horario
                        setHorariosBloqueados([...horariosBloqueados, [x, y]]);
                      }
                    }}
                  >
                    {horariosBloqueados.find(posicion => {
                      return posicion[0] === x && posicion[1] === y;
                    })
                      ? "X"
                      : "O"}
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
/*
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
*/
const Index: NextPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Label>Cargando...</Label>;
  }
  if (user) {
    /*return <UsersList />;*/
    return <TablaHorario />;
  }

  return (
    <div>
      <div className="back">
        <div className="tll1">
          <Label>¡Tienes que haber iniciado sesión!</Label>
        </div>
       {/*<TablaHorario />*/}
      </div>
    </div>
  );
};

export default Index;
