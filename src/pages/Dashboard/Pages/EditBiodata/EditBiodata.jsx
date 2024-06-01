import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { MdPhotoCamera } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utils";

const EditBiodata = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  console.log(user.photoURL);
  const [age, setAge] = useState(18);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [height, setHeight] = useState(137);
  const [weight, setWeight] = useState(40);
  const [occupation, setOccupation] = useState("Accountant");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(70);
  const [minHeight, setMinHeight] = useState(137);
  const [maxHeight, setMaxHeight] = useState(213);
  const [minWeight, setMinWeight] = useState(40);
  const [maxWeight, setMaxWeight] = useState(150);
  const expectedPartnerAge = `${minAge}-${maxAge}`;
  const expectedPartnerHeight = `${minHeight}-${maxHeight}`;
  const expectedPartnerWeight = `${minWeight}-${maxWeight}`;

  const occupations = [
    "Accountant",
    "Architect",
    "Artist",
    "Barista",
    "Business",
    "Carpenter",
    "Caregiver",
    "Chef",
    "Consultant",
    "Delivery Driver",
    "Doctor",
    "Electrician",
    "Engineer",
    "Entrepreneur",
    "Farmer",
    "Financial Analyst",
    "Firefighter",
    "Fitness Trainer",
    "Graphic Designer",
    "Human Resources Specialist",
    "Housekeeper",
    "Journalist",
    "Lawyer",
    "Marketing Professional",
    "Mechanic",
    "Military Personnel",
    "Musician",
    "Nurse",
    "Other",
    "Photographer",
    "Pilot",
    "Plumber",
    "Police Officer",
    "Real Estate Agent",
    "Salesperson",
    "Security Guard",
    "Social Worker",
    "Software Developer",
    "Student",
    "Teacher",
    "Veterinarian",
    "Waiter/Waitress",
    "Writer",
  ];

  const [imagePreview, setImagePreview] = useState(user.photoURL || "");
  const [imageFile, setImageFile] = useState(null);

  console.log(imageFile);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleOccupationChange = (e) => {
    setOccupation(e.target.value);
  };

  const weights = [];
  for (let i = 40; i <= 150; i++) {
    weights.push(i);
  }

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const heights = [];
  for (let i = 137; i <= 213; i++) {
    heights.push(i);
  }

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  const ages = Array.from({ length: 53 }, (_, i) => i + 18);

  const { mutateAsync } = useMutation({
    mutationFn: async (bdata) => {
      const { data } = await axiosSecure.put("/biodata", bdata);
      return data;
    },
    onSuccess: () => {
      toast.success("Room Added Successfully!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const race = form.race.value;
    const name = form.name.value;
    const sex = form.sex.value;
    const permanentDivision = form.permanentDivision.value;
    const presentDivision = form.presentDivision.value;
    const mobile = form.mobile.value;
    const email = user?.email;
    const imagesel = form.image.files[0];
    const imageu = `${user.photoURL}`;

    try {
      const imageaa = imagesel ? await imageUpload(imagesel) : imageu;
      const bdata = {
        name,
        age,
        sex,
        height,
        weight,
        dateOfBirth,
        occupation,
        race,
        presentDivision,
        permanentDivision,
        expectedPartnerAge,
        expectedPartnerHeight,
        expectedPartnerWeight,
        mobile,
        email,
        image: imageaa,
      };
      console.table(bdata);

      //   Post request to server
      await mutateAsync(bdata);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div
        // style={{
        //   backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url(${bgimg})`,
        // }}
        className="mt-8 rounded-2xl bg-cover flex justify-center items-center lg:h-56"
      >
        <div>
          <h2 className=" text-center pt-2 lg:pt-0 font-bold text-2xl md:text-4xl text-whiteM mb-2">
            Edit Biodata
          </h2>
          <p className="text-lgreenM px-4 pb-4 text-center">
            Share your culinary masterpieces with the world in our dedicated
            food posting section, where every dish becomes a feast for the eyes.
          </p>
        </div>
      </div>
      <div data-aos="fade-up" className="lg:mt-8 mt-6 mb-10 lg:mb-20">
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <div className="flex justify-center relative">
              <img
                className="mt-4 rounded-full w-[120px] h-[120px] border-4 border-[#5CDB95] transition hover:scale-105"
                src={imagePreview}
                alt=""
              />
              <div className="absolute bottom-0 right-[45%]">
                <label
                  htmlFor="image"
                  className="block mb-2 bg-black text-xl p-2 text-white rounded-full cursor-pointer"
                >
                  <MdPhotoCamera />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="name">
                Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="name"
                name="name"
                defaultValue={user?.displayName}
                required
                placeholder="Enter Name"
              />
            </div>
            <div className="lg:w-1/2 lg:flex gap-4">
              <div className="lg:w-1/2">
                <label className="text-whiteM  font-semibold" htmlFor="age">
                  Age
                </label>
                <select
                  className="mt-2   p-2 rounded-md w-full bg-whiteM"
                  id="age"
                  name="age"
                  placeholder="Select Age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                >
                  {ages.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:w-1/2 mt-2 lg:mt-0">
                <label className="text-whiteM  font-semibold" htmlFor="sex">
                  Sex:
                </label>
                <select
                  className="mt-2   p-2 rounded-md w-full bg-whiteM"
                  id="sex"
                  name="sex"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2 lg:flex gap-4">
              <div className="lg:w-1/2">
                <label className="text-whiteM font-semibold" htmlFor="height">
                  Height:
                </label>
                <select
                  id="height"
                  name="height"
                  value={height}
                  onChange={handleHeightChange}
                  required
                  className="mt-2   p-2 rounded-md w-full bg-whiteM"
                >
                  {heights.map((height) => (
                    <option key={height} value={height}>
                      {height} cm
                    </option>
                  ))}
                </select>
              </div>
              <div className="lg:w-1/2 mt-2 lg:mt-0">
                <label className="text-whiteM font-semibold" htmlFor="weight">
                  Weight:
                </label>
                <select
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  required
                  className="mt-2   p-2 rounded-md w-full bg-whiteM"
                >
                  {weights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight} kg
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM  font-semibold" htmlFor="dob">
                Date of Birth:
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dateOfBirth}
                onChange={handleDateChange}
                required
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="occupation">
                Occupation:
              </label>
              <select
                id="occupation"
                name="occupation"
                value={occupation}
                onChange={handleOccupationChange}
                required
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
              >
                {occupations.map((occupation) => (
                  <option key={occupation} value={occupation}>
                    {occupation}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="race">
                Race:
              </label>
              <select
                id="race"
                name="race"
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
                required
              >
                <option value="Barua">Barua</option>
                <option value="Bawm">Bawm</option>
                <option value="Bengali">Bengali</option>
                <option value="Bihari">Bihari</option>
                <option value="Chakma">Chakma</option>
                <option value="Garo">Garo</option>
                <option value="Khasi">Khasi</option>
                <option value="Marma">Marma</option>
                <option value="Mro">Mro</option>
                <option value="Rakhine">Rakhine</option>
                <option value="Rohingya">Rohingya</option>
                <option value="Santal">Santal</option>
                <option value="Tripuri">Tripuri</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label
                className="text-whiteM font-semibold"
                htmlFor="presentDivision"
              >
                Present Division:
              </label>
              <select
                id="presentDivision"
                name="presentDivision"
                required
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
              >
                <option value="Barisal">Barisal</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
            <div className="lg:w-1/2">
              <label
                className="text-whiteM font-semibold"
                htmlFor="permanentDivision"
              >
                Permanent Division:
              </label>
              <select
                id="permanentDivision"
                name="permanentDivision"
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
                required
              >
                <option value="Barisal">Barisal</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Khulna">Khulna</option>
                <option value="Mymensingh">Mymensingh</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="fname">
                Father&#39;s Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="fname"
                name="fname"
                required
                placeholder="Enter Father's Name"
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="mname">
                Mother&#39;s Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="mname"
                name="mname"
                required
                placeholder="Enter Mother's Name"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/3">
              <p className="text-whiteM font-semibold">Expected Partner Age:</p>
              <div className="mt-2 flex items-center gap-4">
                <label className="" htmlFor="minAge">
                  From:{" "}
                </label>
                <select
                  id="minAge"
                  name="minAge"
                  className="rounded-md w-5/12"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                >
                  {ages.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>

                <label htmlFor="maxAge">To: </label>
                <select
                  id="maxAge"
                  name="maxAge"
                  value={maxAge}
                  className="rounded-md w-5/12"
                  onChange={(e) => setMaxAge(e.target.value)}
                >
                  {ages.map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:w-1/3">
              <p className="text-whiteM font-semibold">
                Expected Partner Height:
              </p>
              <div className="mt-2 flex items-center gap-4">
                <label className="" htmlFor="minHeight">
                  From:{" "}
                </label>
                <select
                  id="minHeight"
                  name="minHeight"
                  className="rounded-md w-5/12"
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                >
                  {heights.map((height) => (
                    <option key={height} value={height}>
                      {height} cm
                    </option>
                  ))}
                </select>

                <label htmlFor="maxHeight">To: </label>
                <select
                  id="maxHeight"
                  name="maxHeight"
                  value={maxHeight}
                  className="rounded-md w-5/12"
                  onChange={(e) => setMaxHeight(e.target.value)}
                >
                  {heights.map((height) => (
                    <option key={height} value={height}>
                      {height} cm
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="lg:w-1/3">
              <p className="text-whiteM font-semibold">
                Expected Partner Weight:
              </p>
              <div className="mt-2 flex items-center gap-4">
                <label className="" htmlFor="minWeight">
                  From:{" "}
                </label>
                <select
                  id="minWeight"
                  name="minWeight"
                  className="rounded-md w-5/12"
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                >
                  {weights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight} kg
                    </option>
                  ))}
                </select>

                <label htmlFor="maxWeight">To: </label>
                <select
                  id="maxWeight"
                  name="maxWeight"
                  value={maxWeight}
                  className="rounded-md w-5/12"
                  onChange={(e) => setMaxWeight(e.target.value)}
                >
                  {weights.map((weight) => (
                    <option key={weight} value={weight}>
                      {weight} kg
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mx-auto"></div>

          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="mobile">
                Mobile Number:
              </label>
              <input
                className="mt-2  p-2 rounded-md w-full bg-whiteM"
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter Mobile Number"
                required
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="email">
                Contact Email:
              </label>
              <input
                className="mt-2   p-2 rounded-md w-full bg-whiteM"
                type="email"
                id="email"
                name="sellerEmail"
                defaultValue={user.email}
                readOnly
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="font-bold ml-2 mt-6 rounded-md px-4 py-2 bg-green-600 text-white relative overflow-hidden group z-10 hover:text-green duration-1000"
            >
              <span className="absolute bg-white  size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
              <span className="absolute bg-green-400 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
              Add Biodata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBiodata;
