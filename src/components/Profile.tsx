import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
var Token =
  "e1l7kAgUdMdDoCmJs3xyDu0R1yXIGedLufWKFYcAGQjgERyrPzImX6w14qLAXKWC/ZHsPuaRNR84k4V03tn0ZakqxVCLdTwChapiTEn1NnnW1nfvqhDlx0KFHMk8wRUXuFoeFZy5NlcnTpEKGT3hdAdB04t89/1O/w1cDnyilFU=";
var groupId = "Ccd2e64934b5aeac2fc44551f32f51940";

const now = new Date();

const date = now.toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit"
});

const time = now.toLocaleTimeString("en-GB", {
  hour: "2-digit",
  minute: "2-digit"
});

const formattedDateTime = `${date} เวลา ${time}`;

const DataforSend = (userId: string, userName: string) => {
  const message = {
    type: "flex",
    altText: "BOT-ALERT : Server-Status",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url: "https://media.jobthai.com/v1/images/logo-pic-map/206659_logo_20220304152555.jpeg",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
        action: {
          type: "uri",
          label: "Action",
          uri: "https://linecorp.com/"
        }
      },
      body: {
        type: "box",
        layout: "vertical",
        spacing: "md",
        contents: [
          {
            type: "text",
            text: userName !== "" ? "สวัสดีคุณ " + userName : "Report",
            contents: []
          },
          {
            type: "text",
            text: "Server Status",
            weight: "bold",
            size: "xl",
            gravity: "center",
            wrap: true,
            contents: []
          },
          {
            type: "box",
            layout: "baseline",
            margin: "md",
            contents: [
              {
                type: "icon",
                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                size: "sm"
              },
              {
                type: "icon",
                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                size: "sm"
              },
              {
                type: "icon",
                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                size: "sm"
              },
              {
                type: "icon",
                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
                size: "sm"
              },
              {
                type: "icon",
                url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png",
                size: "sm"
              },
              {
                type: "text",
                text: "4.0",
                size: "sm",
                color: "#999999",
                flex: 0,
                margin: "md",
                contents: []
              }
            ]
          },
          {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            margin: "lg",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Date",
                    size: "sm",
                    color: "#AAAAAA",
                    flex: 1,
                    contents: []
                  },
                  {
                    type: "text",
                    text: formattedDateTime,
                    size: "sm",
                    color: "#666666",
                    flex: 4,
                    wrap: true,
                    contents: []
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Server Status #1",
                    size: "sm",
                    color: "#AAAAAA",
                    flex: 1,
                    wrap: false,
                    contents: []
                  },
                  {
                    type: "text",
                    text: "กำลังใช้งาน",
                    size: "sm",
                    color: "#04A223FF",
                    flex: 1,
                    wrap: true,
                    contents: []
                  }
                ]
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "Server Status #2",
                    size: "sm",
                    color: "#AAAAAA",
                    flex: 1,
                    wrap: false,
                    contents: []
                  },
                  {
                    type: "text",
                    text: "ใช้งานไม่ได้",
                    size: "sm",
                    color: "#DA0202FF",
                    flex: 1,
                    wrap: true,
                    contents: []
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };

  let body = {
    to: userId,
    messages: [message]
  };

  return body;
};

async function sendPost(
  userId: string,
  displayName: string,
  checkTotalSend: any
) {
  const url = "https://line-webhook-s2nn.onrender.com/sendLine";
  const data = DataforSend(userId, displayName);
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`
      }
    });

    if (response.data.message === "success") {
      checkTotalSend();
      Swal.fire({
        title: "สำเร็จ!",
        text: "ส่งข้อความสำเร็จ",
        icon: "success"
      });
    }
    return response.data;
  } catch (error) {
    console.log(`Error in sendPost: ${error}`);
    // throw error;
  }
}

function Profile({ profile, loginInit, checkTotalSend }: any) {
  if (!profile)
    return (
      <div className="py-6">
        <div className="mb-3 py-4">
          <p className="sm:text-[2rem] font-bold">ไม่พบข้อมูล</p>
        </div>
        <div
          onClick={loginInit}
          className="curser-pointer bg-green-400 active:bg-green-600 text-black rounded-[10px] p-5  w-full  flex justify-center mb-2 my-auto"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
            className="w-[40px] mr-4"
          />{" "}
          <div className="my-auto font-bold">Login With Line</div>
        </div>
      </div>
    );

  return (
    <>
      <div className="py-4">
        <img
          src={profile?.pictureUrl}
          className="rounded-full w-[120px] h-[120px] mx-auto m-4"
        />
      </div>
      <h1 className="font-bold text-[1.4rem] text-center">
        ข้อมูลผู้ใช้งานปัจจุบัน
      </h1>
      <hr className="my-5" />
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">ProfileId</h1>
        <p>{profile?.userId}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">Name</h1>
        <p>{profile?.displayName}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">Status</h1>
        <p>{profile?.statusMessage}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">JsonData</h1>
        <div className="p-4  bg-slate-300 rounded-[10px] my-3 overflow-x-scroll">
          <pre className="text-[0.8rem] text-nowrap">
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      </div>

      <div className="sm:flex justify-content-between mt-[2px]">
        <button
          className="curser-pointer bg-green-400 active:bg-green-600 text-black rounded-[10px] p-5 font-bold w-full mb-2 sm:mr-1"
          onClick={() =>
            sendPost(profile.userId, profile.displayName, checkTotalSend)
          }
        >
          ส่งข้อความหาฉัน
        </button>
        <button
          className="curser-pointer bg-green-400 active:bg-green-600 text-black rounded-[10px] p-5 font-bold w-full  mb-2"
          onClick={() => sendPost(groupId, "", checkTotalSend)}
        >
          ส่งข้อความหาภายในกลุ่ม
        </button>
      </div>
      <div className="mt-3">
        <a href="LINE-PUSH.postman_collection.json" download={true}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 inline-block align-middle mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Download Postman Document
        </a>
      </div>
    </>
  );
}

export default Profile;
