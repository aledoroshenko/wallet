import { Box, Button, Form, FormField, Select, TextInput } from "grommet";
import ethereumRegex from "ethereum-regex";
import React from "react";
import { useAppDispatch, TDispatch, requestAccountData } from "./reducer";

const objectOptions = [
  { label: "Rinkeby", value: "rinkeby" },
  { label: "Mainnet", value: "mainnet" },
];

const defaultValue = {
  address: "",
  network: objectOptions[0].value,
};

function validateAddress(address: string) {
  const isValidAddress = ethereumRegex({ exact: true }).test(address);

  if (!isValidAddress) {
    return "Invalid address";
  }
}

export function SearchForm() {
  const [value, setValue] = React.useState(defaultValue);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Form
        value={value}
        onChange={(nextValue) => {
          console.log("Change", nextValue);
          setValue(nextValue);
        }}
        onReset={() => setValue(defaultValue)}
        onSubmit={({ value }: any) => {
          requestAccountData(
            dispatch as TDispatch,
            "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
            value.network
          );
        }}
      >
        <FormField
          name="address"
          htmlFor="address-id"
          label="Address"
          validate={validateAddress}
        >
          <TextInput
            placeholder="0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F"
            id="address-id"
            name="address"
          />
        </FormField>
        <FormField label="Network" name="network">
          <Select
            id="network"
            name="network"
            placeholder="Select"
            labelKey="label"
            valueKey={{ key: "value", reduce: true }}
            value={value.network}
            options={objectOptions}
          />
        </FormField>

        <Box direction="row" justify="between" margin={{ top: "medium" }}>
          <Button type="submit" label="Search" primary />
        </Box>
      </Form>
    </React.Fragment>
  );
}
