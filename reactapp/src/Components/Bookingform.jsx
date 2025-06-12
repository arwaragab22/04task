import React from 'react'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { Userformfield } from './Userformfield';
import { grey } from '@mui/material/colors';

function Bookingform(props) {
    console.log(props)
    const { t, i18n } = useTranslation();

    return (
        <Box sx={{ backgroundColor: "white", padding: { xs: "15px", md: 4 }, pt: 4, textAlign: "center" }}>
            <Typography
                variant="h6"
                
                sx={{
                    fontWeight: "900",
                    textTransform: "capitalize",
                
                    color: grey[900]
                }}
            >
                Registration & Booking at GoStudent
            </Typography>

            <Typography
                variant="body2"
                sx={{
                marginTop:"7px",
                fontFamily: "Roboto, sans-serif",
                    color: grey[700], 
                    letterSpacing: "0.5px",
                }}
            >
                The leading platform for online tutoring
            </Typography>



            <Userformfield sessions={props.sessions} setsessions={props.setsessions} setCountryCode={props.setCountryCode} countryCode={props.countryCode} ></Userformfield>
        </Box>
    )
}

export default Bookingform