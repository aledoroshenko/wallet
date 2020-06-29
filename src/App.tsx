import React from "react";
import {
  Grommet,
  Box,
  Main,
  Heading,
  Select,
  FormField,
  TextInput,
  Button,
  Form,
  List,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "grommet";
import { LastUsed } from "./LastUsed";
import { SearchForm } from "./SearchForm";
import { TransactionsList } from "./TransactionsList";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >
        <Box width="large" background="white" elevation="medium" pad="medium">
          <Box>
            <Heading>Wallet</Heading>
          </Box>

          <Box>
            <SearchForm />
          </Box>

          <Box margin={{ top: "large" }}>
            <LastUsed />
          </Box>

          <Box margin={{ top: "large" }}>
            <TransactionsList />
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
