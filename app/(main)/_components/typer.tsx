// components/TypingEffect.tsx
import { useEffect, useState } from "react";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface TypingEffectProps {
  text: string;
  speed?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);


  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
        if(text[index]) {
            if(index == 0)setDisplayedText(prevText => prevText + text[index]);
            setDisplayedText(prevText => prevText + text[index]);
            index += 1;
            console.log(text[index]);
        }
      

        if (index == text.length-1) {
            clearInterval(intervalId);
            setDisplayedText(prevText => prevText + '\n');
            setIsTyping(false);
        }
        }, speed);
        return () => clearInterval(intervalId);
  }, [text, speed]);

  

  return (
    <div className="font-mono text-xl">
      <Markdown remarkPlugins={[remarkGfm]}>{displayedText}</Markdown>
      <span className={`inline-block w-2 h-6 bg-black ${isTyping ? 'animate-pulse' : ''}`}></span>    
    </div>
  );
};

export default TypingEffect;
