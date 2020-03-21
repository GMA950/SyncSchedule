import { NextPage } from "next";
import Router from "next/router";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Input, Label, Message } from "semantic-ui-react";
import { isEmail, isLength } from "validator";

import { AuthContext } from "../src/client/components/Auth/Context";

const LoginPage: NextPage = () => {
  const { login, error, user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      Router.push("/");
    }
  }, [user]);

  const valid = isEmail(email) && isLength(password, { min: 3, max: 100 });

  if (loading || user) {
    return <p>Cargando...</p>;
  }
  return (
    <>
      {error && (
        <div>
          <Message error>{error}</Message>
        </div>
      )}

      <Form
        onSubmit={async e => {
          e.preventDefault();
          login({ email, password });
        }}
      >
        <div className="back">
          <div className="tll2">
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(_e, { value }) => setEmail(value)}
            />
            <Label>Contraseña</Label>
            <Input
              name="password"
              type="password"
              value={password}
              onChange={(_e, { value }) => setPassword(value)}
            />
            <Button primary disabled={!valid} type="submit">
              Iniciar Sesion
            </Button>
          </div>
        </div>
        <div className="box2">
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
        
      </Form>
    </>
  );
};

export default LoginPage;
