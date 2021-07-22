import React, { useState, Fragment } from "react";
import Link from "next/link";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import withSession from "../lib/session";
import * as Yup from "yup";
import axios from "axios";
import fetchJSON from "../lib/fetchJSON";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  CircularProgress,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

const validationSchema = Yup.object({
  pizzas: Yup.array().of(
    Yup.object({
      crust: Yup.string().required("Crust is required"),
      flavor: Yup.string().required("Flavor is required"),
      table: Yup.number()
        .typeError("Table must be a number")
        .min(1, "Invalid Table Number")
        .max(100, "Invalid Table Number")
        .required("Table Number is required"),
      size: Yup.string().required("Size is required"),
    })
  ),
});

function Order({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box my={5}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h4">
          Order Pizza
        </Typography>
        <Formik
          initialValues={{
            pizzas: [
              {
                table: "",
                crust: "NORMAL",
                flavor: "CHEESE",
                size: "S",
              },
            ],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              let counter = 0;
              const arrLength = values.pizzas.length;
              const pizzaData = values.pizzas;

              for (let i = 0; i < arrLength; i++) {
                const { crust, flavor, size, table } = pizzaData[i];

                await axios({
                  method: "POST",
                  url: "/api/orders",
                  data: {
                    Crust: crust,
                    Flavor: flavor,
                    Size: size,
                    Table_No: table,
                    authToken: user.authToken,
                  },
                });
                counter++;
                if (counter === arrLength) {
                  setOpen(true);
                  resetForm({});
                }
              }
            } catch (error) {
              if (error.response.status === 401) {
                alert("Session has expired, you must log in again.");
                fetchJSON("/api/logout", { method: "POST" }).then(() => {
                  router.push("/login");
                  router.reload(window.location.pathname);
                  return;
                });
              } else if (error.response.status === 409) {
                alert(
                  "One or more of your orders already exists in your order list. Please delete those orders or order a unique pizza."
                );
                resetForm({});
                return;
              } else {
                alert(`An error has occured. ${error}`);
                resetForm({});
                return;
              }
            }
          }}
          render={({ values }) => (
            <Form autoComplete="off">
              <FieldArray
                name="pizzas"
                render={(arrayHelpers) => {
                  const pizzas = values.pizzas;
                  return (
                    <Grid container spacing={2} direction="column">
                      {pizzas && pizzas.length > 0
                        ? pizzas.map((pizza, index) => (
                            <Fragment key={index}>
                              <Grid item>
                                <Box
                                  mb={2}
                                  mt={4}
                                  display="flex"
                                  alignItems="center"
                                >
                                  <Typography component="p" variant="h6">
                                    Pizza #{index + 1}
                                  </Typography>
                                  {index > 0 && (
                                    <Box ml={2}>
                                      <Button
                                        color="secondary"
                                        size="small"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                      >
                                        Delete
                                      </Button>
                                    </Box>
                                  )}
                                </Box>
                                <Box mb={1}>
                                  <InputLabel htmlFor={`pizzas.${index}.table`}>
                                    Table Number
                                  </InputLabel>
                                </Box>
                                <Field
                                  name={`pizzas.${index}.table`}
                                  type="number"
                                  className="table-number"
                                  label="Table Number"
                                />
                                <ErrorMessage
                                  name={`pizzas.${index}.table`}
                                  render={(msg) => (
                                    <Typography color="error">{msg}</Typography>
                                  )}
                                />
                              </Grid>
                              <Grid item>
                                <Box mb={1}>
                                  <InputLabel htmlFor={`pizzas.${index}.crust`}>
                                    Crust
                                  </InputLabel>
                                </Box>
                                <Field
                                  as="select"
                                  className="order-select"
                                  name={`pizzas.${index}.crust`}
                                  label="Crust"
                                >
                                  <option value="THIN">Thin</option>
                                  <option value="NORMAL">Normal</option>
                                  <option value="DEEP-DISH">Deep Dish</option>
                                  <option value="GLUTEN-FREE">
                                    Gluten Free
                                  </option>
                                </Field>
                                <ErrorMessage name={`pizzas.${index}.crust`} />
                              </Grid>
                              <Grid item>
                                <Box mb={1}>
                                  <InputLabel
                                    htmlFor={`pizzas.${index}.flavor`}
                                  >
                                    Flavor
                                  </InputLabel>
                                </Box>
                                <Field
                                  as="select"
                                  className="order-select"
                                  label="Flavor"
                                  name={`pizzas.${index}.flavor`}
                                >
                                  <option value="CHEESE">Cheese</option>
                                  <option value="PEPPERONI">Pepperoni</option>
                                  <option value="CHICKEN-FAJITA">
                                    Chicken-Fajita
                                  </option>
                                  <option value="BEEF-NORMAL">
                                    Beef-Normal
                                  </option>
                                </Field>
                                <ErrorMessage name={`pizzas.${index}.flavor`} />
                              </Grid>
                              <Grid item>
                                <Box mb={1}>
                                  <InputLabel htmlFor={`pizzas.${index}.size`}>
                                    Size
                                  </InputLabel>
                                </Box>

                                <Field
                                  as="select"
                                  className="order-select"
                                  name={`pizzas.${index}.size`}
                                  label="Size"
                                >
                                  <option value="S">Small</option>
                                  <option value="M">Medium</option>
                                  <option value="L">Large</option>
                                </Field>
                                <ErrorMessage name={`pizzas.${index}.size`} />
                              </Grid>
                            </Fragment>
                          ))
                        : null}
                      <Grid item>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() =>
                            arrayHelpers.push({
                              table: "",
                              crust: "NORMAL",
                              flavor: "CHEESE",
                              size: "S",
                            })
                          }
                          startIcon={<AddIcon />}
                        >
                          Add a Pizza
                        </Button>
                      </Grid>

                      <Grid item>
                        <Box mt={4}>
                          <Button
                            color="primary"
                            variant="contained"
                            fullWidth
                            type="submit"
                            size="large"
                            disabled={Formik.isSubmitting}
                            startIcon={
                              Formik.isSubmitting ? (
                                <CircularProgress size="0.9rem" />
                              ) : (
                                <LocalPizzaIcon />
                              )
                            }
                          >
                            Order
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  );
                }}
              />
            </Form>
          )}
        />
        <Snackbar
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            severity="success"
            variant="filled"
            elevation={6}
            action={
              <Link href="/order-list" passHref>
                <Button size="small">View Order</Button>
              </Link>
            }
          >
            Pizza Order Success
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

export default Order;
