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
      <div className="botones2">
        <Link href="/crearHorario">
          <button>Crear Horario</button>
        </Link>
        <br />
        <Link href="/votaHorario">
          <button>Votar Horario</button>
        </Link>
      </div>
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
      {/*<div className="back">*/}
        <div className="tll1">
          <Label>¡Tienes que haber iniciado sesión!</Label>
        </div>
          <div className="box1">
            <div className="texto1" >
              ¡La nueva forma de organizarse!
            </div>
            <br/>
            <br/>
            <br/>
            <div className="texto2" >
            <span style={{color: "red"}}>Sync</span>Schedule es una herramienta pensada para la orgnizacion de eventos grupales
              <br/>
              <br/>
              como clases, ayudantias, citaciones, etc. 
              <br/>
              <br/>
              Ideada para que sea fácil de usar para todos y de forma grauita.
            </div>
            <div className="pos1">
              <Link href="/signUp">
                <div className="feedback-button">
                  {/*<Link href="/crearHorario">REGISTRARSE</Link>*/}
                  REGISTRARSE
                </div>
              </Link>
            </div>
          </div>
      {/*</div>*/}
    </div>
  );
};

export default Index;
