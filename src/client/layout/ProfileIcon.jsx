import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { useFetchUserAccountQuery } from "../features/user/userSlice";

export default function ProfileIcon() {
  const { data: me } = useFetchUserAccountQuery();
  console.log(me)
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}></Avatar>
    </Stack>
  );
}
