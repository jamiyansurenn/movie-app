
import Option, { BaseURL, ConImg } from "@/app/utils/constants";
import formatVoteAverage from "@/app/utils/percent";
import { MovieTypes, Trailer } from "@/app/utils/type";
import formatVoteAverage2 from "@/app/utils/vote";
import { Button } from "@/components/ui/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/ui/dialog";
export default async function page1({
    params: { movieId },
}: {
    params: { movieId: string };
}) {
    const response = await fetch(
        `${BaseURL}/movie/${movieId}?language=en-US`,
        Option
    );
    const data = await response.json();
    const responseStar = await fetch(
        `${BaseURL}/movie/${movieId}/credits?language=en-US`,
        Option
    );
    const dataStar = await responseStar.json();
    const responseTrailer = await fetch(
        `${BaseURL}/movie/${movieId}/videos?language=en-US`,
        Option
    );
    const dataTrailer = await responseTrailer.json();
    const MoreThisLike = await fetch(
        `${BaseURL}/movie/${movieId}/similar?language=en-US&page=1`,
        Option
    );
    const MoreThis = await MoreThisLike.json();
    const trailers = await fetch(
        `${BaseURL}/movie/${movieId}/videos?language=en-US`,
        Option
    );
    const comeTrailer = await trailers.json();
    formatVoteAverage;
    formatVoteAverage2;
    return (
        <div className="w-[1080px] z-10">
            <div className="mt-8">
                <div className="flex justify-between p-1 mr-6">
                    <div>
                        <h1 className="text-[36px] normal font-bold">
                            {data.original_title}
                        </h1>
                        <div className="flex gap-2 text-[18px] normal font-normal">
                            <h2>{data.release_date}</h2>
                            <p> · </p>
                            <p>{data.adult ? "R" : "PG"}</p>
                            <p> · </p>
                            <p>{formatVoteAverage(data.runtime)}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-[20px] normal font-medium ">Rating</p>
                        <div className="flex itms-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 28 28"
                                fill="none"
                            >
                                <path
                                    d="M13.9997 2.33325L17.6047 9.63659L25.6663 10.8149L19.833 16.4966L21.2097 24.5233L13.9997 20.7316L6.78967 24.5233L8.16634 16.4966L2.33301 10.8149L10.3947 9.63659L13.9997 2.33325Z"
                                    fill="#FDE047"
                                    stroke="#FDE047"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p>
                                {formatVoteAverage2(data.vote_average)}
                                <span className="text-[#71717a] text-[13px]">/10</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Image
                        src={`${ConImg}w500` + data.poster_path}
                        width={280}
                        height={400}
                        alt=""
                    />
                    <div className="w-[760px] h-[428px] bg-cover bg-center bg-no-repeat rounded-sm relative ">
                        <div className="absolute inset-0 "></div>
                        <div
                            className="absolute inset-0 bg-black opacity-55 top-[0px] left-[0px] z-10"
                            style={{
                                backgroundImage: `url(${ConImg}original${data?.poster_path})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="relative top-[20px] left-[20px]">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="cursor-pointer">
                                            <Button
                                                className="absolute top-[330px] left-[5px] rounded-full w-14 h-14 z-20"
                                                variant="outline"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <polygon points="6 3 20 12 6 21 6 3" />
                                                </svg>
                                            </Button>
                                            <p className="top-[340px] absolute left-[75px] text-white font-semibold text-[21px]">
                                                Play Trailer
                                            </p>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[997px] max-h-[563px]">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${comeTrailer.results[0]?.key}`}
                                            width={997}
                                            height={561}
                                            className="overflow-hidden rounded-[5px] mb-[10px]"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                        <DialogTitle hidden></DialogTitle>
                                    </DialogContent>
                                </Dialog>
                                <p>{dataTrailer.name}</p>
                                {dataTrailer.results?.map((trailer: Trailer, index: string) => {
                                    return <div key={index}>{/* <p>{trailer.size}</p> */}</div>;
                                })}
                                <p>{dataTrailer?.site}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    {data.genres?.map((genres: MovieTypes, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex items-start justify-center pl-3 pr-3 h-[20px] border-[1px] mt-4 mb-4 rounded-full"
                            >
                                <p className="text-[12px]">{genres.name}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-8">
                    <p>{data.overview}</p>
                </div>
                <div className="flex flex-col gap-6 mt-10">
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-24">
                            <p className="text-[16px] font-bold normal "> DIRECTOR</p>
                            {dataStar.crew
                                ?.filter((crew: MovieTypes) => crew.department == "Directing")
                                .slice(0, 1)
                                .map((crew: MovieTypes, id: number) => {
                                    return <div key={id}>{crew.name}</div>;
                                })}
                        </div>
                        <div className="w-full h-[1px] bg-gray-700"></div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-[104px]">
                            <p className="text-[16px] font-bold normal "> WRITERS</p>
                            {dataStar.crew
                                ?.filter((crew: MovieTypes) => crew.department == "Directing")
                                .slice(0, 2)
                                .map((crew: MovieTypes, id: number) => {
                                    return <div key={id}>{crew.name}</div>;
                                })}
                        </div>
                        <div className="w-full h-[1px] bg-gray-700"></div>
                    </div>
                    <div className="flex  gap-[124px]">
                        <p className="text-[16px] font-bold normal "> STARS</p>
                        <div className="flex gap-3">
                            {dataStar.cast
                                ?.slice(0, 5)
                                .map((actor: MovieTypes, index: number) => {
                                    return (
                                        <div key={index} className="flex gap-3">
                                            <p>{actor.name}</p>
                                            <span> · </span>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-700"></div>
                </div>
                <div>
                    <div className="w-full h-[36px] mt-5 mb-5 flex justify-between items-center">
                        <p className=" cursor-pointer text-[24px]">More Like This</p>
                        <button className="flex items-center justify-center gap-2">
                            <Link href={`SeeMore/morelikethis/${movieId}`}>See more</Link>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex gap-4 w-full">
                    {MoreThis.results
                        ?.slice(0, 5)
                        .map((movie: MovieTypes, index: number) => {
                            return (
                                <Link key={index} href={`${movie.id}`}>
                                    <div className="rounded-[8px] overflow-hidden w-[205px] h-[410px] flex flex-col items-start cursor-pointer">
                                        <Image
                                            src={`${ConImg}original/${movie?.poster_path}`}
                                            alt={`Poster of ${movie?.original_title}`}
                                            width={500}
                                            height={750}
                                        />
                                        <div className="bg-secondary flex p-2 flex-col items-start self-stretch h-full">
                                            <div className="flex items-center gap-[2px]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M7.99992 1.33325L10.0599 5.50659L14.6666 6.17992L11.3333 9.42659L12.1199 14.0133L7.99992 11.8466L3.87992 14.0133L4.66658 9.42659L1.33325 6.17992L5.93992 5.50659L7.99992 1.33325Z"
                                                        fill="yellow"
                                                        stroke="yellow"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p>
                                                    {movie?.vote_average.toFixed(1)}
                                                    <span className="text-[#71717a] text-[12px]">
                                                        /10
                                                    </span>
                                                </p>
                                            </div>
                                            <p>{movie?.original_title}</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
