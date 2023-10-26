"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signup, isValidEmail } from "../utils";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({ message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    if (formState.password !== formState.passwordRepeat) {
      setError({ message: "Las contraseñas no coinciden" });
      return;
    }
    if (!isValidEmail(formState.email)) {
      setError({ message: "El email es inválido" });
      return;
    }
    if (
      formState.name === "" ||
      formState.email === "" ||
      formState.password === "" ||
      formState.passwordRepeat === ""
    ) {
      setError({ message: "Debes completar todos los campos" });
      return;
    }
    try {
      await signup(formState);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"top"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} minW={"md"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Formulario de registro
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                />
              </FormControl>
            </Box>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Repita su contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPasswordRepeat ? "text" : "password"}
                  name="passwordRepeat"
                  value={formState.passwordRepeat}
                  onChange={handleInputChange}
                  required
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPasswordRepeat(
                        (showPasswordRepeat) => !showPasswordRepeat
                      )
                    }
                  >
                    {showPasswordRepeat ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSignup}
              >
                Registrarse
              </Button>
              <Text color={"red"}>{error.message}</Text>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" color={"blue.400"}>
                  Acceder
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
