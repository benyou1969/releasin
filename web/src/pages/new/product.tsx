import { Box, Button, Code, FormControl, FormLabel, Heading, HStack, Input, Radio, Select, Text, VStack } from "@chakra-ui/react"

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, FastField, useFormikContext } from 'formik';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import { ProductApi, ProductTypeApi, ProductTypeApiFp } from "../../../generated";

export enum AttributeType {
    TEXT = "TEXT",
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
}

const ProductTypeSelector = ({ setSelected, selected, productTypes }) => {

    const { values, setFieldValue } = useFormikContext()
    const [change, setChange] = useState(false);


    if (change) {
        const productTypeId = values.productTypeId;
        let updatedAttributes = [];
        productTypes.map((productType) => {
            if (productType.id === productTypeId) {
                productType.attributes.map((att) => updatedAttributes.push({ name: att.name, type: att.type, value: '' }))
            }
        })
        setFieldValue("attributes", [])
        setFieldValue("attributes", updatedAttributes)
        setChange(false)
    }

    return (
        <FastField
            as={Select} name="productTypeId" mb={5} onChangeCapture={() => { setSelected(true); setChange(true) }}

        >
            <option value="">Choose product type</option>
            {/* <option defaultChecked={true}>default</option> */}
            {productTypes.map((productType, index) =>
                <option value={productType.id} key={index}>{productType.name}</option>
            )}

        </FastField>
    )
}
export const Index = ({ productTypes }) => {
    const [selected, setSelected] = useState(false)
    const router = useRouter()
    if (productTypes.length === 0) {
        return (
            <Box>
                <Text>You need to create <Code>product type</Code> before creating product</Text>
            </Box>
        )

    }
    return (
        <Box>
            <Head>
                <title>New Product</title>
            </Head>
            <Heading size="2xl">New Product</Heading>
            <br />
            <Formik
                initialValues={{
                    name: '',
                    productTypeId: "",
                    attributes: [{
                        name: '',
                        type: AttributeType.TEXT,
                        value: ''
                    }],
                }}
                onSubmit={async (values) => {
                    const productApi = new ProductApi()
                    const res = await productApi.productControllerCreate(values);
                    if (res.status === 201) {
                        router.push(`/products/${res.data.id}`)
                    }
                }}
            >
                {({ errors, touched, ...props }) => (
                    <Form>
                        <Field name='name'>
                            {({ field, form }) => (
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>name</FormLabel>
                                    <Input {...field} id='name' placeholder='name' />
                                </FormControl>
                            )}
                        </Field>
                        <br />
                        <ProductTypeSelector selected={selected} setSelected={setSelected} productTypes={productTypes} />

                        <br />
                        <br />
                        {selected && (

                            <FieldArray
                                name="attributes"
                                render={(arrayHelpers) => (
                                    <Box>
                                        {
                                            props.values.attributes.map((attribute, index) => (
                                                <div>
                                                    <HStack key={index}>
                                                        <Field name={`attributes.${index}.name`} as={Input} placeholder="attribute name" />
                                                        <Field name={`attributes.${index}.type`} as={Select}>
                                                            <option value={AttributeType.TEXT}>TEXT</option>
                                                            <option value={AttributeType.BOOLEAN}>BOOLEAN</option>
                                                            <option value={AttributeType.DATE}>DATE</option>
                                                        </Field>
                                                        <Box w="96">

                                                            {attribute.type === AttributeType.TEXT &&
                                                                <Field name={`attributes.${index}.value`} as={Input} placeholder="attributes value" />
                                                            }
                                                            {attribute.type === AttributeType.DATE &&
                                                                <Box>
                                                                    <Field name={`attributes.${index}.value`} type="date" placeholder="attributes value" />

                                                                </Box>
                                                            }
                                                            {
                                                                attribute.type === AttributeType.BOOLEAN &&
                                                                <HStack>
                                                                    <label>

                                                                        <Field name={`attributes.${index}.value`} type="radio" value={'true'} />
                                                                        True
                                                                    </label>
                                                                    <label>

                                                                        <Field name={`attributes.${index}.value`} type="radio" value={'false'} />
                                                                        False
                                                                    </label>

                                                                </HStack>
                                                            }
                                                        </Box>
                                                        {
                                                            index != 0 &&
                                                            <Button colorScheme={'red'} onClick={() => arrayHelpers.remove(index)}>x</Button>
                                                        }
                                                    </HStack>
                                                    <br />
                                                </div>
                                            ))}
                                        <HStack>
                                            <Button onClick={() => arrayHelpers.push({
                                                name: '', type: AttributeType.TEXT,
                                                // value: ''
                                            })}>+</Button>
                                        </HStack>
                                    </Box>
                                )}
                            />
                        )}


                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}



export default Index

export async function getServerSideProps(context) {
    const productApi = new ProductTypeApi()
    const res = await productApi.productTypeControllerFindAll();
    return {
        props: { productTypes: res.data }, // will be passed to the page component as props
    }

}