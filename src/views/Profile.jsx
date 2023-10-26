import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  Text,
  IconButton,
  Center,
  Box,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { getUser, isValidEmail, updateUser } from "../utils";
import Loading from "../components/Loading";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formState, setFormState] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    password: "",
    passwordRepeat: "",
  });
  const [error, setError] = useState({ message: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
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
      await updateUser(token, formState);
      setEdit(false);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      error.response && setError(error.response.data);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    getUser(token)
      .then((response) => {
        setUser(response.data);
        setFormState({
          name: response.data.name,
          email: response.data.email,
          password: "",
          passwordRepeat: "",
        });
      })
      .catch((error) => setError(error));
  }, [token, navigate, edit]);

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"top"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            {edit ? "Editar perfil" : user ? user.name : <Loading />}
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  src="https://avatars.dicebear.com/api/male/username.svg"
                >
                  {edit && (
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<EditIcon />}
                    />
                  )}
                </Avatar>
              </Center>
              <Center w="full">
                {!edit && (
                  <Button
                    w="full"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    Editar perfil
                  </Button>
                )}
              </Center>
            </Stack>
          </FormControl>
          {edit ? (
            <>
              <FormControl id="userName" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="name"
                  onChange={handleInputChange}
                  value={formState.name}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="nombre@ejemplo.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={formState.email}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  value={formState.password}
                />
              </FormControl>
              <FormControl id="passwordRepeat" isRequired>
                <FormLabel>Repite tu contraseña</FormLabel>
                <Input
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  name="passwordRepeat"
                  onChange={handleInputChange}
                  value={formState.passwordRepeat}
                />
              </FormControl>
              <Stack spacing={6} direction={["column", "row"]}>
                <Button
                  bg={"red.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "red.500",
                  }}
                  onClick={() => {
                    setEdit(false);
                    setError({ message: "" });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  bg={"blue.400"}
                  color={"white"}
                  w="full"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Actualizar
                </Button>
              </Stack>
              <Text color="red">{error.message}</Text>
            </>
          ) : (
            <>
              <Box p={6}>
                <Stack spacing={0} align={"center"} mb={5}>
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {user ? user.name : <Loading />}
                  </Heading>
                  <Text color="red">{error.message}</Text>
                  <Text color={"gray.500"}>{user && user.email}</Text>
                </Stack>

                <Stack direction={"row"} justify={"center"} spacing={6}>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Seguidores
                    </Text>
                  </Stack>
                  <Stack spacing={0} align={"center"}>
                    <Text fontWeight={600}>0</Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Seguidos
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Profile;
