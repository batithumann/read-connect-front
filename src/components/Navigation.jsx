"use client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { TbBooks } from "react-icons/tb";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Context from "../Context";
import NavLink from "./NavLink";
import { getUser } from "../utils";

const Navigation = () => {
  const { user, setUser } = useContext(Context);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate(0);
  };

  useEffect(() => {
    if (token) {
      getUser(token)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, navigate, setUser]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const search = () => {
    navigate(`/books?search=${searchInput}`);
  };

  const links = [
    {
      text: "Libros",
      href: "/books",
    },
    {
      text: "Buscar",
      href: "/search",
    },
    {
      text: "Comunidad",
      href: "/community",
    },
  ];

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={10}>
            <NavLink href="/" id="logo">
              <TbBooks fontSize="26" /> ReadConnect
            </NavLink>
            <HStack display={{ base: "none", md: "flex" }}>
              {links.map((link, index) => {
                return (
                  <NavLink key={index} href={link.href}>
                    {link.text}
                  </NavLink>
                );
              })}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <HStack spacing={7}>
              <InputGroup display={{ base: "none", md: "flex" }}>
                <Input
                  name="search"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Búsqueda rápida"
                />
                <InputRightElement cursor="pointer" onClick={search}>
                  <Search2Icon color="green.500" />
                </InputRightElement>
              </InputGroup>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{user ? user.name : <a href="/login">Login</a>}</p>
                  </Center>
                  <br />
                  {user ? (
                    <>
                      <MenuDivider />
                      <MenuItem onClick={() => navigate("/profile")}>
                        Mis datos
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/my_books")}>
                        Mis Libros
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={logout}>Salir</MenuItem>
                    </>
                  ) : (
                    ""
                  )}
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <InputGroup>
                <Input
                  name="search"
                  value={searchInput}
                  onChange={handleSearchChange}
                  placeholder="Búsqueda rápida"
                />
                <InputRightElement cursor="pointer" onClick={search}>
                  <Search2Icon color="green.500" />
                </InputRightElement>
              </InputGroup>
              {links.map((link, index) => {
                return (
                  <NavLink key={index} href={link.href}>
                    {link.text}
                  </NavLink>
                );
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navigation;
