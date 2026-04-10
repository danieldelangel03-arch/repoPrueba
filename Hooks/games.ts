import { useEffect, useState } from "react";
import type { Game } from "../Type";

type GameApi = {
    id: number;
    title: string;
    image: string;
    description: string;
    status: string;
}

const API_URL = "https://www.gamerpower.com/api/giveaways";

// Lista de proxies CORS, se intentan en orden hasta que uno funcione
const PROXIES = [
    (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    (url: string) => `https://cors-anywhere.herokuapp.com/${url}`,
];

const fetchWithFallback = async (url: string): Promise<GameApi[]> => {
    for (const buildProxy of PROXIES) {
        try {
            const proxyUrl = buildProxy(url);
            const response = await fetch(proxyUrl);
            if (!response.ok) continue;
            const data = await response.json();
            // allorigins a veces envuelve la respuesta en { contents: "..." }
            if (typeof data === "string") return JSON.parse(data);
            if (data?.contents) return JSON.parse(data.contents);
            return data;
        } catch {
            continue;
        }
    }
    throw new Error("Todos los proxies fallaron");
};

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await fetchWithFallback(API_URL);
                setGames(data.map(game => ({
                    id: game.id,
                    title: game.title,
                    image: game.image,
                    description: game.description,
                    status: game.status
                })));
            } catch (err) {
                console.error("Error fetching games:", err);
                setError("No se pudieron cargar los juegos. Intenta más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return { games, loading, error };
};

export default useGames;