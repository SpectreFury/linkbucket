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
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { firestore } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const SignUp = ({ setFormStep, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  const [createUserWithEmailAndPassword, newUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const response = await createUserWithEmailAndPassword(email, password);
      await setDoc(doc(firestore, "users", response.user.email), {
        username: username,
      });
      onClose();
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="confirm-password">Password</FormLabel>
          <Input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormControl>
        <Button type="submit" mt={2} isLoading={loading}>
          Sign Up
        </Button>
        <Text>
          Already have an account?
          <Link
            onClick={() => {
              setFormStep("login");
            }}
          >
            Log In
          </Link>
        </Text>
        {error && <Text color="red.400">{error.message}</Text>}
      </form>
    </React.Fragment>
  );
};

export default SignUp;
