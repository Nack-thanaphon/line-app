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

  const user = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getAll");
      // console.log(response.data)
      setUserdata(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  let LiffID = "2005619015-0Bl842BP";
  let LiffUrl = "https://liff.line.me/2005619015-0Bl842BP";

  const fetchUserProfile = async () => {
    try {
      liff.getProfile().then(async (profile) => {
        try {
          const data = {
            userId: profile.userId,
            displayName: profile.displayName,
            statusMessage: profile.statusMessage,
            pictureUrl: profile.pictureUrl
          };
          const response = await axios.post(
            "http://localhost:3000/user/create-user",
            data
          );

          if (response) {
            setProfile(profile);
          }
        } catch (error) {
          console.error(error);
        }
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
    user();
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
          <ListUser data={userdata} />
        </div>
        <div className="shadow-sm sm:p-5   p-5 w-full rounded-[20px] mb-2  bg-white h-fit">
          <Profile profile={profile} />
        </div>
      </div>
    </div>
  );
}