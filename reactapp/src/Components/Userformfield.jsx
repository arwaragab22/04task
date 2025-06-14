import { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import 'react-phone-input-2/lib/style.css'
import { Controller } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import Divider from '@mui/material/Divider';
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";


import "../a.css"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import {


  RadioGroup,
  FormControlLabel,
  Radio,

  FormLabel,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export function Userformfield(props) {
  countries.registerLocale(enLocale);

  const countryList = Object.entries(countries.getNames("en")).map(([code, name]) => ({
    code,
    name,
  }));
  const { register, setValue, watch, formState: { errors }, control } = useFormContext();
  const CustomInput = forwardRef((props, ref) => (
    <input
      {...props}
      ref={ref}
      placeholder={props.placeholder || 'رقم الهاتف'}
      style={{
        paddingLeft: "60px",
        height: "40px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "14px"
      }}
    />
  ));


  const selectedSession = watch("monthlySessions");
  const [phonecode1, setphonecode1] = useState();
  const [paymentMethod, setPaymentMethod] = useState("");


  useEffect(() => {
    console.log("Selected country code: ", props.countryCode);
  }, [props.countryCode]);
  return (
    <Box sx={{ padding: { xs: "5px", md: 2 }, display: "flex", flexDirection: "column", gap: "20px", textAlign: "start" }}>


      <Box>    <Typography variant="subtitle2" sx={{ fontSize: ".9rem", mt: 2 }}>
        <Box component="span" sx={{ color: grey[500] }}>Login PHONE NUMBER</Box>{" "}
        (<Box component="span">preferably <u>the student's</u></Box>)
      </Typography>

        <Controller
          name="studentPhone"
          control={control}

          render={({ field, fieldState }) => (
            <div className="phone-wrapper" style={{ zIndex: 90 }}>
              <PhoneInput
                {...field}
                country="ae" // 🇦🇪
                enableSearch

                disableDropdown={false}
                countryCodeEditable={false}
                inputProps={{ name: 'studentPhone' }}
                inputClass="custom-phone-input"
                buttonClass="custom-flag-button"
                containerClass="custom-phone-container"
                dropdownClass="custom-dropdown"
              />


              {(!field.value || field.value === '+971') && (
                <span className="placeholder-overlay"></span>
              )}

              {fieldState.error && (
                <p className="error-message">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />








      </Box>

      <Box>    <Typography variant="subtitle2" sx={{ fontSize: ".9rem" }}>
        <Box component="span" sx={{ color: grey[500] }}></Box>{" "}
        (<Box component="span">preferably <u>the parent's</u></Box>)
      </Typography>
        <Controller
          name="parentPhone"

          control={control}

          render={({ field, fieldState }) => (
            <div className="phone-wrapper" style={{ zIndex: 9 }}
            >
              <PhoneInput
                {...field}
                country="ae" // 🇦🇪
                enableSearch

                disableDropdown={false}
                countryCodeEditable={false}
                inputProps={{ name: 'parentPhone' }}
                inputClass="custom-phone-input"
                buttonClass="custom-flag-button"
                containerClass="custom-phone-container"
                dropdownClass="custom-dropdown"
              />


              {(!field.value || field.value === '+971') && (
                <span className="placeholder-overlay"></span>
              )}

              {fieldState.error && (
                <p className="error-message">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      </Box>

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
          <FormControl fullWidth error={!!errors.country} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              labelId="country-label"
              displayEmpty
              defaultValue=""
              {...register("country")}
              label="Country"
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                PaperProps: {
                  style: {
                    maxHeight: 300,
                    width: "300px",
                    zIndex: 1300,
                  },
                },
              }}
              sx={{ backgroundColor: "#fff" }}
              renderValue={(selected) =>
                selected ? selected : ""
              }
            >
              <MenuItem value="">
              </MenuItem>

              {countryList.map(({ code, name }) => (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              ))}
            </Select>

            {errors.country && (
              <Typography variant="caption" color="error">
                {errors.country.message}
              </Typography>
            )}
          </FormControl>



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





      <Typography variant="subtitle2" sx={{ color: grey[500], marginTop: "10px" }}>
        Select Payment Method
      </Typography>
      <Box sx={{ border: `1px solid ${grey[200]}`, padding: "10px 10px" }}>
        <FormControl component="fieldset" error={!!errors.paymentMethod} sx={{ width: "100%" }}>
          <Controller
            name="paymentMethod"
            control={control}
            defaultValue=""
            rules={{ required: "Please select a payment method" }}
            render={({ field }) => (
              <RadioGroup {...field} onChange={(e) => {
                console.log(paymentMethod)
                field.onChange(e);
                setPaymentMethod(e.target.value);
              }}

              >
                <FormControlLabel
                  value="sepa"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <img src="sepa.png" alt="SEPA" height={54} width={50} />
                    </Box>
                  }
                />
                <Box>

                  {paymentMethod === "sepa" &&
                    <><TextField
                      fullWidth
                      placeholder="Account Holder"
                      {...register("accountHolder", {
                        required: "Account holder name is required",
                        pattern: {
                          value: /^[A-Za-z]{2,}(?: [A-Za-z]{2,})+$/,
                          message: "Please enter full name (first and last)",
                        },
                      })}
                      error={!!errors.accountHolder}
                      helperText={errors.accountHolder?.message}
                      sx={{ marginTop: "10px" }}
                    />

                      <TextField
                        fullWidth
                        placeholder="IBAN"
                        {...register("iban", {
                          required: "IBAN is required",
                          pattern: {
                            value: /^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/,
                            message: "Invalid IBAN format",
                          },
                        })}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CreditCardIcon fontSize="small" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <Typography variant="body2" color="text.secondary">
                                e.g. AE07...
                              </Typography>

                            </InputAdornment>
                          ),
                        }}
                        sx={{ backgroundColor: grey[100], marginTop: "15px" }}
                      />

                      {errors.iban && (
                        <Typography variant="caption" color="error">
                          {errors.iban.message}
                        </Typography>
                      )}
                    </>}
                </Box>
                <Divider sx={{ width: "100%" }} border={`1px solid ${grey[200]}`} />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box display="flex" gap={1}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                        alt="Visa"
                        height={15}
                        width={15}
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                        alt="Mastercard"
                        height={15}
                        width={15}
                      />
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                        alt="Amex"
                        height={15}
                        width={15}
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
        <Box>{paymentMethod == "sepa" ?
          "" : (<>        <TextField
            fullWidth
            placeholder="Card Holder"
            {...register("cardHolder")}
            error={!!errors.cardHolder}
            helperText={errors.cardHolder?.message} sx={{ marginTop: "10px" }}
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
            />
            {errors.cardNumber && (
              <Typography variant="caption" color="error">
                {errors.cardNumber.message}
              </Typography>
            )}</>)}</Box>
      </Box>


    </Box>

  );
}
