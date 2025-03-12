"use client";
import axios from "axios";
import ACCESS_TOKEN from "@/constants/index";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const getMovies = async () => {
    const movies = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    setMovieList(movies.data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <Carousel>
        <CarouselContent>
        {movieList.slice(0, 3).map((movie: Movie, index) => (
        <CarouselItem key={index} className="max-w-[calc(100%-96px)] h-screen">
          <h2>{movie.title}</h2>
          <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        </CarouselItem>
      ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}