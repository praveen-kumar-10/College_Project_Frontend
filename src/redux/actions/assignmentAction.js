
import axios from "axios";
import { toast } from "react-toastify";

import { assignmentActions } from "../reducers/assignmentSlice";
import { logOut } from "./loginAction";

export const loadAllAssignmentsAction = (token)=>{
    console.log(token)
    return async (dispatch)=>{
        async function getAssignment(){
            const response = await axios.get(
                'http://localhost:8000/api/students/assignments',
                {
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }
            );
            const {data} = response;
            return data;
        }

        try{
            const data = await getAssignment();
            dispatch(assignmentActions.loadAllAssignments(data));
        }
        catch(err){
            const {message,success} = err.response.data;
            if(success==4)
                dispatch(logOut())
            console.log(message,success);
        }

    }
}

export const submitAssigment = (form_data,token)=>{
    return async (dispatch) => {
        async function send_assignment(){
            const response = await axios.post(
                'http://localhost:8000/api/students/upload',
                form_data,
                {
                    headers:{
                        'Authorization':`Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            const {data} = response;
            return data;
        }

        try{
            const data = await send_assignment();
            dispatch(assignmentActions.submitAssigment(data));
            toast.success("Submitted successfully");
            return data;
        }
        catch(err){
            const {message} = err.response.data;
            console.log(message);
            toast.error("Submitted successfully");
        }
    }
}

