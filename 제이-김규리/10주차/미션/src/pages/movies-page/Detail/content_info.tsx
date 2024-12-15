import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import PersonInfo from "../person-info";
import useGetDetail from "../../../hooks/queries/useGetDetail";

interface Person {
  id: number;
  [key: string]: any;
}

interface Credits {
  cast: Person[];
  crew: Person[];
}

interface Movie {
  [key: string]: any;
}

interface DetailResponse {
  movie: Movie;
  credits: Credits;
}

const ContentPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const { data, isLoading, isError } = useQuery<DetailResponse, Error>({
    queryFn: () => useGetDetail({ movieId }),
    queryKey: ["movieDetail", movieId],
  });

  if (isLoading) {
    return (
      <div>
        <h1 style={{ color: "white" }}>로딩 중 입니다..</h1>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 style={{ color: "white" }}>에러 발생</h1>
      </div>
    );
  }

  const { movie, credits } = data!;
  const { cast, crew: director } = credits;

  return (
    <div>
      <p
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "20px",
          marginLeft: "13px",
          marginBottom: "10px",
        }}
      >
        감독/출연
      </p>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {cast.map((actor: Person) => (
          <PersonInfo key={`actor-${actor.id}`} person={actor} />
        ))}
      </div>
      <div style={{ height: "100px" }}></div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {director.map((person: Person) => (
          <PersonInfo key={`director-${person.id}`} person={person} />
        ))}
      </div>
    </div>
  );
};

export default ContentPage;
