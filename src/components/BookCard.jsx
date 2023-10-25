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
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const BookCard = ({ book }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      my={10}
    >
      <Image
        objectFit="contain"
        objectPosition="top"
        minW="160px"
        maxW="160px"
        src={
          book.thumbnail_url ||
          "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg"
        }
        alt={book.title}
      />

      <Stack w="100%">
        <CardBody w="100%">
          <Heading size="md" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Box>
                {book.title}
                {book.categories.map((category, index) => {
                  return (
                    <Badge
                      key={index}
                      ml="2"
                      variant="solid"
                      colorScheme="purple"
                    >
                      {category.name}
                    </Badge>
                  );
                })}
                {book.authors.map((author, index) => {
                  return (
                    <Box
                      key={index}
                      color="gray.500"
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {author.name}
                    </Box>
                  );
                })}
              </Box>
              <Box
                textAlign="right"
                minW="90px"
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                {book.published_date &&
                  // moment(Date(book.published_date)).format("ll")
                  new Date(book.published_date).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
              </Box>
            </Flex>
          </Heading>

          <Text py="2">{book.short_description}</Text>
        </CardBody>

        <CardFooter>
          <Flex w="100%" justifyContent="space-between">
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
                {book.reviewCount || 0} reviews
              </Box>
            </Box>
            <Box>{book.page_count} páginas</Box>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
};

// export default BookCard;

export default BookCard;
