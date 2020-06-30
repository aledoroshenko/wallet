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
    recentAccountsIds,
    currentAccountId,
    accounts,
    isFetching,
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
            <SearchForm />
          </Box>

          {recentAccountsIds.length === 0 ? null : (
            <Box margin={{ top: "large" }}>
              <LastUsed ids={recentAccountsIds.slice(0, 5)} />
            </Box>
          )}

          {isFetching ? null : currentAccountId ? (
            <Box margin={{ top: "large" }}>
              <TransactionsList
                id={currentAccountId}
                transactions={accounts[currentAccountId].transactions}
              />
            </Box>
          ) : null}
        </Box>
      </Box>
    </Grommet>
  );
}

export default App;
