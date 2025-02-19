import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {  toast } from 'react-toastify';

import * as Yup from "yup";
import { Field, Formik ,Form, ErrorMessage } from 'formik';
import { Button, TextField } from '@mui/material';

import { services } from "@services";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface GetServese{
    getServese:()=>any
}


export default function Modal1({getServese}:GetServese) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code ----------------------------------------------------

  interface initialValues{
    name: string;
    price: number|string;
  } 
 interface postData extends initialValues{
    owner_email: string|any;
 
 }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.number().min(1, "Price must be greater than 0").required("Price is required"),
  });

  const initialValues:initialValues = {
    name : "",
    price: ""
}

const handelSubmit = async(value:initialValues) => {
    const data:postData = {...value , owner_email: localStorage.getItem("email") }
    try{
       const res = await services.servicesPost(data)
       console.log(res);
       
       if(res.status === 201){
        toast.success("Success fully");
        handleClose();
        getServese()
       }
    }catch(error:any){
        toast.error("Error: " + error?.message);
        console.log(error);
    }

}
  

  //----------------------------------------------------------------

  return (
    <div>
      <button onClick={handleOpen} className="py-2 px-6 text-white font-semibold bg-[#2389DA] hover:bg-blue-800 active:bg-[#2389DA] duration-200 rounded-lg">Qo'shish</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handelSubmit}
            >
                
              <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                  Hizmat qo'shish
                </h1>
                <Field
                  as={TextField}
                  label="Hizmat turi"
                  sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                  type="text"
                  name="name"
                  className=" w-[100%]  mb-3 outline-none py-0"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="mb-3 text-red-500 text-center"
                />
                <Field
                  as={TextField}
                  label="Hizmat narhi"
                  sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                  type="number"
                  name="price"
                  className=" w-[100%]  mb-3 outline-none py-0"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="mb-3 text-red-500 text-center"
                />
                <Button
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                  variant="contained"
                  type="submit"
                  className="w-[100%] py-3"
                >
                  qo'shish
                </Button>
              </Form>
            </Formik>
        </Box>
      </Modal>
    </div>
  );
}



