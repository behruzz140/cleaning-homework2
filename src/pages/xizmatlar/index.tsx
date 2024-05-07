import { useEffect , useState} from "react";
import { ToastContainer , toast } from "react-toastify";

import {services} from "@services"
import {  GlobolTeble , Modal1 } from "@ui"
import "./style.scss"

const index = () => {
    const [loader , setLoader] = useState(true)
    const [data ,setData]= useState([])

    const email = localStorage.getItem("email")
    const formattedEmail = email?.replace("@", "%40")
    // console.log(email);
    


    // theder uchun kegan malumotga mos data 
    const theader = [
        {title: "" , name:"id"},
        {title: "Xizmat nomi" , name:"name"},
        {title: "Narxi (so‘m)" , name:"price"},
        {title: "Action" , name:"action"}
      ]

    const getServese = async ()=>{
        const res = await services.servicesGet({page:1, limit:10 ,owner_email:formattedEmail})
        console.log(res)
        setData(res.data.services)
        setTimeout(()=>{setLoader(false)}, 1000)
    }
    
    useEffect(()=>{
        getServese() 
    },[])

    // Delete the service name --------------------------------
    const deletIdData = async (id:string)=>{
        try{
            const res = await services.servicesDelete(id)
            if(res.status === 200){
                toast.success("deleted full")
                getServese()
            }
        }catch(error){
            toast.error("Couldn't delete")
            console.log(error)
        }
    }

    //================================================================


    return <>
    <ToastContainer />


        {
            loader ? <div className=" fixed top-0 left-0 w-full h-[100vh]  flex items-center justify-center z-150">
                        <div className="loader"></div>
                    </div>
            :<div>
                <div className="flex items-center justify-between mb-3">
                   <h1 className="text-[24px] font-bold ">Xizmatlar</h1>
                   <Modal1 getServese={getServese} />
                </div>
                {
                    data ? <GlobolTeble tbody={data} theader={theader} deletIdData={deletIdData} getServese={getServese} />
                    : <h1 className="text-[24px] text-center text-red-400  ">Malimot topilmadi 😓 , iltimos janob malumot qo'shing 😊 </h1>
                }

            </div>
            
        } 
    </>
};

export default index;