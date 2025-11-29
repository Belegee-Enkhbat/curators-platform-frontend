"use client";

import React from "react";
import { Lightbulb, PenTool, Users, Camera } from "lucide-react";

interface AdviceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const careerAdvice: AdviceItem[] = [
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
    title: "Define Your Content Niche",
    description:
      "To become a content creator, first define your niche. For example: video blogging, podcasting, graphic design, or writing.",
  },
  {
    icon: <PenTool className="w-6 h-6 text-indigo-600" />,
    title: "Create High-Quality Content",
    description:
      "Focus on producing content that provides value to your audience—educational, entertaining, or informative.",
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: "Leverage Social Media",
    description:
      "Be active on platforms like Instagram, TikTok, and YouTube, and engage with your audience to grow your brand.",
  },
  {
    icon: <Camera className="w-6 h-6 text-indigo-600" />,
    title: "Master Video and Photo Editing",
    description:
      "Use tools like Adobe Premiere, Final Cut Pro, or Canva to professionally edit your content and appeal to viewers.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
    title: "Continuously Explore New Ideas",
    description:
      "Study content trends, follow viral patterns, and experiment with new ideas to stay ahead and achieve success.",
  },
];


const CareerAdvicePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Career Advice for Content Creators
      </h1>

        <p className="text-gray-700 mb-10">
        Here are some essential tips to help you thrive as a content creator in today&apos;s digital landscape.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        {careerAdvice.map((advice, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
          >
            <div className="flex items-center mb-4">{advice.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{advice.title}</h3>
            <p className="text-gray-600">{advice.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerAdvicePage;
