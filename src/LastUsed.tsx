import { Heading, List } from "grommet";
import React from "react";

import { useAppDispatch, useAppState } from "./reducer";

type TLastUsedProps = {
  recentIds: string[];
};

export function LastUsed({ recentIds }: TLastUsedProps) {
  const { addressesById } = useAppState();
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <Heading level={3} size="small">
        Last used
      </Heading>

      <List
        primaryKey="address"
        secondaryKey="network"
        data={recentIds.map((id: string) => ({
          address: addressesById[id].address,
          network: addressesById[id].network,
        }))}
        onClickItem={({ item: { address, network } }: any) => {
          dispatch({
            type: "RECENTLY_USED_ADDRESS_SET",
            data: { address, network },
          });
        }}
      />
    </React.Fragment>
  );
}
