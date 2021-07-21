import Link from "next/link";
import { useRouter } from "next/router";
import fetchJSON from "../lib/fetchJSON";
import useUser from "../lib/useUser";
import { Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function LoginButton({ isLoggedIn }) {
  const { mutateUser } = useUser();
  const router = useRouter();
  if (isLoggedIn) {
    return (
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
    return (
      <Link href="/login" passHref>
        <Button size="small" variant="contained" color="primary">
          Log in
        </Button>
      </Link>
    );
  }
}

export default LoginButton;
