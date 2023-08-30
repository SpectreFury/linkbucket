import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Buckets from "./pages/Buckets";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import { useDisclosure } from "@chakra-ui/react";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <main style={{ width: "400px", height: "600px", background: "#352F44" }}>
      <Navbar user={user} userLoading={loading} onOpen={onOpen} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          }
        />

        <Route path="/buckets" element={<Buckets user={user} />} />
      </Routes>
    </main>
  );
}

export default App;
