import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Container sx={{ py: 4 }} maxWidth="lg">
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;