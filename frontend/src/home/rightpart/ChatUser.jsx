import React from "react";

const ChatUser = () => {
  return (
    <div className="flex justify-center gap-5 h-[8vh] bg-slate-800 hover:bg-slate-600 duration-500 py-2 ">
      <div className="avatar online cursor-pointer">
        <div className="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      {/* name and status online or offline */}
      <div>
        <h1 className="text-xl">pratap</h1>
        <h2 className="text-sm">online</h2>
      </div>
    </div>
  );
};

export default ChatUser;
