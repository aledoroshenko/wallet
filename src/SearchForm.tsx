import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Select,
  TextInput,
} from "grommet";
import React from "react";

const options = [
  { label: "rinkeby", value: "rinkeby" },
  { label: "mainnet", value: "mainnet" },
];

const defaultValue = {
  address: "",
  network: "rinkeby",
};

export function SearchForm() {
  const [value, setValue] = React.useState(defaultValue);

  return (
    <React.Fragment>
      <Form
        value={value}
        onChange={(nextValue) => {
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
          <TextInput
            placeholder="0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
            id="address-id"
            name="address"
          />
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
    </React.Fragment>
  );
}
