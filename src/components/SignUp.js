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
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";



const SignUp = ({ setFormStep, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState('');

  const [createUserWithEmailAndPassword, newUser, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === confirmPassword) {
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName: username })
        console.log('Updated');
        onClose();
      }

    }
    catch (error) {
      console.log('handleSubmit error', error);
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
            onChange={(e) => {
              if (e.target.value.includes(' ') || e.target.value.length > 40) return;
              setUsername(e.target.value)
            }}
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
