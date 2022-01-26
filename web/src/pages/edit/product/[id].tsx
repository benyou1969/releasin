import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Select } from "@chakra-ui/react"

import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray, FastField, useFormikContext } from 'formik';
import { useRouter } from "next/router";
import { AttributeType } from "../../new/product";
import Head from "next/head";
import { ProductApi, ProductTypeApi } from "../../../../generated";


const ProductTypeSelector = ({ productTypes }) => {

    const { values, setFieldValue } = useFormikContext()
    const [change, setChange] = useState(false);

    console.log(productTypes)
    console.log("values.productTypeId", values.productTypeId)
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
            as={Select} name="productTypeId" mb={5} onChangeCapture={() => { setChange(true) }}
            value={values.productTypeId}
        >
            {/* <option defaultChecked={true}>default</option> */}
            {productTypes.map((productType, index) =>
                <option value={productType.id} key={index}>{productType.name}</option>
            )}

        </FastField>
    )
}

export const Index = ({ product, productTypes }) => {
    const router = useRouter();
    return (
        <Box>
            <Head>
                <title>Edit product type - {product.name} </title>
            </Head>
            <Heading>Product: {product.name}</Heading>
            <Formik
                initialValues={product}
                onSubmit={async (values) => {
                    const productApi = new ProductApi();
                    const res = await productApi.productControllerUpdate(product.id, values);
                    if (res.status === 200) {
                        router.push(`/products/${product.id}`);
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

                        <ProductTypeSelector productTypes={productTypes} />

                        <br />

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


                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={props.isSubmitting}
                            type='submit'
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export async function getServerSideProps(context) {
    const productApi = new ProductApi();
    const productTypeApi = new ProductTypeApi();
    const productTypes = await productTypeApi.productTypeControllerFindAll();
    const res = await productApi.productControllerFindOne(context.params.id);
    return {
        props: { product: res.data, productTypes: productTypes.data }, // will be passed to the page component as props
        notFound: res.status === 404
    }

}

export default Index
