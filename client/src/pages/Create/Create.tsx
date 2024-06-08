import React, { FormEvent, useState } from 'react'
import Navbar from '../../components/Navbar'
import "./styles.css"
import * as yup from "yup"
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { useNFTContext } from '../../context/NFTContext'
import { IPFSData } from "../../context/NFTContext"



const creationSchema = yup
    .object().shape({
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
        price: yup.number().required("Price is required"),
        image: yup.string().required("Image is required"),
    })
    .required()



export default function Create() {

    const [file, setFile] = useState<string>("")
    const [fileName, setFileName] = useState<string>("")
    const [formError, setFormError] = useState<string>("")

    const { uploadToIPFS } = useNFTContext()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = {
            name: new FormData(e.currentTarget).get("name"),
            description: new FormData(e.currentTarget).get("description"),
            price: new FormData(e.currentTarget).get("price"),
            image: file,
        }

        try {
            const validatedData = await creationSchema.validate(formData)
            if (validatedData) {

                const data: IPFSData = {
                    name: formData.name!.toString(),
                    description: formData.description!.toString(),
                    image: file
                }
                uploadToIPFS(data)
                console.log("xxxxxxx")
            }
        } catch (err: any) {
            setFormError(err.message)
            console.log(err.message)
        }
    }


    const convert2base64 = (file: File) => {
        const reader = new FileReader();
        setFileName(file.name)
        reader.onloadend = () => {
            if (reader.result instanceof ArrayBuffer) {
                const resultString = new TextDecoder('utf-8').decode(reader.result);
                setFile(resultString);
            } else if (typeof reader.result === 'string') {
                setFile(reader.result);
            }
        };
        reader.readAsDataURL(file);
    }

    return (
        <div >
            <Navbar />

            <p style={{ fontSize: "42px", color: "rgb(234,234,234)" }}>Submit Your NFT</p>
            <br />
            <div className='create-container'>
                <div className='create-area form form-area'>
                    <Form onSubmit={handleSubmit}>

                        <FormLabel className='mb-3 mt-2'>NFT Image<span style={{ color: "red" }}>*</span></FormLabel>
                        <FormGroup className='custom-file-upload'>
                            <FormControl
                                as="input"
                                type="file"
                                name='image'
                                onChange={(event) => {
                                    const inputElement = event.target as HTMLInputElement;
                                    const files = inputElement.files;
                                    if (files && files.length > 0) {
                                        convert2base64(files[0]);
                                    }
                                }}
                                accept="image/*"
                            >
                            </FormControl>
                            <p>{fileName === "" ? "Select your NFT image" : fileName}</p>
                        </FormGroup>

                        <FormLabel className='mt-3'>Name</FormLabel>
                        <FormControl
                            className='custom-input mb-3'
                            type="string"
                            name='name'
                            autoComplete='off'
                        />
                        <FormLabel className='mt-3'>Description</FormLabel>
                        <FormControl
                            name='description'
                            className='custom-input mb-3'
                            type="string"
                            autoComplete='off'

                        />
                        <FormLabel className='mt-3'>ETH Price</FormLabel>
                        <FormControl
                            name='price'
                            className='custom-input'
                            type="number"
                            autoComplete='off'
                            step="any"

                        />
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <button className='btn custom-btn' type='submit'>
                                Create
                            </button>
                        </div>

                    </Form>

                    {/* <textarea /> */}
                </div>
            </div>

        </div>
    )
}
