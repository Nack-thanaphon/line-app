import Image from "next/image";
import { Inter } from "next/font/google";
import Profile from "@/components/Profile";
import ListUser from "@/components/ListUser";
import { useEffect } from "react";
import liff from "@line/liff";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = [
    {
      username: "admin1",
      password: "admin",
      url: "image/profile.jpg",
      email: "admin1@example.com",
      lineId: "line1",
      userId: "user1"
    },
    {
      username: "admin2",
      password: "admin",
      url: "image/profile.jpg",
      email: "admin2@example.com",
      lineId: "line2",
      userId: "user2"
    },
    {
      username: "admin3",
      password: "admin",
      url: "image/profile.jpg",
      email: "admin3@example.com",
      lineId: "line3",
      userId: "user3"
    },
    {
      username: "admin4",
      password: "admin",
      url: "image/profile.jpg",
      email: "admin4@example.com",
      lineId: "line4",
      userId: "user4"
    },
    {
      username: "admin5",
      password: "admin",
      url: "image/profile.jpg",
      email: "admin5@example.com",
      lineId: "line5",
      userId: "user5"
    }
  ];

  let LiffID = "2005619015-0Bl842BP";
  let LiffUrl = "https://liff.line.me/2005619015-0Bl842BP";

  const fetchUserProfile = async () => {
    try {
      liff.getProfile().then((profile) => {
        console.log(profile);
      });
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };
  
  const loginInit = () => {
    liff
      .init({
        liffId: LiffID,
        withLoginOnExternalBrowser: true
      })
      .then(() => {
        liff.ready.then(async () => {
          if (liff.isInClient() || liff.isLoggedIn()) {
            await fetchUserProfile();
          } else {
            await liff.login({
              redirectUri: LiffUrl
            });
          }
        });
      });
  };

  useEffect(() => {
    loginInit();
  }, []);
  return (
    <div className="my-5">
      <div className="sm:text-center mb-4 p-6 bg-white sm:m-4 m-4 rounded-[10px]">
        <p className="sm:text-[3rem] font-bold text-green-500">
          Line-Login-Taining
        </p>
        <h1 className="mt-3">
          <span className="font-bold">จำนวนทั้งหมด</span> {user.length}
        </h1>
        <h1>
          <span className="font-bold">Database</span> : mongo-db
        </h1>
      </div>
      <div className="sm:grid grid-cols-2 gap-3 m-4">
        <div className="shadow-sm sm:p-5   p-5 w-full rounded-[20px] mb-2  bg-white h-fit">
          <h1 className="sm:text-[2rem] font-bold">
            รายชื่อผู้ใช้งาน Line-Login
          </h1>
          <ListUser data={user} />
        </div>
        <div className="shadow-sm sm:p-5   p-5 w-full rounded-[20px] mb-2  bg-white h-fit">
          <Profile />
        </div>
      </div>
    </div>
  );
}
