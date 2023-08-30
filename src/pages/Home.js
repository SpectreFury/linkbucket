/*global chrome*/
import React, { useState, useEffect } from "react";
import BucketList from "../components/BucketList";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Stack,
  Radio,
  Tabs,
  TabList,
  Tab,
  Spinner,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { firestore, auth } from "../firebaseConfig";
import {
  addDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import FilteredBucketList from "../components/FilteredBucketList";
import { AddIcon } from "@chakra-ui/icons";

const Home = ({ user, isOpen, onOpen, onClose }) => {
  const {
    isOpen: bucketIsOpen,
    onOpen: bucketOnOpen,
    onClose: bucketOnClose,
  } = useDisclosure();

  const [formStep, setFormStep] = useState("login");
  const [bucketName, setBucketName] = useState("");
  const [bucketPrivacy, setBucketPrivacy] = useState("public");
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [buckets, setBuckets] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const duplicateBucket = buckets.find(
      (bucket) => bucket.title === bucketName && bucket.author === user.email
    );
    if (duplicateBucket) {
      return;
    }
    setLoading(true);

    const data = {
      username: user.displayName,
      title: bucketName,
      author: user.email,
      bucket: [],
      upvotes: [],
      visibility: bucketPrivacy,
    };

    try {
      const docRef = await addDoc(collection(firestore, "buckets"), data);
      data.id = docRef.id;
      await updateDoc(doc(firestore, "buckets", docRef.id), {
        id: docRef.id,
      });
      setBuckets((prev) => [...prev, data]);
      bucketOnClose();
    } catch (error) {
      console.log("handleSubmit error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchBuckets = async () => {
      setInitialLoading(true);
      const querySnapshot = await getDocs(collection(firestore, "buckets"));
      querySnapshot.docs.map((doc) =>
        setBuckets((prev) => [...prev, doc.data()])
      );
      setInitialLoading(false);
    };

    fetchBuckets();
  }, []);

  return (
    <React.Fragment>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {formStep === "login" && (
              <Login setFormStep={setFormStep} onClose={onClose} />
            )}
            {formStep === "signup" && (
              <SignUp setFormStep={setFormStep} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={bucketIsOpen} onClose={bucketOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Bucket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Stack>
                <FormControl>
                  <FormLabel>Name of the bucket</FormLabel>
                  <Input
                    type="text"
                    colorScheme="linkedin"
                    value={bucketName}
                    onChange={(e) => setBucketName(e.target.value)}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Visibility</FormLabel>
                  <RadioGroup
                    defaultValue="public"
                    value={bucketPrivacy}
                    onChange={(newValue) => setBucketPrivacy(newValue)}
                  >
                    <Stack>
                      <Radio value="public">Public</Radio>
                      <Radio value="private">Private</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Button
                mt={2}
                colorScheme="linkedin"
                type="submit"
                isLoading={loading}
              >
                Create Bucket
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex justifyContent="center" alignItems="center" mt={2}>
        <Tabs
          variant="soft-rounded"
          index={tabIndex}
          onChange={(newIndex) => setTabIndex(newIndex)}
          justifyContent="center"
        >
          <TabList>
            <Tab>Browse Buckets</Tab>
            <Tab>Your Buckets</Tab>
          </TabList>
        </Tabs>
      </Flex>
      {initialLoading ? (
        <Flex justifyContent="center" mt={40}>
          <Spinner size="xl" color="blue.400" />
        </Flex>
      ) : (
        <React.Fragment>
          {tabIndex === 0 && <BucketList buckets={buckets} setBuckets={setBuckets} user={user} />}
          {tabIndex === 1 && (
            <FilteredBucketList buckets={buckets} user={user} setBuckets={setBuckets} />
          )}
          {user && (
            <Flex justifyContent="center" mt={2} gap={4}>
              <IconButton size="sm" icon={<AddIcon />} onClick={bucketOnOpen} />
            </Flex>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
