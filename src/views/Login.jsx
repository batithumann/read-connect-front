import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Container,
  Button,
  Flex,
  Checkbox,
  Stack,
  FormControl,
  FormLabel,
  Box,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const login = async () => {
    const urlServer = process.env.REACT_APP_BACKEND_URL;
    const endpoint = "/login";
    try {
      const credentials = {
        email: formState.email,
        password: formState.password,
      };
      const { data: token } = await axios.post(
        urlServer + endpoint,
        credentials
      );
      localStorage.setItem("token", token);
      navigate("/profile");
    } catch (error) {
      console.log(error);
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
          <Heading fontSize={"4xl"}>Entra a tu cuenta</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formState.password}
                onChange={handleInputChange}
                required
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={login}
              >
                Entrar
              </Button>
              <Flex justifyContent="center">
                <Text mr="2">
                  ¿No tienes cuenta?{" "}
                  <Link href="/register" color={"blue.400"}>
                    Regístrate
                  </Link>
                </Text>
              </Flex>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Login;
