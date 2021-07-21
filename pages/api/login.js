import withSession from "../../lib/session";
import axios from "axios";

export default withSession(async (req, res) => {
  const { username, password } = await req.body;
  const { data } = await axios(
    "https://order-pizza-api.herokuapp.com/api/auth",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        password: username,
        username: password,
      }),
    }
  );
  const user = {
    isLoggedIn: true,
    username,
    password,
    authToken: data.access_token,
  };
  req.session.set("user", user);
  await req.session.save();
  res.json(user);
});
