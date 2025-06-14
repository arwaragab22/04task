import { z } from "zod";

const baseFields = {
    studentPhone: z.string().min(7, "Student phone is required"),
    parentPhone: z.string().min(7, "Parent phone is required"),
    email: z
        .string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email address"),
    fullName: z.string().min(1, "Full name is required"),
    address: z.string().min(1, "Address is required"),
    buildingNo: z.string().min(1, "Building number is required"),
    postalCode: z
        .string()
        .min(4, "Postal code must be at least 4 digits")
        .max(10, "Postal code is too long")
        .regex(/^\d+$/, "Postal code must contain only numbers"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Select a country"),
    monthlySessions: z.string().min(1, "Select number of sessions"),
    paymentMethod: z.enum(["sepa", "card"], {
        errorMap: () => ({ message: "Please select a valid payment method" }),
    }),
    terms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms & conditions" }),
    }),
};

export const schema = z.discriminatedUnion("paymentMethod", [
    // Schema for card
    z.object({
        ...baseFields,
        paymentMethod: z.literal("card"),

        cardHolder: z
            .string()
            .min(3, "Card holder name is too short")
            .max(50, "Card holder name is too long")
            .refine((val) => /^[A-Za-z\s]+$/.test(val), {
                message: "Card holder name must contain only letters and spaces",
            })
            .refine((val) => val.trim().split(/\s+/).length >= 2, {
                message: "Please enter full name (first and last)",
            }),

        cardNumber: z
            .string()
            .refine((val) => {
                const parts = val.trim().replace(/\s+/g, " ").split(" ");
                return parts.length === 3;
            }, {
                message: "Input must contain card number, expiry (MM/YY), and CVC",
            })
            .refine((val) => {
                const [cardRaw] = val.trim().replace(/\s+/g, " ").split(" ");
                const cardNumber = cardRaw.replace(/\s/g, "");
                return /^\d{12,19}$/.test(cardNumber);
            }, {
                message: "Card number must be 12 to 19 digits",
            })
            .refine((val) => {
                const [, expiry] = val.trim().replace(/\s+/g, " ").split(" ");
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) return false;
                const [mm, yy] = expiry.split("/");
                const month = parseInt(mm, 10);
                const year = parseInt("20" + yy, 10);
                const now = new Date();
                const expiryDate = new Date(year, month);
                return expiryDate > now;
            }, {
                message: "Expiry must be valid and in the future",
            })
            .refine((val) => {
                const [, , cvc] = val.trim().replace(/\s+/g, " ").split(" ");
                return /^\d{3,4}$/.test(cvc);
            }, {
                message: "CVC must be 3 or 4 digits",
            }),
    }),

    z.object({
        ...baseFields,
        paymentMethod: z.literal("sepa"),

        accountHolder: z
            .string()
            .min(3, "Account holder name is required")
            .regex(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed"),

        iban: z
            .string()
            .min(15, "IBAN is too short")
            .max(34, "IBAN is too long")
            .regex(/^[A-Z]{2}\d{2}[A-Z0-9]+$/, "Invalid IBAN format"),
    }),
]);
