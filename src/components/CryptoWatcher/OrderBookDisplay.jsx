import { Divider, Stack, Typography } from "@mui/material";

export default function OrderBookDisplay({ data }) {
  const { asks, bids } = data;
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "900",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Order Book Record
      </Typography>
      <Stack direction="row">
        <SingleOrderBookContainer title="ASKS" data={asks} />
        <SingleOrderBookContainer title="BIDS" data={bids} />
      </Stack>
    </Stack>
  );
}
function SingleOrderBookContainer({ title, data }) {
  return (
    <Stack>
      <Typography
        variant="h5"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {title}
      </Typography>
      <Stack direction="row">
        <Stack
          sx={{
            width: "150px",
          }}
        >
          <Typography variant="h5">Price</Typography>
        </Stack>
        <Stack
          sx={{
            width: "150px",
          }}
        >
          <Typography variant="h5">Quantity</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        {data.map((item, index) => {
          return (
            <Stack key={index} direction="row">
              <Stack
                sx={{
                  width: "150px",
                }}
              >
                <Typography> {item[0]}</Typography>
              </Stack>
              <Stack
                sx={{
                  width: "150px",
                }}
              >
                <Typography>{item[1]}</Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
