import { AppBar, Button, Container } from "@material-ui/core";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import useUser from "../lib/useUser";
import LoginButton from "./LoginButton";
import styles from "./Header.module.scss";

function Header() {
  const { user } = useUser();

  return (
    <AppBar position="static" color="transparent" as="header">
      <Container maxWidth="lg">
        <nav className={styles["header-nav-wrapper"]}>
          <Link href="/" passHref>
            <a>
              <img
                className={styles["header-nav-logo"]}
                src="/images/logo.png"
                alt="Logo"
              />
            </a>
          </Link>
          <ul className={styles["header-nav-list"]}>
            <li className={styles["header-nav-item"]}>
              <ActiveLink
                activeClassName="MuiButton-textPrimary"
                href="/order"
                passHref
              >
                <Button size="small" disabled={!user?.isLoggedIn}>
                  Order
                </Button>
              </ActiveLink>
            </li>
            <li className={styles["header-nav-item"]}>
              <ActiveLink
                activeClassName="MuiButton-textPrimary"
                href="/order-list"
                passHref
              >
                <Button size="small" disabled={!user?.isLoggedIn}>
                  Order List
                </Button>
              </ActiveLink>
            </li>
            <li className={styles["header-nav-item"]}>
              <LoginButton isLoggedIn={user?.isLoggedIn} />
            </li>
          </ul>
        </nav>
      </Container>
    </AppBar>
  );
}

export default Header;
