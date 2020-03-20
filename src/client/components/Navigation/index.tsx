import Link from "next/link";
import { FC, useContext } from "react";
import { Button, Label } from "semantic-ui-react";

import { AuthContext } from "../Auth/Context";

const Navigation: FC = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <nav className="banner">
      {user ? (
        <>
          <div className="botones">
            <Label>Bienvenido {user.email}</Label>
            <Button color="red" onClick={() => logout()}>
              Cerrar Sesión
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="botones">
            <Link href="/login" passHref>
              {/*<Button primary>Iniciar Sesión</Button>*/}
              <Button color="orange">Iniciar Sesión</Button>
            </Link>
            <Link href="/signUp" passHref>
              <Button color="green">Registrarse</Button>
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
