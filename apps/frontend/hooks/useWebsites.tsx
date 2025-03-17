import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { API_BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

interface websites {
    id: string;
    url: string;
    ticks: {
        id: string,
        createdAt: string,
        status: string,
        latency: string
    }[];
}

export function useWebsites() {
    const { getToken } = useAuth();
    const [websites, setWebsites]= useState<websites[]>([]);

    async function refreshWebsites () {
        const token = await getToken();

        const response = await axios.get(`${API_BACKEND_URL}/api/v1/websites`, {
            headers: {
                Authorization: token,
            }
        })

        setWebsites(response.data.websites);
    }

    useEffect(() => {
        refreshWebsites();
        const interval = setInterval(() => {
            refreshWebsites();
        },  1000 * 60 * 1)
    }, [])

    return({websites, refreshWebsites})
}