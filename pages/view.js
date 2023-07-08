import { Box, Heading, Container, Image, Stack, VStack, Text, Input, Textarea, Button, Spinner, Alert, AlertIcon, AlertDescription, AlertTitle } from '@chakra-ui/react'
import { AppLayout } from '../components/AppLayout'
import { Hero } from '../components/Hero'
import { CarsList } from '../components/CarsList'
import { EndSection } from '../components/EndSection'
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Swal from 'sweetalert2'
import CarApi from "../services/car-be.service"

export default function View() {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [year, setYear] = useState(0)
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [missingFields, setMissingFields] = useState([])
    const [hasChosenImage, setHasChosenImage] = useState(false)
    const [isCarAvailable, setCarAvailable] = useState(false)

    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query
            setId(id)
            getCar(id);
        }    
    }, [router.query])

    useEffect(() => {
        checkMissingFields();
    }, [name, brand, year, description, image])

    const getCar = (id) => {
        CarApi.getCar(id)
            .then((result) => {
                const data = result.data;
                setName(data.name);
                setBrand(data.brand);
                setYear(data.year);
                setDescription(data.description);
                setImage(data.image);
                setCarAvailable(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const deleteCar = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this listed car?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            icon: 'warning',
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'info',
                    title: 'Loading...',
                    showConfirmButton: false,
                    showCancelButton: false,
                    allowOutsideClick: false
                });

                fetch(`${process.env.NEXT_PUBLIC_REACT_APP_CARS_URL}/deleteCar/${id}`, {
                    method: "POST"
                }).then((result) => {
                    Swal.close();
                    Swal.fire('Deleted', 'Listed Car deleted successfully!', 'success').then(() => router.push("/"))
                })
                .catch((error) => {
                    console.log(error);
                    console.error(error.stack);
                });
            }
          })
    }

    const updateCar = () => {
        if (name !== "" && brand !== "" && year !== "" && description !== "" && image !== "") {
            let data = new FormData();
            data.append('name', name);
            data.append('brand', brand);
            data.append('year', year);
            data.append('description', description);
            data.append('image', image);

            Swal.fire({
                icon: 'info',
                title: 'Loading...',
                showConfirmButton: false,
                showCancelButton: false,
                allowOutsideClick: false
            });

            fetch(`${process.env.NEXT_PUBLIC_REACT_APP_CARS_URL}/updateCar/${id}`, {
                method: "POST",
                body: data
            })
            .then((result) => {
                Swal.close();
                Swal.fire(
                    'Success!',
                    'Listed Car is updated succesfully!',
                    'success'
                ).then(() => getCar(id))
            })
            .catch((error) => {
                console.log(error);
                console.error(error.stack);
            });
        } else {
            Swal.fire(
                '',
                `Please fill up the form!`,
                'error'
            )
        }
    }

    const safeParseFloat = (str) => {
        const value = Number.parseFloat(str)
        return Number.isNaN(value) ? 0 : value
    }

    const onChangeImage = async (e) => {
        setImage("");
        setHasChosenImage(true);

        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', 'listycars');

        const data = await fetch('https://api.cloudinary.com/v1_1/draaoierp/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(responseData => {
          return responseData;
        })
        .catch(err => {
            console.log(err)
        });
        
        setImage(data.secure_url)
    }

    const checkMissingFields = () => {
        let missing = [];
        if (name === "") {
            missing.push("Name");
        }
        if (brand === "") {
            missing.push("Brand");
        }
        if (year === 0) {
            missing.push("Year");
        }
        if (description === "") {
            missing.push("Description");
        }
        if (image === "") {
            missing.push("Image");
        }
        setMissingFields(missing);
    }

    return (
        <AppLayout>
            <Container mt={16} maxW="container.xl">
                <Box pos="relative" mb={8}>
                    <Image pos="relative" src="../images/cars-view-page.jpg" alt="View Page" />
                    <Heading size={{ base: '2xl', md: '3xl' }} color="white" pos="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">View a Car</Heading>
                </Box>    
                {
                    isCarAvailable === true ?
                        <Box>
                            {
                                missingFields.length > 0 &&
                                <Alert status='error' mb={8}>
                                    <AlertIcon />
                                    <AlertTitle>The following fields are required, please fill them up!</AlertTitle>
                                    <AlertDescription>{missingFields.join(", ")}</AlertDescription>
                                </Alert>
                            }  
                            <Text mb={2} fontWeight="bold">Car Name <span style={{ color: 'red' }}>*</span></Text>
                            <Input 
                                placeholder="Enter car name"
                                focusBorderColor="yellow.500"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                mb={6}
                            />
                            <Text mb={2} fontWeight="bold">Car Brand <span style={{ color: 'red' }}>*</span></Text>
                            <Input 
                                placeholder="Enter car brand"
                                focusBorderColor="yellow.500"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                mb={6}
                            />
                            <Text mb={2} fontWeight="bold">Year Bought <span style={{ color: 'red' }}>*</span></Text>
                            <Input 
                                placeholder="Enter Year Bought"
                                focusBorderColor="yellow.500"
                                value={year}
                                onChange={(e) => setYear(safeParseFloat(e.target.value))}
                                type="number"
                                min="1970"
                                max="2022"
                                mb={6}
                            />
                            <Text mb={2} fontWeight="bold">Description <span style={{ color: 'red' }}>*</span></Text>
                            <Textarea  
                                placeholder="Enter description"
                                focusBorderColor="yellow.500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                mb={6}
                            />
                            <Text mb={2} fontWeight="bold">Image <span style={{ color: 'red' }}>*</span></Text>
                            {
                                (image === "" && hasChosenImage === true) ? 
                                <VStack justify="center" height={200}>
                                    <Spinner size='xl' color='yellow.500' />
                                </VStack> : null
                            }
                            {
                                image &&
                                    <Image src={image} alt="Car Upload" crossOrigin="anonymous" w="full" mb={6} />
                            }
                            <Input
                                type="file"
                                onChange={onChangeImage}
                                mb={6} />
                            <Stack direction={{ base: 'column', md: 'row' }} w="full">
                                <Button
                                    size="md"
                                    rounded="full"
                                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                                    bg="yellow.500"
                                    color="white"
                                    disabled={
                                        name === "" || brand === "" || year === 0 || description === "" || image === ""
                                    }
                                    onClick={updateCar}
                                    mb={8}>
                                    Update Listed Car
                                </Button>
                                <Button
                                    size="md"
                                    rounded="full"
                                    _hover={{ transform: 'scale(1.05)', transition: 'all 300ms ease' }}
                                    bg="red.500"
                                    color="white"
                                    mb={8}
                                    onClick={() => deleteCar(id)}>
                                    Delete
                                </Button>
                            </Stack> 
                        </Box>    
                    : 
                    <VStack justify="center" h={800}>
                        <Spinner size='xl' color='yellow.500' />       
                    </VStack>    
                }
            </Container>  
        </AppLayout>  
    )
}
