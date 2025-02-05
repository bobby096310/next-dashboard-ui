"use client"
import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";

const FormModel = ({ table, type, data, id }:
    {
        table: "teacher"
        | "student"
        | "parent"
        | "subject"
        | "class"
        | "exam"
        | "assignment"
        | "result"
        | "attendance"
        | "event"
        | "announcement";
        type: "create" | "update" | "delete";
        data?: any;
        id?: number;
    }) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" : "bg-lamaPurple";
    const [open, setOpen] = useState(false);

    const Form = () => {
        return type === "delete" && id ? (
            <form className="flex flex-col p-4 gap-4">
                <span className="text-center font-medium">This action cannot be reverted. Are you share you want to delete {table}?</span>
                <button className="bg-red-700 text-white py-2 px-4 border-none w-max self-center">Delete</button>
            </form>
        ) : <TeacherForm type="create" />
    };

    return (
        <>
            <button
                className={`${size} ${bgColor} flex items-center justify-center rounded-full`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt="" width={16} height={16} />
            </button>
            {open &&
                <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                        <Form />
                        <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default FormModel