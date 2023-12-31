import {
  Box,
  Card,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Flex,
  Image,
  Badge,
  Button,
  ButtonGroup,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Link,
} from "@chakra-ui/react";
import {
  CheckIcon,
  AddIcon,
  StarIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { addUserBookStatus, getUserBookStatus } from "../utils";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const [bookAction, setBookAction] = useState("Quiero leerlo");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  const bookActionSubmit = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    const status = bookAction === "Quiero leerlo" ? "wishlist" : "finished";
    try {
      await addUserBookStatus(token, book.id, status);
      setAdded(true);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (token) {
      getUserBookStatus(token, book.id)
        .then((response) => {
          if (response.data.status) {
            setBookAction(
              response.data.status === "finished"
                ? "Ya lo leí"
                : "Quiero leerlo"
            );
            setAdded(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setLoading(false);
  }, [token, book]);

  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my={10}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Link href={`/books/details/${book.id}`}>
            <Image
              objectFit="contain"
              objectPosition="top"
              minW="200px"
              maxW="350px"
              src={
                book.thumbnail_url ||
                "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
              }
              alt={book.title}
            />
          </Link>

          <Stack w="100%">
            <CardBody w="100%">
              <Heading size="md" w="100%">
                <Box>
                  <Text>
                    <Link href={`/books/details/${book.id}`}>{book.title}</Link>
                  </Text>
                  {book.categories.map((category, index) => {
                    return (
                      <Badge
                        key={index}
                        ml="2"
                        variant="solid"
                        colorScheme="purple"
                      >
                        <Link href={`/books/search?category=${category.name}`}>
                          {category.name}
                        </Link>
                      </Badge>
                    );
                  })}
                  <Flex flexDirection={"column"}>
                    {book.authors.map((author, index) => {
                      return (
                        <Link
                          key={index}
                          color="gray.500"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          ml="2"
                          href={`/books/search?author=${author.name}`}
                        >
                          {author.name}
                        </Link>
                      );
                    })}
                  </Flex>
                  <Flex
                    flexDirection="column"
                    textAlign="right"
                    minW="90px"
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    <Text>
                      {book.published_date &&
                        new Date(book.published_date).toLocaleDateString(
                          "es-ES",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                    </Text>
                    <Text>{book.page_count} páginas</Text>
                  </Flex>
                </Box>
              </Heading>

              <Text py="2">{book.short_description}</Text>
            </CardBody>

            <CardFooter>
              <Box
                w="100%"
                display={{ md: "flex", sm: "block" }}
                justifyContent="space-between"
                alignItems="end"
              >
                <Menu>
                  <ButtonGroup
                    isAttached
                    variant="solid"
                    colorScheme="blue"
                    mt={4}
                  >
                    <MenuButton
                      leftIcon={<ChevronDownIcon />}
                      as={Button}
                      minW="157px"
                    >
                      {bookAction}
                    </MenuButton>
                    <Button onClick={bookActionSubmit}>
                      {added ? <CheckIcon /> : <AddIcon />}
                    </Button>
                  </ButtonGroup>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setBookAction("Quiero Leerlo");
                        setAdded(false);
                      }}
                    >
                      Quiero leerlo
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setBookAction("Ya lo leí");
                        setAdded(false);
                      }}
                    >
                      Ya lo leí
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Box display="flex" mt="2" alignItems="center">
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < book.rating ? "teal.500" : "gray.300"}
                      />
                    ))}
                  <Box as="span" ml="2" color="gray.600" fontSize="sm">
                    {book.reviewCount || 0} reseñas
                  </Box>
                </Box>
              </Box>
            </CardFooter>
          </Stack>
        </>
      )}
    </Card>
  );
};

// export default BookCard;

export default BookCard;
