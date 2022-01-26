import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Radio, Select, Text, VStack } from "@chakra-ui/react"

import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Link from "next/link";
import { Centre } from "../../components/Centre";


export const Index = ({ products }) => {
    return (
        <Centre>
            <Heading>Products</Heading>
        </Centre>
    )
}

export async function getServerSideProps(context) {
    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
        props: {},
    }
}

export default Index
