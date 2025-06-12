import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import Divider from '@mui/material/Divider';


import {


  RadioGroup,
  FormControlLabel,
  Radio,

  FormLabel,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Controller } from "react-hook-form";

export function Userformfield(props) {

  
  const { register, setValue, watch, formState: { errors }, control } = useFormContext();

  const [studentPhone, setStudentPhone] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const selectedSession = watch("monthlySessions");
  const countries = [
    { code: "+971", flag: "🇦🇪", label: "UAE" },
    { code: "+20", flag: "🇪🇬", label: "Egypt" },
    { code: "+966", flag: "🇸🇦", label: "KSA" },
    { code: "+30", flag: "🇬🇷", label: "Greece" }


  ];
  useEffect(() => {
    console.log("Selected country code: ", props.countryCode);
  }, [props.countryCode]);
  return (
    <Box sx={{ padding: { xs: "5px", md: 2 } , display: "flex", flexDirection: "column", gap: "20px", textAlign: "start" }}>

  
      <Box>    <Typography variant="subtitle2" sx={{ fontSize: ".9rem", mt: 2 }}>
        <Box component="span" sx={{ color: grey[500] }}>Login PHONE NUMBER</Box>{" "}
        (<Box component="span">preferably <u>the student's</u></Box>)
      </Typography>

        <Controller
          name="studentPhone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField 
              {...field}
              fullWidth
              placeholder="Phone Number"
              error={!!errors.studentPhone}
              helperText={errors.studentPhone?.message}
              onChange={(e) => {
                console.log(e.target)
                const digitsOnly = e.target.value.replace(/\D/g, "");
                console.log(digitsOnly)
                field.onChange(digitsOnly);
                
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Select
                      value={props.countryCode}
                      onChange={(e) => {
                        setValue("countryCode", e.target.value);
                    props.setCountryCode(e.target.value)
                      }}
                      variant="standard"
                      disableUnderline
                      sx={{ minWidth: 80, fontSize: "0.9rem" }}
                    >
                      {countries.map((item) => (
                        <MenuItem key={item.code} value={item.code}>
                          {item.flag} {item.code}
                        </MenuItem>
                      ))}
                    </Select>
                  </InputAdornment>
                ),
              }}
            />
          )}
        /></Box>
    
  <Box>    <Typography variant="subtitle2" sx={{ fontSize: ".9rem" }}>
        <Box component="span" sx={{ color: grey[500] }}>CONTACT PHONE NUMBER</Box>{" "}
        (<Box component="span">preferably <u>the parent's</u></Box>)
      </Typography>

      <Controller
        name="parentPhone"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            placeholder="Parent's Phone Number"
            error={!!errors.parentPhone}
            helperText={errors.parentPhone?.message}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\D/g, "");
              field.onChange( cleaned);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    value={props.countryCode}
                    onChange={(e) => { setValue("parentCountryCode", e.target.value); props.setCountryCode(e.target.value) }}
                    variant="standard"
                    disableUnderline
                    sx={{ minWidth: 80, fontSize: "0.9rem" }}
                  >
                    {countries.map((item) => (
                      <MenuItem key={item.code} value={item.code}>
                        {item.flag} {item.code}
                      </MenuItem>
                    ))}
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        )}
      /></Box>

      <Box>
        <Typography variant="subtitle2" sx={{ color: grey[500] }}>
          CONTACT EMAIL ADDRESS (preferably the parent's)
        </Typography>
        <TextField
          fullWidth
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        /></Box>

      <Box>    <Typography variant="subtitle2" sx={{ color: grey[500] }}>
        CONTACT NAME
      </Typography>
        <TextField
          fullWidth
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        /></Box>


      <Box>      <Typography variant="subtitle2" sx={{ color: grey[500] }}>
        Billing Address
      </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Address"
              {...register("address")}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="No"
              {...register("buildingNo")}
              error={!!errors.buildingNo}
              helperText={errors.buildingNo?.message}
            />
          </Grid>
        </Grid></Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Postal Code"
            {...register("postalCode")}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="City"
            {...register("city")}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth error={!!errors.country}>
            <Select
              displayEmpty
              defaultValue=""
              {...register("country")}
              renderValue={(selected) =>
                selected ? selected : <span style={{ color: "#888" }}>Country</span>
              }
            >
              <MenuItem value="">Country</MenuItem>
              <MenuItem value="eg">🇪🇬 Egypt</MenuItem>
              <MenuItem value="us">🇺🇸 USA</MenuItem>
              <MenuItem value="sa">🇸🇦 Saudi Arabia</MenuItem>
            </Select>
          </FormControl>

          {errors.country && (
            <Typography variant="caption" color="error">
              {errors.country.message}
            </Typography>
          )}
        </Grid>
      </Grid>


      <Box>      <Typography variant="subtitle2" sx={{ color: grey[500] }}>
        Monthly Sessions
      </Typography>
        <FormControl fullWidth error={!!errors.monthlySessions}>
          <Select
            value={selectedSession || ""}
            displayEmpty
            onChange={(e) => {
              setValue("monthlySessions", e.target.value, { shouldValidate: true });
              props.setsessions(e.target.value);
            }}
            renderValue={(selected) =>
              selected ? `${selected} Sessions` : <span style={{ color: "#888" }}>Select number of sessions</span>
            }
          >
            <MenuItem value="" disabled>
              Select number of sessions
            </MenuItem>
            <MenuItem value="8">8 Sessions</MenuItem>
            <MenuItem value="12">12 Sessions</MenuItem>
            <MenuItem value="16">16 Sessions</MenuItem>
          </Select>

          {errors.monthlySessions && (
            <Typography variant="caption" color="error">
              {errors.monthlySessions.message}
            </Typography>
          )}
        </FormControl></Box>


    


      <Typography variant="subtitle2" sx={{ color: grey[500] ,marginTop:"10px"}}>
        Select Payment Method
      </Typography>
      <Box sx={{border:`1px solid ${grey[200]}`,padding:"10px 10px"}}>
        <FormControl component="fieldset" error={!!errors.paymentMethod} sx={{width:"100%"}}>
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue=""
            rules={{ required: "Please select a payment method" }}
            render={({ field }) => (
              <RadioGroup {...field}>
                <FormControlLabel
                  value="sepa"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <img src="sepa.png" alt="SEPA" height={54} width={50} />
                    </Box>
                  }
                />
                <Divider sx={{ width: "100%" }} border={`1px solid ${grey[200]}` } />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box display="flex" gap={1}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        alt="Visa"
                        height={15}
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="Mastercard"
                        height={15}
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                        alt="Amex"
                        height={15}
                      />
                    </Box>
                  }
                />
              </RadioGroup>
            )}
          />

          {errors.paymentMethod && (
            <FormHelperText>{errors.paymentMethod.message}</FormHelperText>
          )}
        </FormControl>

        <TextField
          fullWidth
          placeholder="Card Holder"
          {...register("cardHolder")}
          error={!!errors.cardHolder}
          helperText={errors.cardHolder?.message} sx={{ marginTop: "30px" }}
        />

        <TextField
          fullWidth
          placeholder="Card Number"
          {...register("cardNumber")}

          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CreditCardIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2" color="text.secondary">
                  MM/YY/CVC
                </Typography>
              </InputAdornment>
            ),
          }}
          sx={{ backgroundColor: grey[100], marginTop: "15px" }}
        />      {errors.cardNumber && (
          <Typography variant="caption" color="error">
            {errors.cardNumber.message}
          </Typography>
        )}</Box>

    </Box>

  );
}
