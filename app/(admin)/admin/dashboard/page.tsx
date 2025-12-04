"use client";

import {
    Legend,
    Tooltip,
    BarElement,
    LinearScale,
    CategoryScale,
    Chart as ChartJS,
} from "chart.js";
import useSWR from "swr";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { IArea } from "@/app/_types/area";
import { IResponse } from "@/app/_types/api";
import { ROUTE_LISTS } from "@/app/_constants/route";
import Select from "@/app/_components/inputs/select";
import { AutorenewOutlined } from "@mui/icons-material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

//
interface IDashboard {
    count: {
        newProposal: number;
        totalProposal: number;
        proposalFinished: number;
        proposalOnProgress: number;
    };
    graph: IGraph;
}

interface IGraph {
    labels: string[];
    newProposalPerMonth: number[];
    proposalFinishedPerMonth: number[];
    proposalOnProgressPerMonth: number[];
}

interface CardProps {
    data: number | undefined;
    title: string;
    loading: boolean;
    className?: string;
}

//
function Card({ data, title, loading, className = "" }: CardProps) {
    return (
        <div className={`${className}`}>
            <h5 className="font-medium text-lg lg:text-xl">{title}</h5>
            <p className="text-4xl lg:text-6xl text-right">
                {loading && (
                    <AutorenewOutlined
                        className="animate-spin"
                        fontSize="large"
                    />
                )}
                {!loading && data && data}
            </p>
        </div>
    );
}

function Chart({ props }: { props: IGraph }) {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: "Baru",
                data: props.newProposalPerMonth,
                backgroundColor: "rgba(163, 179, 255, 1)",
            },
            {
                label: "Diproses",
                data: props.proposalOnProgressPerMonth,
                backgroundColor: "rgba(255, 235, 139, 1)",
            },
            {
                label: "Selesai",
                data: props.proposalFinishedPerMonth,
                backgroundColor: "rgba(150, 255, 190, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Bar data={data} options={options} />;
}

export default function DashboardPage() {
    const [areaId, setAreaId] = useState<string>("");
    const [year, setYear] = useState<string>("");

    const { data, isLoading } = useSWR<IResponse<IDashboard>>(
        `${ROUTE_LISTS.get("api-dashboard-get")}?${new URLSearchParams({
            year,
            areaId,
        })}`
    );

    const { data: dataArea } = useSWR<IResponse<IArea[]>>(
        ROUTE_LISTS.get("api-area-get")
    );

    return (
        <>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 md:gap-5 justify-center md:justify-end *:sm:max-w-72">
                <Select
                    value={areaId}
                    firstOption={true}
                    placeholder="Semua Dapil"
                    onChange={(e) => setAreaId(e.target.value)}
                >
                    {dataArea?.data?.map((item, index) => (
                        <option key={index} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Select>
                <Select
                    value={year}
                    firstOption={true}
                    placeholder="Semua Tahun"
                    onChange={(e) => setYear(e.target.value)}
                ></Select>
            </div>
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 text-primary *:min-h-40 *:p-5 *:rounded-lg *:flex *:flex-col *:justify-between *:shadow-md">
                <Card
                    data={data?.data?.count?.totalProposal}
                    title="Total Usulan"
                    loading={isLoading}
                    className="col-span-2 bg-secondary/90"
                />
                <Card
                    data={data?.data?.count?.newProposal}
                    title="Usulan Baru"
                    loading={isLoading}
                    className="bg-indigo-300"
                />
                <Card
                    data={data?.data?.count?.proposalOnProgress}
                    title="Usulan Diproses"
                    loading={isLoading}
                    className="bg-yellow-300"
                />
                <Card
                    data={data?.data?.count?.proposalFinished}
                    title="Usulan Selesai"
                    loading={isLoading}
                    className="bg-green-300"
                />
            </div>
            <div className="h-[80vh] p-5 rounded-lg bg-white border-2 border-secondary/15 shadow-md">
                {isLoading && (
                    <p className="text-primary text-center">
                        <AutorenewOutlined
                            className="animate-spin"
                            fontSize="large"
                        />
                    </p>
                )}
                {!isLoading && data?.data?.graph && (
                    <Chart props={data.data.graph} />
                )}
            </div>
        </>
    );
}
