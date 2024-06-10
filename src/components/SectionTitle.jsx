const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className=" mx-auto text-center mt-4 mb-6 md:mt-16 md:mb-12 md:w-6/12">
      <h3 className="text-4xl font-bold text-redM py-4">{heading}</h3>
      <p className="text-whiteM">{subHeading}</p>
    </div>
  );
};

export default SectionTitle;
