"use client";
// pages/index.tsx
import { useState } from "react";
import TypingEffect from "./typer";

export const Home = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  
  const sendRequest = async () => {
    const apiUrl = 'https://d5dnti4ot0csaprtjfff.emzafcgx.apigw.yandexcloud.net/gpt';
    const iamToken = 't1.9euelZrJlcrKxo-ayJPLm5GSzc6OzO3rnpWajJiPz8fJlcaMjcfIzYqdnM7l8_dyKGZE-e9ND0gv_t3z9zJXY0T5700PSC_-zef1656VmsqSl8ybl87NlJ6Ki82NzJjL7_zF656VmsqSl8ybl87NlJ6Ki82NzJjL.eLpjPA0dsFAqanSrZ78psjZkJ3qzyr6Cbq8t5gfY0hwLhKCAErTAEHMfJCPQzd1RIlptnnj-HO5sP4amBxjBCg'; // Замените на ваш IAM-токен
    const folderId = 'b1gp5dlh19tuvc5gipie';

    const requestData = {
      modelUri: `gpt://b1gp5dlh19tuvc5gipie/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.6,
        maxTokens: 2000
      },
      messages: [
        { "role": "system", "text": "Ты умный ассистент" },
        { "role": "system", "text": "Тут контент страницы" },
        { "role": "user", "text": `${inputText}` }
      ]
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${iamToken}`,
          'x-folder-id': folderId
        },
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      console.log(result)
      setOutputText(result.result.alternatives[0].message.text);
    } catch (error) {
      console.error("Ошибка запроса:", error);
    }
  };

  return (
    <div className="w-1/2">
    <button 
      onClick={sendRequest}
      className="p-2 bg-blue-500 text-white rounded-md mt-2"
    >
      Отправить
    </button>
    <textarea
        id="inputText"
        rows={4}
        cols={50}
        placeholder="Введите текст для запроса"
        value={inputText}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
        <div className="flex min-h-screen bg-gray-100 w-90 p-2 rounded-md">
            <div className="bg-white min-h-screen w-full m-2 rounded-md p-5 text-left">
            <TypingEffect text={outputText} speed={25} />
            </div>
        </div>
    </div>
    
  );
};
