import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { MdPhotoCamera } from "react-icons/md";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utils";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import "../../../../assets/styleb.css";
import { Helmet } from "react-helmet-async";
import Aos from "aos";

const EditBiodata = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: biodata = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/biodata/${user?.email}`);
      return data;
    },
  });

  const { mutateAsync: mutateBdata } = useMutation({
    mutationFn: async (bdata) => {
      const { data } = await axiosSecure.put("/biodata", bdata);
      return data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Biodata Updated Successfully!");
    },
  });

  const { mutateAsync: mutateUserData } = useMutation({
    mutationFn: async (udata) => {
      const { data } = await axiosSecure.put(
        `/users-update/${user?.email}`,
        udata
      );
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  const [age, setAge] = useState(18);
  const [sex, setSex] = useState("");
  const [permanentDivision, setPermanentDivision] = useState("");
  const [presentDivision, setPresentDivision] = useState("");
  const [race, setRace] = useState("");
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

  const ages = Array.from({ length: 53 }, (_, i) => i + 18);

  const sexs = ["Male", "Female"];

  const races = [
    "Bengali",
    "Rohingya",
    "Chakma",
    "Bihari",
    "Marma",
    "Garo",
    "Santal",
    "Khasi",
    "Tripuri",
    "Mro",
    "Rakhine",
    "Barua",
    "Bawm",
  ];

  const divisions = [
    "Barisal",
    "Chattogram",
    "Dhaka",
    "Khulna",
    "Mymensingh",
    "Rajshahi",
    "Rangpur",
    "Sylhet",
  ];

  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleDateChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const [imagePreview, setImagePreview] = useState("");
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
  useEffect(() => {
    if (biodata.email) {
      const [min, max] = biodata.expectedPartnerAge.split("-").map(Number);
      const [min1, max1] = biodata.expectedPartnerHeight.split("-").map(Number);
      const [min2, max2] = biodata.expectedPartnerWeight.split("-").map(Number);
      setMinAge(min);
      setMaxAge(max);
      setMinHeight(min1);
      setMaxHeight(max1);
      setMinWeight(min2);
      setMaxWeight(max2);
      setAge(biodata.age);
      setHeight(biodata.height);
      setWeight(biodata.weight);
      setDateOfBirth(biodata.dateOfBirth);
      setOccupation(biodata.occupation);
      setSex(biodata.sex);
      setRace(biodata.race);
      setPermanentDivision(biodata.permanentDivision);
      setPresentDivision(biodata.presentDivision);
      setImagePreview(biodata.image);
    }
  }, [biodata]);

  useEffect(() => {
    if (!biodata?.image) {
      setImagePreview(`${user?.photoURL}`);
    }
  }, [biodata, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const race = form.race.value;
    const name = form.name.value;
    const sex = form.sex.value;
    const fname = form.fname.value;
    const mname = form.mname.value;
    const permanentDivision = form.permanentDivision.value;
    const presentDivision = form.presentDivision.value;
    const mobile = form.mobile.value;
    const email = user?.email;
    const imagesel = form.image.files[0];
    const imageu = biodata?.image ? `${biodata.image}` : `${user.photoURL}`;

    try {
      const imageaa = imagesel ? await imageUpload(imagesel) : imageu;
      await updateUserProfile(name, imageaa);
      const bdata = {
        name,
        age: parseFloat(age),
        sex,
        height: parseFloat(height),
        weight: parseFloat(weight),
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
        fname,
        mname,
        image: imageaa,
      };
      console.table(bdata);
      const udata = {
        name,
      };

      //   Post request to server
      await mutateUserData(udata);
      await mutateBdata(bdata);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);
  if (isLoading) return <LoadingSpinner />;
  return (
    <div data-aos="fade-out">
      <Helmet>
        <title>Dashboard | Edit Biodata</title>
      </Helmet>
      <div>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg,  rgba(0,0,0,0.1), rgba(0,0,0,1)), linear-gradient(360deg,  rgba(0,0,0,0.1), rgba(0,0,0,0.3)),  url('https://i.ibb.co/TvjSfjk/Untitled-design-4.jpg')`,
            backgroundPosition: "50% 25%",
          }}
          className="h-36 "
        >
          <div className="flex justify-center items-center h-full">
            <h2 className="text-whiteM text-3xl font-bold">Edit Biodata</h2>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" mt-6 mb-10 lg:mb-20 max-w-[1280px] mx-auto px-2 lg:px-10"
      >
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <div className="flex justify-center relative">
              <img
                className="mt-4 rounded-full w-[120px] h-[120px] border-4 border-reddM transition hover:scale-105"
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
                className="mt-2 p-2 rounded-md border w-full text-whiteM  focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddMxt-white  focus:shadow-outline bg-reddM"
                type="text"
                id="name"
                name="name"
                defaultValue={
                  biodata?.name !== undefined && biodata?.name !== ""
                    ? biodata.name
                    : user?.displayName
                }
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
                  className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddMeM  focus:shadow-outline bg-reddM"
                  id="age"
                  name="age"
                  value={age}
                  placeholder="Select Age"
                  onChange={(e) => setAge(e.target.value)}
                  required
                >
                  {ages.map((age) => (
                    <option
                      className="text-blackM custom-option"
                      key={age}
                      value={age}
                    >
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
                  className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                  id="sex"
                  name="sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  required
                >
                  {sexs.map((sex) => (
                    <option
                      className="text-blackM custom-option"
                      key={sex}
                      value={sex}
                    >
                      {sex}
                    </option>
                  ))}
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
                  className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                >
                  {heights.map((height) => (
                    <option
                      className="text-blackM custom-option"
                      key={height}
                      value={height}
                    >
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
                  className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                >
                  {weights.map((weight) => (
                    <option
                      className="text-blackM custom-option"
                      key={weight}
                      value={weight}
                    >
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
                defaultValue={biodata.dateOfBirth}
                onChange={handleDateChange}
                required
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
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
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
              >
                {occupations.map((occupation) => (
                  <option
                    className="text-blackM custom-option"
                    key={occupation}
                    value={occupation}
                  >
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
                value={race}
                onChange={(e) => setRace(e.target.value)}
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                required
              >
                {races.map((item) => (
                  <option
                    className="text-blackM custom-option"
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
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
                value={presentDivision}
                onChange={(e) => setPresentDivision(e.target.value)}
                required
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
              >
                {divisions.map((item) => (
                  <option
                    className="text-blackM custom-option"
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
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
                value={permanentDivision}
                onChange={(e) => setPermanentDivision(e.target.value)}
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                required
              >
                {divisions.map((item) => (
                  <option
                    className="text-blackM custom-option"
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="fname">
                Father&#39;s Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                type="text"
                id="fname"
                name="fname"
                defaultValue={biodata.fname}
                required
                placeholder="Enter Father's Name"
              />
            </div>
            <div className="lg:w-1/2">
              <label className="text-whiteM font-semibold" htmlFor="mname">
                Mother&#39;s Name:
              </label>
              <input
                className="mt-2 p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                type="text"
                id="mname"
                name="mname"
                defaultValue={biodata.mname}
                required
                placeholder="Enter Mother's Name"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-3">
            <div className="lg:w-1/3">
              <p className="text-whiteM font-semibold">Expected Partner Age:</p>
              <div className="mt-2 flex items-center gap-4">
                <label className="text-whiteM" htmlFor="minAge">
                  From:{" "}
                </label>
                <select
                  id="minAge"
                  name="minAge"
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                >
                  {ages.map((age) => (
                    <option
                      className="text-blackM custom-option"
                      key={age}
                      value={age}
                    >
                      {age}
                    </option>
                  ))}
                </select>

                <label className="text-whiteM" htmlFor="maxAge">
                  To:{" "}
                </label>
                <select
                  id="maxAge"
                  name="maxAge"
                  value={maxAge}
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  onChange={(e) => setMaxAge(e.target.value)}
                >
                  {ages.map((age) => (
                    <option
                      className="text-blackM custom-option"
                      key={age}
                      value={age}
                    >
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
                <label className="text-whiteM" htmlFor="minHeight">
                  From:{" "}
                </label>
                <select
                  id="minHeight"
                  name="minHeight"
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  value={minHeight}
                  onChange={(e) => setMinHeight(e.target.value)}
                >
                  {heights.map((height) => (
                    <option
                      className="text-blackM custom-option"
                      key={height}
                      value={height}
                    >
                      {height} cm
                    </option>
                  ))}
                </select>

                <label className="text-whiteM" htmlFor="maxHeight">
                  To:{" "}
                </label>
                <select
                  id="maxHeight"
                  name="maxHeight"
                  value={maxHeight}
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  onChange={(e) => setMaxHeight(e.target.value)}
                >
                  {heights.map((height) => (
                    <option
                      className="text-blackM custom-option"
                      key={height}
                      value={height}
                    >
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
                <label className="text-whiteM" htmlFor="minWeight">
                  From:{" "}
                </label>
                <select
                  id="minWeight"
                  name="minWeight"
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  value={minWeight}
                  onChange={(e) => setMinWeight(e.target.value)}
                >
                  {weights.map((weight) => (
                    <option
                      className="text-blackM custom-option"
                      key={weight}
                      value={weight}
                    >
                      {weight} kg
                    </option>
                  ))}
                </select>

                <label className="text-whiteM" htmlFor="maxWeight">
                  To:{" "}
                </label>
                <select
                  id="maxWeight"
                  name="maxWeight"
                  value={maxWeight}
                  className="rounded-md w-5/12 border border-reddM text-whiteM focus:ring-redM selection:bg-black focus:border-redM focus:shadow-outline bg-reddM"
                  onChange={(e) => setMaxWeight(e.target.value)}
                >
                  {weights.map((weight) => (
                    <option
                      className="text-blackM custom-option"
                      key={weight}
                      value={weight}
                    >
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
                className="mt-2  p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
                type="text"
                id="mobile"
                defaultValue={biodata.mobile}
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
                className="mt-2   p-2 rounded-md border w-full text-whiteM focus:ring-redM selection:bg-black border-reddM focus:border-redM focus:shadow-outline bg-reddM"
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
              className="group mt-8 relative z-10 px-6 py-3 overflow-hidden bg-reddM text-base text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-14 scale-x-0 transform bg-redM transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-blackM opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Submit
              </span>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBiodata;
