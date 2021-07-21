import { AppBar, Button, Container } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import useUser from "../lib/useUser";
import fetchJSON from "../lib/fetchJSON";
import { useRouter } from "next/router";
import styles from "./Header.module.scss";

function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();
  let LoginButton;
  if (user?.isLoggedIn) {
    LoginButton = (
      <Button
        href="/api/logout"
        onClick={async (e) => {
          e.preventDefault();
          mutateUser(await fetchJSON("/api/logout", { method: "POST" }), false);
          router.push("/login");
        }}
        size="small"
        startIcon={<ExitToAppIcon />}
      >
        Sign out
      </Button>
    );
  } else {
    LoginButton = (
      <Link href="/login" passHref>
        <Button size="small" variant="contained" color="primary">
          Log in
        </Button>
      </Link>
    );
  }
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
            <li className={styles["header-nav-item"]}>{LoginButton}</li>
          </ul>
        </nav>
      </Container>
    </AppBar>
  );
}

export default Header;
