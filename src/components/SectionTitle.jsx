const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className=" mx-auto text-center mt-16 mb-10">
      <h3 className="text-4xl font-bold text-redM py-4">{heading}</h3>
      <p className="text-whiteM">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
