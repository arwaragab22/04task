

import './App.css'
import Bookingform from './Components/Bookingform'
import CountrySelector from './Components/Selectcountry'
import Grid from '@mui/material/Grid'
import Orderreview from './Components/Orderreview'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useForm, FormProvider } from "react-hook-form";

import "./index.css";
import { grey,green ,lightGreen} from '@mui/material/colors'
import { Box } from '@mui/material';

import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./shema.js";



function App() {
  const [countryCode, setCountryCode] = useState("+30"); 
  
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      studentPhone: "",
      parentPhone: "",
      email: "",
      fullName: "",
      address: "",
      buildingNo: "",
      postalCode: "",
      city: "",
      country: "",
      monthlySessions: "",
      paymentMethod: "",
      cardHolder: "",
      cardNumber: "",
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
  
    formData.append("studentPhone", data.studentPhone);
    formData.append("parentPhone", data.parentPhone);
    formData.append("email", data.email);
    formData.append("fullName", data.fullName);
    formData.append("address", data.address);
    formData.append("buildingNo", data.buildingNo);
    formData.append("postalCode", data.postalCode);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("monthlySessions", data.monthlySessions);
    formData.append("paymentMethod", data.paymentMethod);
    formData.append("cardHolder", data.cardHolder);
    formData.append("cardNumber", data.cardNumber);
    formData.append("Month", data.Month);
    formData.append("terms", data.terms ? "1" : "0");
  
    try {
      const res = await fetch("http://localhost:10010/wp-json/custom/v1/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, studentPhone: countryCode + "" + data.studentPhone, parentPhone: countryCode + "" + data.parentPhone }),
      });
  
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    
  };
  
  const [SelectedMonths, setSelectedMonths] = useState(6);

  const [country, setCountry] = useState("en");

  const [sessions, setsessions] = useState(8);

  const { t, i18n } = useTranslation();

  const handleCountryChange = (event) => {
    const selected = event.target.value;
    setCountry(selected);

    if (selected === "ar") {
      document.body.setAttribute("dir", "rtl");
      i18n.changeLanguage("ar");
    } else {

      document.body.setAttribute("dir", "ltr"); i18n.changeLanguage("en")
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: "column" }}>
      <Box>
        <CountrySelector selectedCountry={country}
          handleCountryChange={handleCountryChange}></CountrySelector></Box>
      <Box sx={{  backgroundColor: lightGreen[50], margin: "auto" ,width:"100%"}}>
        <Box sx={{ width: {xs:"100%",  md: "90%" ,lg:"80%"},margin:"auto",padding:{xs:"5px",md:"40px"},borderRadius:"25px"}}>
          <form onSubmit={methods.handleSubmit((data) => onSubmit({...data,Month:SelectedMonths}))}>
        <FormProvider {...methods}>
          <Grid container >
            <Grid size={{xs:12, md:7}}>
                  <Bookingform sessions={sessions} setsessions={setsessions} setCountryCode={setCountryCode} countryCode={countryCode} />
            </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Orderreview sessions={sessions} setsessions={setsessions} SelectedMonths={SelectedMonths} setSelectedMonths={setSelectedMonths}
                  />
            </Grid>
          </Grid>
        </FormProvider>
      </form>
          
        </Box>

      </Box>
    </Box>
  )
}

export default App
