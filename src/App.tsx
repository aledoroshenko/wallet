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
} from "grommet";

const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

const options = [
  { label: "rinkeby", value: "rinkeby" },
  { label: "mainnet", value: "mainnet" },
];

const defaultValue = {
  address: "",
  network: "rinkeby",
};

function App() {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <Grommet theme={theme}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >
        <Box
          width="large"
          height="large"
          background="white"
          elevation="medium"
          pad="medium"
        >
          <Box>
            <Heading margin="none">Wallet</Heading>
          </Box>

          <Box margin={{ top: "medium" }}>
            <Form
              value={value}
              onChange={(nextValue) => {
                console.log("Nextvalue", nextValue);
                setValue(nextValue);
              }}
              onReset={() => setValue(defaultValue)}
              onSubmit={({ value }: any) => {
                console.log(value);
              }}
            >
              <FormField
                name="address"
                htmlFor="address-id"
                label="Address"
                validate={{ regexp: /^[0-9]{4,6}$/, message: "4-6 digits" }}
              >
                <TextInput id="address-id" name="address" />
              </FormField>
              <FormField label="Network" name="network">
                <Select
                  name="network"
                  options={options}
                  labelKey="label"
                  valueKey="value"
                  value={options[0]}
                />
              </FormField>

              <Box direction="row" justify="between" margin={{ top: "medium" }}>
                <Button type="submit" label="Search" primary />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
