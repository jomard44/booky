function Profile() {
  return (
    <div className=" flex justify-center items-center flex-col text-center m-4  bg-blue-300 ">
      <div className="flex justify-center items-center flex-col">
        <img className="border  w-[75em] h-[10em] rounded"
          src=""
          alt=""
        />
        <div className="flex justify-center items-center flex-col mt-4 ">
          <img className="w-[5em] h-[5em] rounded-full bg-red-300" src="" alt="" />
          <h2 className="font-bold text-lg">business name</h2>
          <p className=" text-gray-600">address of the business</p>
        </div>
      </div>
      <div className=" w-[25em]">
        <h2 className="text-lg font-bold">Services</h2>
        <ul className="border rounded">
          <li>service 1</li>
          <li>service 2</li>

          <li>service 3</li>

          <li>service 4</li>
        </ul>
      </div>
      <div className="m-4">
        <h2>Calandar</h2>
        <div className="w-[50em] h-[10em] bg-gray-100 mb-10 "></div>
      </div>
    </div>
  );
}

export default Profile;
