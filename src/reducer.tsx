import React from "react";

export type TTransaction = {
  blockNumber: string;
  timeStamp: number;
  value: string;
};

type TAction =
  | { type: "ACCOUNT_DATA_REQUESTED" }
  | {
      type: "ACCOUNT_DATA_RECEIVED";
      data: { balance: string; transactions: TTransaction[]; account: string };
    };

export type TDispatch = (action: TAction) => void;

type TState = {
  isFetching: boolean;
  currentAccountId: string | null;
  accounts: {
    [key: string]: {
      balance: string;
      transactions: TTransaction[];
    };
  };
  recentAccountsIds: string[];
};
type TAppProviderProps = { children: React.ReactNode };

export const initialState: TState = {
  isFetching: false,
  currentAccountId: null,
  accounts: {},
  recentAccountsIds: [],
};

export function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "ACCOUNT_DATA_REQUESTED":
      return {
        ...state,
        isFetching: true,
      };
    case "ACCOUNT_DATA_RECEIVED":
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.data.account]: {
            ...state.accounts[action.data.account],
            balance: action.data.balance,
            transactions: action.data.transactions,
          },
        },
        currentAccountId: action.data.account,
        recentAccountsIds: [...state.recentAccountsIds, action.data.account],
        isFetching: false,
      };
    default:
      return state;
  }
}

const AppStateContext = React.createContext<TState>(undefined!);
const AppDispatchContext = React.createContext<TDispatch>(undefined!);

export function AppProvider({ children }: TAppProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return React.useContext(AppStateContext);
}

export function useAppDispatch() {
  const context = React.useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error("useAppDispatch must be used within a CountProvider");
  }

  return context;
}

function getUrlsForNetwork(network: "rinkeby" | "mainnet", account: string) {
  const apiKey = "PAX4HJUWPXC5TMG26IAHITAH2EIV6WFWHC";

  if (network === "mainnet") {
    return {
      accountBalanceUrl: `https://api.etherscan.io/api?module=account&action=balance&address=${account}&apikey=${apiKey}`,
      accountTransactionsUrl: `http://api.etherscan.io/api?module=account&action=txlist&sort=desc&address=${account}&apikey=${apiKey}`,
    };
  }

  return {
    accountBalanceUrl: `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${account}&apikey=${apiKey}`,
    accountTransactionsUrl: `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&sort=desc&address=${account}&apikey=${apiKey}`,
  };
}

export async function requestAccountData(
  dispatch: TDispatch,
  account: string,
  network: "rinkeby" | "mainnet"
) {
  console.log(network);
  dispatch({ type: "ACCOUNT_DATA_REQUESTED" });

  const { accountBalanceUrl, accountTransactionsUrl } = getUrlsForNetwork(
    network,
    account
  );

  let transactionsResponse = await fetch(accountTransactionsUrl);

  let { result: transactions } = await transactionsResponse.json();

  let balanceResponse = await fetch(accountBalanceUrl);
  let { result: balance } = await balanceResponse.json();

  dispatch({
    type: "ACCOUNT_DATA_RECEIVED",
    data: { transactions: transactions.slice(0, 10), balance, account },
  });
}
