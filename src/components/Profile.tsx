import React from "react";
import axios from "axios";

var Token =
  "e1l7kAgUdMdDoCmJs3xyDu0R1yXIGedLufWKFYcAGQjgERyrPzImX6w14qLAXKWC/ZHsPuaRNR84k4V03tn0ZakqxVCLdTwChapiTEn1NnnW1nfvqhDlx0KFHMk8wRUXuFoeFZy5NlcnTpEKGT3hdAdB04t89/1O/w1cDnyilFU=";
var groupId = "Ccd2e64934b5aeac2fc44551f32f51940";

const now = new Date();
const currentTime = now.toLocaleTimeString();

const DataforSend = (userId: string, userName: string) => {
  return {
    to: userId,
    messages: [
      {
        type: "flex",
        altText: "🏥 Server Status",
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
                text: userName !== "" ? "สวัสดีคุณ " + userName : "",
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
                        text: currentTime,
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
      }
    ]
  };
};

async function sendPost(userId: string, displayName: string) {
  const url = "https://line-webhook-s2nn.onrender.com/sendLine";
  const data = DataforSend(userId, displayName);
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Token}`
      }
    });
    return response.data;
  } catch (error) {
    console.log(`Error in sendPost: ${error}`);
    // throw error;
  }
}

function Profile({ profile }: any) {
  if (!profile)
    return (
      <div>
        <p>ไม่พบข้อมูล</p>
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
          className="curser-pointer bg-green-400 text-black rounded-[10px] p-5 font-bold w-full mb-2 sm:mr-1"
          onClick={() => sendPost(profile.userId, profile.displayName)}
        >
          ส่งข้อความหาฉัน
        </button>
        <button
          className="curser-pointer bg-green-400 text-black rounded-[10px] p-5 font-bold w-full  mb-2"
          onClick={() => sendPost(groupId, "")}
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
