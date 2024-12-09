import { Backdrop, Box, CircularProgress, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";

export const LinearIndeterminate = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
}

export const LoadingIcon = () => {
     return (
       <div style={{ textAlign: "center", height: "10rem" }}>
         <CircularProgress />
       </div>
     );
   };

export const PageLoadingIndicator = () => {
  const isLoading = useSelector((state) => state.pageControl.isLoading);

  return (
    <Backdrop
      open={isLoading}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      <LoadingIcon />
    </Backdrop>
  );
};