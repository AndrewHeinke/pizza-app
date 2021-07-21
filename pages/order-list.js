import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Snackbar,
  Container,
  TextField,
  InputAdornment,
  Card,
  CardActions,
  CardContent,
  Typography,
  Divider,
  makeStyles,
} from "@material-ui/core";
import withSession from "../lib/session";
import { useRouter } from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import { Alert, Skeleton } from "@material-ui/lab";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./order-list.module.scss";

const useStyles = makeStyles({
  root: {
    margin: "2rem auto",
    maxWidth: "600px",
    display: "flex",
  },
});

function OrderList({ user }) {
  const router = useRouter();
  const classes = useStyles();
  const [orders, setOrders] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [deletedPizzaMessage, setDeletedPizzaMessage] = useState(null);

  const getOrders = async () => {
    const response = await axios({ method: "GET", url: "/api/orders" });
    const { data } = await response;
    setOrders(data);
  };

  const deleteOrder = async (orderId) => {
    const config = {
      method: "DELETE",
      url: "/api/orders/",
      data: { orderId: orderId },
    };

    axios(config)
      .then(() => {
        getOrders();
        setDeletedPizzaMessage(`ID: ${orderId}`);
      })
      .then(() => {
        setSearchText("");
        setOpen(true);
      })
      .catch((error) => {
        if (error.response.status === 504) {
          alert(
            "This order is not in the system. Refresh page to fetch latest orders."
          );
          router.reload(window.location.pathname);
        }

        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (value) => {
    setSearchText(value);
    filterOrders(value);
  };

  const filterOrders = (value) => {
    const searchValue = value.toLowerCase().trim();
    if (searchValue === "") {
      getOrders();
    } else {
      const filteredOrders = orders.filter((order) => {
        return Object.keys(order).some((key) => {
          return order[key].toString().toLowerCase().includes(searchValue);
        });
      });
      setOrders(filteredOrders);
    }
  };

  const getPizzaImage = (flavor) => {
    if (flavor === "CHEESE") {
      return "/images/cheese-pizza.png";
    } else if (flavor === "PEPPERONI") {
      return "/images/pepperoni-pizza.png";
    } else if (flavor === "CHICKEN-FAJITA") {
      return "/images/chicken-fajita-pizza.png";
    } else if (flavor === "BEEF-NORMAL") {
      return "/images/beef-pizza.png";
    } else {
      return "https://via.placeholder.com/75";
    }
  };

  return (
    <Box mb={8}>
      <Container maxWidth="xl">
        <TextField
          name="search"
          classes={{
            root: classes.root,
          }}
          spellCheck="false"
          autoComplete="off"
          variant="outlined"
          size="small"
          id="search"
          value={searchText}
          onChange={(e) => handleChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <ul className={styles["order-list"]}>
          {!orders &&
            [...Array(15)].map((item, i) => (
              <Skeleton
                animation="wave"
                variant="rect"
                width="auto"
                height={260}
                key={i}
              />
            ))}
          {orders && orders.length === 0 && (
            <Card variant="outlined">
              <Box p={2}>
                <Typography align="center" color="error">
                  No Orders Found
                </Typography>
              </Box>
            </Card>
          )}
          {orders?.map((order, i) => {
            return (
              <li key={i}>
                <Card variant="outlined">
                  <CardContent className={styles["pizza-card-content"]}>
                    <img
                      className={styles["pizza-img"]}
                      src={getPizzaImage(order.Flavor)}
                      alt=""
                    />
                    <div className={styles["order-detail-row"]}>
                      <span className={styles["order-detail-title"]}>
                        Table Number:
                      </span>{" "}
                      {order.Table_No}
                    </div>

                    <div className={styles["order-detail-row"]}>
                      <span className={styles["order-detail-title"]}>
                        Crust:
                      </span>{" "}
                      {order.Crust}
                    </div>

                    <div className={styles["order-detail-row"]}>
                      <span className={styles["order-detail-title"]}>
                        Flavor:
                      </span>{" "}
                      {order.Flavor}
                    </div>

                    <div className={styles["order-detail-row"]}>
                      <span className={styles["order-detail-title"]}>
                        Size:
                      </span>{" "}
                      {order.Size}
                    </div>

                    <div className={styles["order-detail-row"]}>
                      <span className={styles["order-detail-title"]}>
                        Order ID:
                      </span>{" "}
                      {order.Order_ID}
                    </div>

                    <div>
                      <span className={styles["order-detail-title"]}>
                        Time of Order:
                      </span>{" "}
                      {order.Timestamp}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      color="secondary"
                      onClick={() => {
                        deleteOrder(order.Order_ID);
                      }}
                      startIcon={<DeleteIcon />}
                    >
                      Cancel Order
                    </Button>
                  </CardActions>
                </Card>
              </li>
            );
          })}
        </ul>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            severity="error"
            variant="filled"
            elevation={6}
            onClose={handleClose}
          >
            Pizza Order {deletedPizzaMessage} Cancelled.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { user: req.session.get("user") },
  };
});

export default OrderList;
