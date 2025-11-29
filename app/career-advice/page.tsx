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
    title: "Өөрийн контентын чиглэлийг тодорхойл",
    description:
      "Контент бүтээгч болохын тулд эхлээд өөрийн niche буюу чиглэлээ тодорхойл. Жишээ нь: видео блог, подкаст, график дизайн, эсвэл бичлэг хийх.",
  },
  {
    icon: <PenTool className="w-6 h-6 text-indigo-600" />,
    title: "Чанартай контент бүтээх",
    description:
      "Үзэгчдэд үнэ цэнэ өгөх, мэдээлэл өгч, хөгжөөнтөөр, эсвэл мэдлэг өгдөг контентыг бүтээх нь хамгийн чухал.",
  },
  {
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    title: "Нийгмийн сүлжээг ашиглах",
    description:
      "Instagram, TikTok, YouTube гэх мэт платформ дээр идэвхтэй оролцож, үзэгчидтэйгээ харилцах нь таны брэндийг өсгөдөг.",
  },
  {
    icon: <Camera className="w-6 h-6 text-indigo-600" />,
    title: "Видео болон зураг засварлах ур чадвар эзэмших",
    description:
      "Adobe Premiere, Final Cut Pro, Canva зэрэг хэрэгслээр контентоо мэргэжлийн түвшинд засварлах нь үзэгчдэд таалагдана.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
    title: "Шинэ санааг байнга судлах",
    description:
      "Контентын чиг хандлагыг судалж, трэндийг дагах, шинэлэг санааг туршиж үзэх нь амжилтын түлхүүр.",
  },
];

const CareerAdvicePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Контент бүтээгчдэд зориулсан Карьер Зөвлөгөө
      </h1>

      <p className="text-gray-700 mb-10">
        Контент бүтээгч болох нь зөвхөн бүтээлч байхаас гадна зөв стратеги, ур чадвар шаарддаг.
        Доорх зөвлөгөөг мөрдвөл та илүү үр дүнтэй, амжилттай контент бүтээгч болох боломжтой.
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
