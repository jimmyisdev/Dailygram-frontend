import { Stack, Typography } from "@mui/material";

export default function OrderBookDisplay({ data }) {
  const { asks, bids } = data;
  return (
    <Stack direction="row">
      <SingleOrderBookContainer title="ASKS" data={asks} />
      <SingleOrderBookContainer title="BIDS" data={bids} />
    </Stack>
  );
}
function SingleOrderBookContainer({ title, data }) {
  return (
    <Stack>
      <Typography variant="h5">{title}</Typography>
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
