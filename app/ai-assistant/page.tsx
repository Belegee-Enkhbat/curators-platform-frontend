"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { 
    Menu, Globe, LogOut, LogIn, TrendingUp, X, ExternalLink, 
    Users, BarChart2, Zap, Heart, MessageSquare, Repeat2, 
    Upload, Search, Brain, Loader2, Clock, Eye, Aperture
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_AI_ANALYSIS } from '@/data/mockData';
import { AnalysisResult } from '@/types/schema';



const AiAssistantPage = () => {
    const [contentUrl, setContentUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

    const handleAnalyze = () => {
        if (!contentUrl) {
            // Replaced alert() with console warning as per instructions
            console.warn("Анализ хийх контентын линк эсвэл файлыг оруулна уу.");
            return;
        }

        setIsLoading(true);
        setAnalysisResult(null);
        
        // Simulate API call delay
        setTimeout(() => {
            setAnalysisResult(MOCK_AI_ANALYSIS);
            setIsLoading(false);
        }, 2500); // 2.5 seconds delay
    };

    interface AnalyticBarProps {
        label: string;
        percentage: number;
        color: string;
    }

    const AnalyticBar: React.FC<AnalyticBarProps> = ({ label, percentage, color }) => (
        <div className="flex flex-col">
            <div className="flex justify-between text-sm font-medium mb-1">
                <span className="text-gray-700">{label}</span>
                <span className="text-indigo-600">{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                    className={`${color} h-3 rounded-full transition-all duration-700`} 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center">
                <Brain className="w-8 h-8 mr-3 text-indigo-600" />
                AI Content Analysis Assistant
            </h1>
            <p className="text-gray-600 mb-8">
                Your AI-powered tool to evaluate and enhance your content&apos;s performance across social media platforms.
            </p>

            {/* Input Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-100 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Search className="w-5 h-5 mr-2 text-indigo-500" />
                    Content URL or Upload File
                </h2>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Сошиал медиа линк (жишээ: TikTok, YouTube) эсвэл видео файлын нэр"
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isLoading}
                    />
                    <Button 
                        onClick={handleAnalyze} 
                        disabled={isLoading}
                        className="flex items-center justify-center min-w-[150px]"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        ) : (
                            <Upload className="w-5 h-5 mr-2" />
                        )}
                        {isLoading ? 'Анализ хийж байна...' : 'Контент Анализ Хийх'}
                    </Button>
                </div>
            </div>

            {/* Analysis Result Section */}
            {analysisResult && (
                <div className="space-y-10">
                    <div className="bg-white p-8 rounded-xl shadow-2xl border border-red-200">
                        <h2 className="text-3xl font-extrabold text-red-700 mb-4 flex items-center">
                            <Aperture className="w-7 h-7 mr-3 text-red-500" />
                            AI Content Roast
                        </h2>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{analysisResult.contentTitle}</h3>
                        <p className="text-lg text-gray-700 leading-relaxed bg-red-50 p-4 rounded-lg border border-red-300">
                            {analysisResult.aiRoast}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Key Metrics */}
                        <div className="lg:col-span-1 space-y-4">
                            <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 mb-4">Basic Metrics</h3>
                            {[
                                { icon: Eye, label: 'Total Views', value: analysisResult.keyMetrics.totalViews, color: 'text-indigo-500' },
                                { icon: Clock, label: 'Average Watch Time', value: analysisResult.keyMetrics.avgWatchTime, color: 'text-green-500' },
                                { icon: Heart, label: 'Saved Users', value: analysisResult.keyMetrics.saveRate, color: 'text-pink-500' },
                                { icon: TrendingUp, label: 'Conversion Rate', value: analysisResult.keyMetrics.conversionRate, color: 'text-yellow-500' },
                            ].map((metric, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                                    <metric.icon className={`w-6 h-6 mr-3 ${metric.color}`} />
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Platform Reach & Age Engagement */}
                        <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-indigo-700 border-b pb-2 mb-4">Platform Reach & Target Audience</h3>
                            
                            {/* Platform Reach */}
                            <div className="mb-6">
                                <p className="text-lg font-semibold text-gray-800 mb-3">Platform Reach (%)</p>
                                <div className="space-y-3">
                                    {analysisResult.platformReach.map((platform, index) => (
                                        <AnalyticBar 
                                            key={index}
                                            label={platform.name}
                                            percentage={platform.reach}
                                            color={platform.color}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Age Group Engagement */}
                            <div>
                                <p className="text-lg font-semibold text-gray-800 mb-3">Age Group Engagement (%)</p>
                                <div className="space-y-3">
                                    {analysisResult.targetAge.map((item, index) => (
                                        <AnalyticBar 
                                            key={index}
                                            label={`${item.range} years`}
                                            percentage={item.engagement}
                                            color={item.color}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



export default AiAssistantPage;