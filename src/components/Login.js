import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Text,
} from "@chakra-ui/react";
import { auth } from "../firebaseConfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = ({ setFormStep, onClose }) => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(email, password);
    onClose();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" mt={2} isLoading={loading}>
          Log In
        </Button>
        <Text>
          Don't have an account?{" "}
          <Link
            onClick={() => {
              setFormStep("signup");
            }}
          >
            Sign Up
          </Link>
        </Text>
        {error && <Text color="red.400">{error.message}</Text>}
      </form>
    </React.Fragment>
  );
};

export default Login;
