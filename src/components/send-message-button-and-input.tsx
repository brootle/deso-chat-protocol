import { useState, KeyboardEvent } from "react";
import { Button, Textarea } from "@material-tailwind/react";
import { toast } from "react-toastify";

export interface SendMessageButtonAndInputProps {
  onClick: (messageToSend: string) => void;
}

export const SendMessageButtonAndInput = ({
  onClick,
}: SendMessageButtonAndInputProps) => {
  const [isSending, setIsSending] = useState(false);
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = async () => {
    if (messageToSend === "") {
      toast.warning("The provided message is empty");
      return;
    }
    if (isSending) {
      toast.warning(
        "Going too fast! Please wait a second before sending another message"
      );
      return;
    }
    setIsSending(true);
    setMessageToSend("");
    try {
      await onClick(messageToSend);
    } catch (e) {
      // If the onClick handler failed, reset the messageToSend
      // so the sender doesn't lose it.
      setMessageToSend(messageToSend);
    }
    setIsSending(false);
  };

  // Pressing the Enter key during Japanese conversion has prevented the message from being sent in the middle of the conversion.
  // The same phenomenon should occur in Chinese and other languages.
  // We have also confirmed that it works in English.
  const canSend = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      return true;
    }
    return false;
  };  

  return (
    <div className="flex justify-center items-start w-full p-0 pb-2 md:p-4 md:pb-2">
      <div className="flex-1">
        <div className="hidden md:block relative">
          <div className="relative">
            {/* <p className="text-left text-blue-300/40 mb-3 text-xs">
              Press Shift + Return for paragraph breaks
            </p> */}
            <Textarea
              className="text-base p-2 text-blue-100 bg-black/70 border-blue-gray-100 focus:shadow-none border-none focus:border-solid flex-1"
              label="What's on your mind?"
              onChange={(e) => {
                setMessageToSend(e.target.value);
              }}
              onKeyDown={async (e) => {
                if (canSend(e)) {
                  await sendMessage();
                }
              }}
              onKeyUp={(e) => {
                if (canSend(e)) {
                  setMessageToSend(messageToSend.trim());
                }
              }}
              value={messageToSend}
            />
          </div>
        </div>

        <div className="visible md:hidden">
          <textarea
            className="w-full h-[92px] p-2 text-base text-blue-100 bg-black/70 border-blue-gray-100 focus:shadow-none border-none focus:border-solid flex-1 rounded-[7px]"
            onChange={(e) => {
              setMessageToSend(e.target.value);
            }}
            placeholder="What's on your mind?"
            value={messageToSend}
          />
        </div>
      </div>
      <div className="flex h-[100px] items-center">
        {/* <Button
          onClick={sendMessage}
          className="bg-[#ffda59] ml-4 px-2 py-2 text-[#6d4800] center rounded-full hover:shadow-none normal-case text-lg"
        >
          <div className="flex justify-center md:w-[80px]">
            <div className="hidden md:block mx-2">Send</div>
            <div className="visible md:hidden mx-2">
              <img src="/assets/send.png" width={28} alt="send" />
            </div>
          </div>
        </Button> */}

        <Button  
          onClick={sendMessage}
          className="ml-2 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
        </Button>
        
      </div>
    </div>
  );
};
