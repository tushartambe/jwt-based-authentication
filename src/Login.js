import React, {useState} from "react";

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          history.push('/dashboard');
          alert("Success");
        } else {
          throw new Error(res.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  };

  return (
    <section>
      <h2>Log In</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="yourmail@domain.com"
          value={email}
          onChange={e => setEmail(e.target.value)}/>
        <input
          type="password"
          placeholder="your password"
          value={password}
          onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Submit"/>
      </form>
    </section>
  );
}
export default Login;