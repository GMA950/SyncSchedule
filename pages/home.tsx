import Logo from "/banner.png";




const Home: FC = () => {
  const { Logo, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }
  return (
    <nav>
      user ? (
        <>
          <img src={Logo} alt = "website logo" />
         
        </>
      )
    </nav>
  );
};

export default Home;
export default () => {


  return <div style={{ color: "red" }}>hello world</div>;
};
