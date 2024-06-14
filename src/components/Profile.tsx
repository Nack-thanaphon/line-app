import React from "react";

function Profile({ profile }: any) {
  if (!profile)
    return (
      <div>
        <p>ไม่พบข้อมูล</p>
        <div className="curser-pointer bg-green-400 text-black rounded-[10px] p-5 font-bold w-full  my-4 mb-2">
          ล็อคอินด้วย Line
        </div>
      </div>
    );

  return (
    <>
      <div className="py-4">
        <img
          src={profile.pictureUrl}
          className="rounded-full w-[120px] h-[120px] mx-auto m-4"
        />
      </div>
      <h1 className="font-bold text-[1.4rem] text-center">ข้อมูลผู้ Login ปัจจุบัน</h1>
      <hr className="my-5" />
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">ProfileId</h1>
        <p>{profile.userId}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">Name</h1>
        <p>{profile.displayName}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">Status</h1>
        <p>{profile.statusMessage}</p>
      </div>
      <div className="mb-4">
        <h1 className="font-bold text-[1.3rem]">JsonData</h1>
        <div className="p-4  bg-slate-300 rounded-[10px] my-3 overflow-x-scroll">
          <pre className="text-[0.8rem] text-nowrap">{JSON.stringify(profile, null, 2)}</pre>
        </div>
      </div>

      <div className="sm:flex justify-content-between mt-[2px]">
        <div className="curser-pointer bg-green-400 text-black rounded-[10px] p-5 font-bold w-full mb-2 sm:mr-1">
          ส่งข้อความหาฉัน
        </div>
        <div className="curser-pointer bg-green-400 text-black rounded-[10px] p-5 font-bold w-full  mb-2">
          ส่งข้อความหาภายในกลุ่ม
        </div>
      </div>
      <div className="mt-3">
        <a>
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
