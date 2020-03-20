import useAxios from "axios-hooks";
import { NextPage } from "next";
import Link from "next/link";
import { FC, useContext } from "react";
import { Label, List } from "semantic-ui-react";

import { AuthContext } from "../src/client/components/Auth/Context";
import { User } from "../src/interfaces";

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
        <Link href="/crearHorario">
          <button>Crear Horario</button>
        </Link>
        <br />
        <Link href="/votaHorario">
          <a>Votar Horario</a>
        </Link>
      </div>
    </div>
  );
};

export default Index;
