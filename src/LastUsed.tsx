import { Box, Heading, List } from "grommet";
import React from "react";

const data = [
  "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
  "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
  "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
  "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
  "0xfFfa5813ED9a5DB4880D7303DB7d0cBe41bC771F",
];

export function LastUsed() {
  return (
    <React.Fragment>
      <Heading level={3} size="small">
        Last used
      </Heading>

      <List
        data={data.slice(0, 5)}
        onClickItem={(event: any) => console.log("Clicked", event.item)}
      />
    </React.Fragment>
  );
}
