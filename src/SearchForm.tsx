import { Box, Button, Form, FormField, Select, TextInput } from "grommet";
import ethereumRegex from "ethereum-regex";
import React from "react";
import { useAppDispatch, TDispatch, TNetwork } from "./reducer";
import { requestAccountData } from "./actions";

const objectOptions = [
  { label: "Rinkeby", value: "rinkeby" },
  { label: "Mainnet", value: "mainnet" },
];

function validateAddress(address: string) {
  const isValidAddress = ethereumRegex({ exact: true }).test(address);

  if (!isValidAddress) {
    return "Invalid address";
  }
}

type TSearchFormProps = {
  currentFormData: {
    address: string;
    network: TNetwork;
  };
};

export function SearchForm({ currentFormData }: TSearchFormProps) {
  const [value, setValue] = React.useState(currentFormData);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setValue(currentFormData);
  }, [currentFormData]);

  return (
    <React.Fragment>
      <Form
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue);
        }}
        onSubmit={({ value }: any) => {
          requestAccountData(
            dispatch as TDispatch,
            value.address,
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
