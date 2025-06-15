import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });
  const toast = useToast();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      toast({
        status: "success",
        title: "Yayy!",
        description: "Friend created successfully",
        duration: 2000,
        position: "top-center",
      });
      onClose();
      setUsers((prev) => [...prev, data]);
      setInputs({
        name: "",
        role: "",
        description: "",
        gender: "",
      });
    } catch (error) {
      toast({
        status: "error",
        title: "An Error happened",
        description: error.message,
        duration: 4000,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue />
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleCreateUser}>
          <ModalContent>
            <ModalHeader>My new BFF</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Deo"
                    value={inputs.name}
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="Softeware Engineer"
                    value={inputs.role}
                    onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                  placeholder="He's a software engineer who loves to code and build things."
                />

                <RadioGroup mt={4}>
                  <Flex gap={5}>
                    <Radio value="male" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                      Male
                    </Radio>
                    <Radio value="female" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                      Female
                    </Radio>
                  </Flex>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
export default CreateUserModal;
