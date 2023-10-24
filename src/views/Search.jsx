import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderThumb,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getMinMaxPages } from "../utils";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [minMax, setMinMax] = useState([,]);
  const [textInputs, setTextInputs] = useState({
    title: "",
    author: "",
    category: "",
    minDate: "",
    maxDate: "",
  });
  const [pageCount, setPageCount] = useState(["", ""]);

  const handleTextInputchange = (event) => {
    const { name, value } = event.target;
    setTextInputs({
      ...textInputs,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let filters = [];
    Object.entries(textInputs).forEach(([key, value]) => {
      if (value && value !== "") filters.push(`${key}=${value}`);
    });
    filters.push(`pageMin=${pageCount[0]}`);
    filters.push(`pageMax=${pageCount[1]}`);
    navigate(`/books/search?${filters.join("&")}`);
  };

  useEffect(() => {
    getMinMaxPages()
      .then((response) => {
        setPageCount([response.data.min, response.data.max]);
        setMinMax([response.data.min, response.data.max]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container my={8}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Heading>Búsqueda avanzada</Heading>
          <FormControl mt={10}>
            <FormLabel>Título</FormLabel>
            <Input
              type="text"
              name="title"
              value={textInputs.title}
              onChange={handleTextInputchange}
            />
          </FormControl>

          <Grid templateColumns="repeat(2, 1fr)" gap={6} my={8}>
            <GridItem>
              <FormControl>
                <FormLabel>Autor</FormLabel>
                <Input
                  type="text"
                  name="author"
                  value={textInputs.author}
                  onChange={handleTextInputchange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Categoría</FormLabel>
                <Input
                  type="text"
                  name="category"
                  value={textInputs.category}
                  onChange={handleTextInputchange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl>
            <FormLabel mb={10}>Páginas</FormLabel>
            <RangeSlider
              aria-label={["min", "max"]}
              onChange={(val) => setPageCount(val)}
              defaultValue={[pageCount[0], pageCount[1]]}
              min={minMax[0]}
              max={minMax[1]}
            >
              <RangeSliderMark value={minMax[0]} mt="1" ml="-2.5" fontSize="sm">
                {minMax[0]}
              </RangeSliderMark>
              <RangeSliderMark value={minMax[1]} mt="1" ml="-2.5" fontSize="sm">
                {minMax[1]}
              </RangeSliderMark>
              <RangeSliderMark
                value={pageCount[0]}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {pageCount[0]}
              </RangeSliderMark>
              <RangeSliderMark
                value={pageCount[1]}
                textAlign="center"
                bg="blue.500"
                color="white"
                mt="-10"
                ml="-5"
                w="12"
              >
                {pageCount[1]}
              </RangeSliderMark>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </FormControl>

          <Text fontWeight="500" mt={12}>
            Fecha de publicación
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={6} my={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Desde</FormLabel>
                <Input
                  name="minDate"
                  size="md"
                  type="date"
                  value={textInputs.minDate}
                  onChange={handleTextInputchange}
                />
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel>Hasta</FormLabel>
                <Input
                  name="maxDate"
                  size="md"
                  type="date"
                  value={textInputs.maxDate}
                  onChange={handleTextInputchange}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Button onClick={handleSubmit} colorScheme="blue">
            Buscar
          </Button>
        </>
      )}
    </Container>
  );
};

export default Search;