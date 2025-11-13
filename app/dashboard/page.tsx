"use client"; // This is a client component

import React, { useEffect, useState } from 'react';
import Navbar from "@/app/navbar/page";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import OpenAIAssistant from "@/app/ui/openai-assistant";
import Card from './Card';

interface IJwtObject {
  email?: string;
}

export default function Home() {
  const [selectedAssistant, setSelectedAssistant] = useState<any | null>(null);
  const [showCards, setShowCards] = useState(true);
    const [useremail, setUserEmail] = useState('');

  useEffect(() => {
    const id_token: string = Cookies.get("id_token") || '';

    if (!id_token) {
      return;
    }
    try {
      const decoded: IJwtObject = jwtDecode(id_token);
      setUserEmail(decoded.email ?? '');
      if (!decoded || !decoded.email) {
        setUserEmail(decoded.email ?? '');
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);

    }
  }, []);

  const IPoemails=['ragini@excelindia.com',
'shruthi.sudhanva@excelindia.com',
'sudhanva@excelindia.com',
'shiv@excelindia.com',
'kulkarni@excelindia.com',
'prashanth@excelindia.com',
'adarsh@excelindia.com',
'sridhar@excelindia.com',
'ravi.s@excelindia.com',
'mahesh.jambardi@excelindia.com',
'adarsh.mysore@excelindia.com']
  let cards=[];
 if (useremail && IPoemails.includes(useremail)) {
  cards = [
    {
      imageSrc: 'https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg',
      title: 'AskIT @ Excelsoft v1.0',
      description: 'You can ask questions like: Summarise the Email Security Policy at Excelsoft. What is the password policy at Excelsoft? I lost my laptop, What should I do? Summarise the software licensing procedure at Excelsoft. Can I bring my personal laptop to office?',
      id: "asst_TtG4o3YhcsEw8akn7mHUt2Xa"
    },
    {
      imageSrc: 'https://cdn.pixabay.com/photo/2023/10/21/12/35/ai-generated-8331364_640.jpg',
      title: 'AskHR @ Excelsoft v1.0',
      description: 'You can ask questions like: Summarise the HR Policy for Career Enhancement at Excelsoft. How many casual leaves does an employee have at Excelsoft? Summarise the Leave Policy at Excelsoft.',
      id: "asst_fRHxuw5UobxvFOBIAgl4WTWg"
    },
     {
      imageSrc: 'https://aiipo.z29.web.core.windows.net/assets/essupport.png',
      title: 'AskIPO @ Excelsoft v1.0',
      description: 'You can ask questions like: About Excelsoft. Financial information. Legal and other information?. Offer information',
      id: "asst_7AlfSjb3EKVtakbS0BkQbN6F"
    },
  ];
}else{
    cards = [
    {
      imageSrc: 'https://img.freepik.com/free-photo/ai-technology-microchip-background-digital-transformation-concept_53876-124669.jpg',
      title: 'AskIT @ Excelsoft v1.0',
      description: 'You can ask questions like: Summarise the Email Security Policy at Excelsoft. What is the password policy at Excelsoft? I lost my laptop, What should I do? Summarise the software licensing procedure at Excelsoft. Can I bring my personal laptop to office?',
      id: "asst_TtG4o3YhcsEw8akn7mHUt2Xa"
    },
    {
      imageSrc: 'https://cdn.pixabay.com/photo/2023/10/21/12/35/ai-generated-8331364_640.jpg',
      title: 'AskHR @ Excelsoft v1.0',
      description: 'You can ask questions like: Summarise the HR Policy for Career Enhancement at Excelsoft. How many casual leaves does an employee have at Excelsoft? Summarise the Leave Policy at Excelsoft.',
      id: "asst_fRHxuw5UobxvFOBIAgl4WTWg"
    }
      ,
     {
      imageSrc: 'https://aiipo.z29.web.core.windows.net/assets/essupport.png',
      title: 'AskIPO @ Excelsoft v1.0',
      description: 'You can ask questions like: About Excelsoft. Financial information. Legal and other information?. Offer information',
      id: "asst_MP1jX4AvmSTQbw41f0b8H2qF"
    }
  ];
}

  const handleCardClick = (item: any) => {
    setSelectedAssistant(item);
    setShowCards(false);
  };

  const handleBack = () => {
    setSelectedAssistant(null);
    setShowCards(true);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-0 text-center">
        {showCards && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Assistants</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {cards.map((card) => (
                <Card
                  key={card.id}
                  imageSrc={card.imageSrc}
                  title={card.title}
                  styleType='default'
                  onClick={() => handleCardClick(card)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedAssistant && (
        <OpenAIAssistant
          assistantId={selectedAssistant}
          greeting="I am a helpful chat assistant. How can I help you?"
          handleBack={handleBack}
        />
      )}
    </main>
  );
}

