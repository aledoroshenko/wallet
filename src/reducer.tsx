import React from "react";
import { v4 as uuidv4 } from "uuid";
import { cleanupTransactions } from "./utils";

export type TTransaction = {
  blockNumber: string;
  timeStamp: number;
  value: string;
};

export type TNetwork = "rinkeby" | "mainnet";

type TAction =
  | { type: "ACCOUNT_DATA_REQUESTED" }
  | {
      type: "ACCOUNT_DATA_RECEIVED";
      data: Omit<TAccountData, "id">;
    }
  | {
      type: "RECENTLY_USED_ADDRESS_SET";
      data: { address: string; network: TNetwork };
    };

type TAccountData = {
  balance: string;
  transactions: TTransaction[];
  address: string;
  network: TNetwork;
  id: string;
};

export type TDispatch = (action: TAction) => void;

type TState = {
  isFetching: boolean;
  currentId: string | null;
  addressesById: {
    [key: string]: TAccountData;
  };
  recentIds: string[];
  currentFormData: {
    address: string;
    network: TNetwork;
  };
};

type TAppProviderProps = { children: React.ReactNode };

export const initialState: TState = {
  isFetching: false,
  currentId: null,
  addressesById: {},
  recentIds: [],
  currentFormData: {
    address: "",
    network: "mainnet",
  },
};

export function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case "RECENTLY_USED_ADDRESS_SET":
      return {
        ...state,
        currentFormData: {
          address: action.data.address,
          network: action.data.network,
        },
      };
    case "ACCOUNT_DATA_REQUESTED":
      return {
        ...state,
        isFetching: true,
      };
    case "ACCOUNT_DATA_RECEIVED":
      const id = uuidv4();
      return {
        ...state,
        addressesById: {
          ...state.addressesById,
          [id]: {
            id,
            address: action.data.address,
            balance: action.data.balance,
            transactions: cleanupTransactions(action.data.transactions),
            network: action.data.network,
          },
        },
        currentId: id,
        recentIds: [...state.recentIds, id],
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
