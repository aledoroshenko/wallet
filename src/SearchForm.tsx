import { Box, Button, Form, FormField, Select, TextInput, Text } from "grommet";
import ethereumRegex from "ethereum-regex";
import React from "react";
import { useAppDispatch, TDispatch, TNetwork, useAppState } from "./reducer";
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

const spinning = (
  <svg
    version="1.1"
    viewBox="0 0 32 32"
    width="24px"
    height="24px"
    fill="#FFFFFF"
  >
    <path
      opacity=".25"
      d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
    />
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.8s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const Spinner = () => (
  <Box align="center" justify="center">
    {spinning}
  </Box>
);

export function SearchForm({ currentFormData }: TSearchFormProps) {
  const [value, setValue] = React.useState(currentFormData);
  const dispatch = useAppDispatch();
  const { isFetching } = useAppState();

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
          <Button
            type="submit"
            label={
              isFetching ? (
                <Box direction="row" gap="small">
                  <Spinner />
                  <Text size="medium"> Loading... </Text>
                </Box>
              ) : (
                "Search"
              )
            }
            primary
          />
        </Box>
      </Form>
    </React.Fragment>
  );
}
