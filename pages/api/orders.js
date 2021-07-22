import axios from "axios";
const basePath = "https://order-pizza-api.herokuapp.com/api";

const handler = async (req, res) => {
  if (req.method === "GET") {
    await axios
      .get(`${basePath}/orders`)
      .then((response) => {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else if (req.method === "POST") {
    const { Crust, Flavor, Size, Table_No, authToken } = await req.body;
    const data = JSON.stringify({
      Crust: Crust,
      Flavor: Flavor,
      Size: Size,
      Table_No: Table_No,
    });

    const config = {
      method: "post",
      url: "https://order-pizza-api.herokuapp.com/api/orders",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        const errorStatus = error.response.status;
        if (errorStatus === 401) {
          res.status(401).end(`Session expired, log in again.`);
        } else if (errorStatus === 409) {
          res.status(409).end(`Conflict: item already exists in object.`);
        } else {
          console.log(error);
        }
      });
  } else if (req.method === "DELETE") {
    const { orderId } = await req.body;
    await axios
      .delete(`${basePath}/orders/${orderId}`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export default handler;
