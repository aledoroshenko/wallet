import { Box, Button, Heading, Layer, List, Text } from "grommet";
import React from "react";

type TLastUsedProps = {
  ids: string[];
};

export function LastUsed({ ids }: TLastUsedProps) {
  const [show, setShow] = React.useState();

  const onClose = () => setShow(undefined);

  return (
    <React.Fragment>
      {show ? (
        <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Scan QR code
            </Heading>
            <Box>
              <Text>QR Code here</Text>
            </Box>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label={
                  <Text color="white">
                    <strong>Done</strong>
                  </Text>
                }
                onClick={onClose}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      ) : null}

      <Heading level={3} size="small">
        Last used
      </Heading>

      <List
        data={ids}
        onClickItem={(event: any) => {
          setShow(true);
          console.log("Clicked", event.item);
        }}
      />
    </React.Fragment>
  );
}
