import Image from "next/image";
import { Inter } from "next/font/google";
import Profile from "@/components/Profile";
import ListUser from "@/components/ListUser";
import { useEffect, useState } from "react";
import liff from "@line/liff";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

interface Profile {
  userId?: string;
  displayName?: string;
  statusMessage?: string;
  pictureUrl?: string;
}

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userdata, setUserdata] = useState([]);
  const [count, setCount] = useState(0);
  const [totalSend, setTotalSend] = useState(0);

  let LiffID = "2005619015-0Bl842BP";
  let LiffUrl = "https://liff.line.me/2005619015-0Bl842BP";
  let LineOa = "https://line.me/R/ti/p/@634aahso";
  let Token =
    "e1l7kAgUdMdDoCmJs3xyDu0R1yXIGedLufWKFYcAGQjgERyrPzImX6w14qLAXKWC/ZHsPuaRNR84k4V03tn0ZakqxVCLdTwChapiTEn1NnnW1nfvqhDlx0KFHMk8wRUXuFoeFZy5NlcnTpEKGT3hdAdB04t89/1O/w1cDnyilFU=";

  const user = async () => {
    try {
      const response = await axios.get(
        "https://line-webhook-s2nn.onrender.com/user/getAll"
      );
      // console.log(response.data)
      setUserdata(response.data);
      setCount(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };

  const checkTotalSend = async () => {
    try {
      const response = await axios.get(
        "https://line-webhook-s2nn.onrender.com/getTotalSend",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`
          }
        }
      );
      setTotalSend(response.data.totalUsage);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserProfile = async () => {
    const isFriend = await getFriendship();
    liff.getProfile().then(async (profile) => {
      try {
        const data = {
          userId: profile.userId,
          displayName: profile.displayName,
          statusMessage: profile.statusMessage,
          pictureUrl: profile.pictureUrl
        };

        localStorage.setItem("userData", JSON.stringify(data));

        const response = await axios.post(
          "https://line-webhook-s2nn.onrender.com/user/create-user",
          data
        );

        if (isFriend && response) {
          setProfile(profile);
        } else {
          alert("กรุณาเพิ่มเพื่อนก่อนใช้งาน");
          window.location.href = LineOa;
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  const loginInit = () => {
    liff
      .init({
        liffId: LiffID,
        withLoginOnExternalBrowser: true
      })
      .then(() => {
        liff.ready.then(async () => {
          const isFriend = await getFriendship();
          if (liff.isInClient() || liff.isLoggedIn()) {
            await fetchUserProfile();
          }
        });
      });
  };

  const PressloginIn = () => {
    liff
      .init({
        liffId: LiffID,
        withLoginOnExternalBrowser: true
      })
      .then(() => {
        liff.login({
          redirectUri: LiffUrl
        });
      });
  };

  const getFriendship = async () => {
    const friend = await liff.getFriendship();
    return friend.friendFlag;
  };

  const logout = () => {
    liff.logout();
    localStorage.clear();
  };

  useEffect(() => {
    checkTotalSend();
    loginInit()
    user();
  }, []);

  return (
    <div className="my-5">
      <div className="sm:text-center mb-4 p-6 bg-white sm:m-4 m-4 rounded-[10px]">
        <p className="sm:text-[3rem] font-bold text-green-500">Line-Login</p>
        <h1 className="mt-3">
          <span className="font-bold">จำนวนทั้งหมด</span> {count} ท่าน
        </h1>
        <h1 className="">
          <span className="font-bold">จำนวนส่งข้อความ</span> {totalSend} ครั้ง
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
          <ListUser data={userdata} />
        </div>
        <div className="shadow-sm sm:p-5   p-5 w-full rounded-[20px] mb-2  bg-white h-fit">
          <Profile
            profile={profile}
            loginInit={PressloginIn}
            checkTotalSend={checkTotalSend}
            logout={logout}
          />
        </div>
      </div>
    </div>
  );
}
