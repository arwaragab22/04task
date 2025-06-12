import { Box, Stack } from '@mui/material'
import { grey, blue, lightGreen, lightBlue } from '@mui/material/colors'
import React, { useState } from 'react';
import { ToggleButton, Checkbox } from "@mui/material";
import { Switch } from "@mui/material";
import {  FormControlLabel, FormHelperText } from "@mui/material";
import { useFormContext } from "react-hook-form";


import {

  RadioGroup,
  
  Radio,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
} from "@mui/material";
function Orderreview(props) {
  const { register, formState: { errors } } = useFormContext();

  const [enabled, setEnabled] = useState(false);

  const pricing = {
    8: { regular: 14.8, discounted: 14.0 },
    12: { regular: 29.6, discounted: 28.6 },
    16: { regular: 44.4, discounted: 42.9 },
  };
  const selectedPrice = pricing[props.sessions];
console.log(selectedPrice)
  return (
    <Paper sx={{ backgroundColor: grey[100], height: "100%" }} elevation={1}>
      <Box sx={{ padding: {xs:"15px",lg:4}, pt: 4, backgroundColor: grey[100] }} >

      <Typography variant="h6" fontWeight="bold" mb={2}>
        ORDER OVERVIEW
      </Typography>



      <Grid container mb={2}>
          {["4", "8", "12", "16", "20", "24"].map((val) => (
            <Grid size= {{xs:6,md:4}} key={val}>
              <Box
                onClick={() => props.setSelectedMonths(Number(val))}
                sx={{
                  padding: { xs: "5px 10px", md: "20px 10px" },
                  border: `2px solid ${props.SelectedMonths === Number(val) ? blue[400] : grey[100]
                    }`,
                  borderRadius: 1,
                  textAlign: "left",
                  fontSize: { xs: "14px", md: "16px" },
                  color: grey[700],
                  cursor: "pointer",
                  fontWeight: 500,
                  backgroundColor: "white",
                  transition: "0.5s",
                }}
              >
                {val} Months
              </Box>
            </Grid>
          ))}
      
      </Grid>


      <Stack direction={"row"} sx={{ justifyContent: "flex-start", alignItems: "center" ,margin:"25px 0px 40px 0px"}}>
        <Switch
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          color="success"
          size="medium"
        />

        <Typography sx={{ fontSize: "13px" ,fontWeight:"bold" ,textTransform:"capitalize"}}>Pay in advance -<Box component={"span"}> EXTRA 5% DISCOUNT</Box></Typography></Stack>

      <Stack spacing={2} mt={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: grey[500] ,textTransform:"uppercase"}}>
              Number of Sessions P.M.: 
          </Typography>
            <Typography sx={{ fontWeight: "bold" }}>{props.sessions || 8}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: grey[500], textTransform: "uppercase" }}>
            Regular Price:
          </Typography>
            <Typography sx={{ fontWeight: "bold" }}><del>{selectedPrice.regular}€</del></Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: grey[500], textTransform: "uppercase" }}>
            Your Price:
          </Typography>
            <Typography sx={{ fontWeight: "bold" }}>{selectedPrice.discounted}€</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" sx={{ color: lightGreen[500], textTransform: "uppercase" }}>
          <Typography variant="body2" >
            Discount 4%:
          </Typography>
            <Typography sx={{ fontWeight: "bold", fontSize: "21px" }}>{-(selectedPrice.regular - selectedPrice.discounted).toFixed(2)}€</Typography>
        </Stack>


      </Stack>

      <Divider sx={{ borderColor: "white", borderWidth: "2px", margin: "10px 0px" }} />
      <Stack direction="row" justifyContent="space-between" sx={{ marginTop: 3}}>
        <Typography variant="body2" sx={{ color: grey[500], textTransform: "uppercase" }}>
          Setup fee
        </Typography>
        <Typography sx={{ fontWeight: "bold", color: lightBlue[800], fontSize: "21px" }}>00.00€</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" sx={{marginTop:2}}>
        <Typography variant="body2" sx={{ color: grey[500], textTransform: "uppercase" }}>
          Total P.M.
        </Typography>
          <Typography sx={{ fontWeight: "bold", color: lightBlue[800], fontSize: "21px" }}>{(props.SelectedMonths * selectedPrice.discounted).toFixed(2)}€</Typography>
      </Stack>


      <FormControlLabel
          control={<Checkbox     {...register("terms")} />}
        sx={{ alignItems: "flex-start" ,fontSize:"14px"}}
        label={
          <Typography variant="body2" component="span" sx={{ color: grey[400] ,marginTop:"8px"}}>
            I accept the{" "}
            <span style={{ color: blue[500] }}>Terms & Conditions</span>{" "}
            and understand my{" "}
            <span style={{ color: blue[500] }}>right of withdrawal</span>{" "}
            as well as the circumstances that lead to repeal of the same
          </Typography>
        }
        />
        {errors.terms && (
          <FormHelperText error>{errors.terms.message}</FormHelperText>
        )}
      <Button
      type='submit'
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          padding: "15px",
          textTransform: "none",
          fontWeight: "bold",
          borderRadius: 2,
          fontSize: "18px",
          color: "#fff",
          background: "linear-gradient(to left, #64b5f6, #1976d2)",
          '&:hover': {
            background: "linear-gradient(to left, #42a5f5, #1565c0)",
          },
        }}
      >
        Order Now
      </Button>

    </Box></Paper>
  )
}

export default Orderreview