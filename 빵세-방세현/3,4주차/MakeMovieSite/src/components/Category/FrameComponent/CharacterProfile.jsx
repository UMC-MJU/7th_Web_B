import React from "react";
import styled from "styled-components";

const CharacterProfile = ({ creditData }) => {
  return (
    <>
      {creditData?.map((creditInfor) => (
        <CreditCard key={creditInfor.id}>
          <CreditImg
            src={`https://image.tmdb.org/t/p/w200${creditInfor.profile_path}`}
            alt={`${creditInfor.original_name}'s profile`}
          />
          <ActorName>{creditInfor.original_name}</ActorName>
          <InMovieName>{creditInfor.character}</InMovieName>
        </CreditCard>
      ))}
    </>
  );
};

export default CharacterProfile;

const CreditCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 250px;
  border: 1px solid black;
  margin-right: 30px;
  margin-bottom: 20px;
`;

const CreditImg = styled.img`
  width: 200px;
  height: 150px;
  border: 1px solid white;
  border-radius: 40%;
  object-fit: cover; // 잘릴 때 이미지 비율 유지
`;

const ActorName = styled.div`
  color: white;
  font-size: 20px;
`;

const InMovieName = styled.div`
  color: white;
  font-size: 15px;
`;
