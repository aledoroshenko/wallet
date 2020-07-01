import React from "react";
import { Grommet, Box, Heading } from "grommet";
import { LastUsed } from "./LastUsed";
import { SearchForm } from "./SearchForm";
import { TransactionsList } from "./TransactionsList";
import { useAppState } from "./reducer";

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
  const {
    recentIds,
    currentId,
    addressesById,
    isFetching,
    currentFormData,
  } = useAppState();

  return (
    <Grommet theme={theme}>
      <Box
        direction="row-responsive"
        justify="center"
        align="center"
        pad="xlarge"
        gap="medium"
      >
        <Box width="large" elevation="medium" pad="medium">
          <Box>
            <Heading>Wallet</Heading>
          </Box>

          <Box>
            <SearchForm currentFormData={currentFormData} />
          </Box>

          {recentIds.length === 0 ? null : (
            <Box margin={{ top: "large" }}>
              <LastUsed recentIds={recentIds.slice(0, 5)} />
            </Box>
          )}

          {isFetching ? null : currentId ? (
            <Box margin={{ top: "large" }}>
              <TransactionsList
                id={currentId}
                transactions={addressesById[currentId].transactions}
                balance={addressesById[currentId].balance}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
