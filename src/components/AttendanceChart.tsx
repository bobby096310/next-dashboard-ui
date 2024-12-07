"use client";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Image from "next/image"

const data = [
    {
        name: 'Mon',
        present: 60,
        absent: 40,
    },
    {
        name: 'Tue',
        present: 70,
        absent: 28,
    },
    {
        name: 'Wed',
        present: 65,
        absent: 35,
    },
    {
        name: 'Thu',
        present: 60,
        absent: 40,
    },
    {
        name: 'Fri',
        present: 30,
        absent: 60,
    }
];

const AttendanceChart = () => {
    return (
        <div className='bg-white rounded-lg w-full h-full p-4'>
            {/* Title */}
            <div className="flex justify-between items-center">
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}></Image>
            </div>
            {/* Chart */}
            <div className="w-full h-[90%] p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
                        <XAxis dataKey="name" axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                        <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
                        <Legend align="left" verticalAlign='top' wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
                        <Bar dataKey="absent" fill="#FAE27C" legendType='circle' radius={[10, 10, 0, 0]} />
                        <Bar dataKey="present" fill="#C3EBFA" legendType='circle' radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default AttendanceChart;