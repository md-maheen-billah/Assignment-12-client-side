const MemberCard = ({ member }) => {
  return (
    <div>
      <img className="w-20" src={member.image} alt="" />
      <h2>{member.sex}</h2>
      <h2>{member.biodataId}</h2>
      <h2>{member.permanentDivision}</h2>
      <h2>{member.age}</h2>
      <h2>{member.occupation}</h2>
    </div>
  );
};

export default MemberCard;
