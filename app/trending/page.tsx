"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Menu, Globe, LogOut, LogIn, TrendingUp, X, ExternalLink, Users, BarChart2, Zap, Heart, MessageSquare, Repeat2 } from 'lucide-react';

interface Trend {
    title: string;
    summary: string;
    source: string;
    url: string;
}

// The API key provided by the user in the prompt
const YOUR_NEWSDATA_API_KEY = "pub_11b19b9cc882463ba1b9b53218e9c042";

// Static Data for SPECIFIC TREND Analytics (Mocking "Almas TV" virality)
const MOCK_TREND_ANALYTICS = {
    trendName: 'Almas TV-н Шинэ Дугаар (Viral)',
    impressions: '12.8M', // Total views/impressions across platforms
    engagementRate: '7.2%', // Overall high engagement
    sentiment: {
        positive: 65,
        neutral: 20,
        negative: 15,
    },
    reachByPlatform: [
        { name: 'TikTok', reach: 45, color: 'bg-black' }, // High TikTok reach
        { name: 'Facebook', reach: 35, color: 'bg-blue-600' },
        { name: 'YouTube', reach: 15, color: 'bg-red-600' },
        { name: 'Instagram', reach: 5, color: 'bg-pink-600' },
    ],
    ageGroupEngagement: [
        { range: '18-24', engagement: 40, color: 'bg-indigo-500' },
        { range: '25-34', engagement: 30, color: 'bg-green-500' },
        { range: '35-44', engagement: 15, color: 'bg-yellow-500' },
        { range: '45+', engagement: 15, color: 'bg-red-500' },
    ],
};

const TrendCard = ({ trend }: { trend: Trend }) => (
    <div className="bg-white p-4 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition duration-300">
        <h3 className="text-md font-bold text-gray-900 mb-1 line-clamp-2">
            {trend.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">
            {trend.summary || "Товч мэдээлэл байхгүй."}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
            <span className="font-medium text-indigo-600">{trend.source}</span>
            <a
                href={trend.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
            >
                Дэлгэрэнгүй <ExternalLink className="w-3 h-3 ml-1" />
            </a>
        </div>
    </div>
);

// Updated Component for the SPECIFIC Trend Analysis
const AnalyticsSection = () => (
    <div className="col-span-1 lg:col-span-2 space-y-8">
        <h2 className="text-3xl font-extrabold text-gray-900 flex items-center border-b pb-2">
            <BarChart2 className="w-6 h-6 mr-2 text-indigo-600" />
            Трэндийн Нарийвчилсан Анализ: <span className="text-red-600 ml-2">{MOCK_TREND_ANALYTICS.trendName}</span>
        </h2>
        <p className="text-sm text-gray-600 -mt-6">Энэхүү контентын нийгмийн сүлжээн дэх тархалт, оролцооны мэдээлэл.</p>

        {/* 1. Key Metrics Card */}
        <div className="grid md:grid-cols-4 gap-6">
            {/* Metric 1: Total Impressions */}
            <div className="bg-white p-5 rounded-xl shadow-lg border border-indigo-100 flex flex-col items-start">
                <Users className="w-7 h-7 text-indigo-500 mb-3" />
                <p className="text-sm font-medium text-gray-500">Нийт Үзэлт/Импрешн</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_TREND_ANALYTICS.impressions}</p>
            </div>
            {/* Metric 2: Engagement Rate */}
            <div className="bg-white p-5 rounded-xl shadow-lg border border-green-100 flex flex-col items-start">
                <Heart className="w-7 h-7 text-green-500 mb-3" />
                <p className="text-sm font-medium text-gray-500">Дундаж Оролцоо (Engagement)</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{MOCK_TREND_ANALYTICS.engagementRate} <span className="text-sm font-normal text-green-500">↑ 0.9%</span></p>
            </div>
            {/* Metric 3: Shares/Reposts */}
            <div className="bg-white p-5 rounded-xl shadow-lg border border-yellow-100 flex flex-col items-start">
                <Repeat2 className="w-7 h-7 text-yellow-500 mb-3" />
                <p className="text-sm font-medium text-gray-500">Нийт Share/Repost</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">450K</p>
            </div>
             {/* Metric 4: Sentiment Split */}
             <div className="bg-white p-5 rounded-xl shadow-lg border border-pink-100 flex flex-col items-start">
                <MessageSquare className="w-7 h-7 text-pink-500 mb-3" />
                <p className="text-sm font-medium text-gray-500">Сэтгэгдлийн Сентимент</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                    {MOCK_TREND_ANALYTICS.sentiment.positive}% Эерэг
                </p>
            </div>
        </div>

        {/* 2. Detailed Distribution: Platform Reach & Age Group Engagement */}
        <div className="grid lg:grid-cols-2 gap-6">
            {/* 2.1 Platform Reach Distribution */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center"><Globe className="w-5 h-5 mr-2"/> Платформын Тархалт</h3>
                <p className="text-sm text-gray-500 mb-4">Тус контент аль платформууд дээр зонхилж байна.</p>
                
                <div className="space-y-3">
                    {MOCK_TREND_ANALYTICS.reachByPlatform.map((platform, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span className="text-gray-700">{platform.name}</span>
                                <span className="text-indigo-600">{platform.reach}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className={`${platform.color} h-3 rounded-full transition-all duration-700`} 
                                    style={{ width: `${platform.reach}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2.2 Age Group Engagement */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-indigo-700 mb-4 flex items-center"><Users className="w-5 h-5 mr-2"/> Насны Бүлгийн Оролцоо</h3>
                <p className="text-sm text-gray-500 mb-4">Хамгийн идэвхтэй оролцож буй насны ангилал.</p>
                
                <div className="space-y-3">
                    {MOCK_TREND_ANALYTICS.ageGroupEngagement.map((item, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="flex justify-between text-sm font-medium mb-1">
                                <span className="text-gray-700">{item.range} нас</span>
                                <span className="text-indigo-600">{item.engagement}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className={`${item.color} h-3 rounded-full transition-all duration-700`} 
                                    style={{ width: `${item.engagement}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const TrendingPage = () => {
    const [mongoliaTrends, setMongoliaTrends] = useState<Trend[]>([]);
    const [globalTrends, setGlobalTrends] = useState<Trend[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch Mongolian trends
    const fetchMongoliaTrends = async (): Promise<Trend[]> => {
        try {
            const url = `https://newsdata.io/api/1/news?apikey=${YOUR_NEWSDATA_API_KEY}&country=mn&language=mn&page=1`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Mongolia API error: ${res.status}`);
            const json = await res.json();

            if (!json.results) return [];
            return json.results.slice(0, 5).map((item: Trend) => ({
                title: item.title,
                summary: item.summary || "",
                source: item.source || "Мэдээний Эх Сурвалж",
                url: item.url,
            }));
        } catch (err) {
            console.error("Mongolia API error:", err);
            // Fallback for API key issues
            return [{ title: "Мэдээний API ажиллахгүй байна (Demo)", summary: "Newsdata.io API түлхүүр асуудалтай байна эсвэл квот дууссан. Мэдээллийг түр хугацаанд харуулж чадахгүй.", source: "Систем", url: "#" }];
        }
    };

    // Function to fetch Global trends
    const fetchGlobalTrends = async (): Promise<Trend[]> => {
        try {
            const url = `https://newsdata.io/api/1/news?apikey=${YOUR_NEWSDATA_API_KEY}&language=en&page=1`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Global API error: ${res.status}`);
            const json = await res.json();

            if (!json.results) return [];
            return json.results.slice(0, 5).map((item: Trend) => ({
                title: item.title,
                summary: item.summary || "",
                source: item.source || "Global News",
                url: item.url,
            }));
        } catch (err) {
            console.error("Global API error:", err);
            // Fallback for API key issues
            return [{ title: "Global News API Down (Demo)", summary: "Newsdata.io API key issue or quota reached. Displaying static fallback data.", source: "System", url: "#" }];
        }
    };

    const fetchTrendingContent = useCallback(async () => {
        setLoading(true);
        setError(null);
        setMongoliaTrends([]);
        setGlobalTrends([]);

        try {
            const [mn, global] = await Promise.all([
                fetchMongoliaTrends(),
                fetchGlobalTrends(),
            ]);
            setMongoliaTrends(mn);
            setGlobalTrends(global);
        } catch {
            setError("API-с мэдээлэл татаж чадсангүй.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTrendingContent();
    }, [fetchTrendingContent]);

    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
                <TrendingUp className="w-8 h-8 mr-3 text-indigo-600" />
                CURAtors Аналитик & Мэдээний Самбар
            </h1>

            {/* 1. Analytics and Demographics Section: Now specific trend analysis */}
            <AnalyticsSection />

            {/* 2. Real-time News Feed Section */}
            <div className="mt-12">
                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center border-b pb-2 mb-6">
                    <Zap className="w-6 h-6 mr-2 text-indigo-600" />
                    Бодит Цагийн Мэдээ (Newsdata.io-с)
                </h2>
                
                {loading && (
                    <div className="flex flex-col items-center h-48 bg-white rounded-xl shadow-lg justify-center">
                        <div className="animate-spin h-12 w-12 border-b-4 border-indigo-600 rounded-full mb-4"></div>
                        <p className="text-indigo-600 font-medium">Мэдээлэл татаж байна...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-md">
                        <X className="w-5 h-5 mr-2" />
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Mongolia Trends */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-indigo-700 flex items-center">
                                🇲🇳 Монгол Улсын Трэнд
                            </h3>
                            {mongoliaTrends.map((trend, index) => (
                                <TrendCard key={index} trend={trend} />
                            ))}
                        </div>

                        {/* Global Trends */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-700 flex items-center">
                                🌍 Дэлхийн Трэнд
                            </h3>
                            {globalTrends.map((trend, index) => (
                                <TrendCard key={index} trend={trend} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrendingPage;