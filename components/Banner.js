import { Button, Card, Typography, makeStyles } from "@material-ui/core";
import Link from "next/link";
import styles from "./Banner.module.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "visible",
  },
}));

function Banner({ isLoggedIn }) {
  const classes = useStyles();
  return (
    <div className={styles["homepage-banner-wrapper"]}>
      <Card
        className={`${styles["homepage-banner"]} ${classes.root}`}
        variant="outlined"
      >
        <img
          className={`${styles["homepage-banner-image"]} ${styles["one"]}`}
          src="images/3d-pizza.png"
          alt=""
          aria-hidden
        />
        <img
          className={`${styles["homepage-banner-image"]} ${styles["two"]}`}
          src="images/3d-pizza-flip.png"
          alt=""
          aria-hidden
        />
        <Typography component="h1" variant="h3" gutterBottom>
          The Pizza Shop
        </Typography>
        {isLoggedIn && (
          <Link href="/order" passHref>
            <Button size="large" variant="contained" color="primary">
              Order Pizza
            </Button>
          </Link>
        )}

        {!isLoggedIn && (
          <>
            <Typography component="p" gutterBottom>
              Please log in to order.
            </Typography>
            <p></p>
            <Link href="/login" passHref>
              <Button size="large" variant="contained" color="primary">
                Log in
              </Button>
            </Link>
          </>
        )}
      </Card>
    </div>
  );
}

export default Banner;
