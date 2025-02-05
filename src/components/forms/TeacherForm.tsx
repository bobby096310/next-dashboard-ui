"use client";

import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import InputField from '../InputField';

const schema = z.object({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: "Invalid email address!" }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First name is required!' }),
    lastName: z.string().min(1, { message: 'Last name is required!' }),
    phone: z.string().min(1, { message: 'Phone number is required!' }),
    address: z.string().min(1, { message: 'Address is required!' }),
    birthday: z.date({ message: 'Birthday is required!' }),
    gender: z.enum(["M", "F", "D", "N"], { message: "Gender is required!" }),
    img: z.instanceof(File, { message: "Photo is required!" })
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({ type, data }: { type: "create" | "update"; data?: any; }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => console.log(data));

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className='text-xl font-semibold'>Create a new teacher</h1>
            <span className='text-xs font-medium text-gray-400'>Authentication Information</span>
            <div className="flex justify-between gap-4 flex-wrap">
                <InputField
                    label="Username"
                    name='username'
                    defaultValue={data?.defaultValue}
                    register={register}
                    error={errors.username} />
                <InputField
                    label="Email"
                    name='email'
                    type="email"
                    defaultValue={data?.defaultValue}
                    register={register}
                    error={errors.email} />
                <InputField
                    label="Password"
                    name='password'
                    type='password'
                    defaultValue={data?.defaultValue}
                    register={register}
                    error={errors.password} />
            </div>
            <span className='text-xs font-medium text-gray-400'>Personal Information</span>
            <div className="flex justify-between gap-4 flex-wrap">
                <InputField
                    label="Birthday"
                    name='birthday'
                    type='date'
                    defaultValue={data?.defaultValue}
                    register={register}
                    error={errors.birthday} />
                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className='text-xs text-gray-500'>Gender</label>
                    <select {...register("gender")} defaultValue={data?.gender}
                        className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm' >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="D">Diverse</option>
                        <option value="N">Prefer not to declare</option>
                    </select>
                    {errors.gender?.message && <p className='text-xs text-red-400'>{errors.gender?.message.toString()}</p>}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
                    <label className='text-xs text-gray-500 items-center gap-2 cursor-pointer' htmlFor='img'>
                        <Image src="/upload.png" alt='' width={28} height={28}></Image>
                        <span>Upload a photo</span>
                    </label>
                    <input type='file' id='img' {...register("img")} className='hidden' />
                </div>
            </div>
            <button className='bg-blue-400 text-white rounded-md p-2 w-max self-center'>{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm