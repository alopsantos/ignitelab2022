import { DefaultUi, Player, Youtube } from "@vime/react";
import { gql, useQuery } from "@apollo/client";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightbulb,
} from "phosphor-react";
import "@vime/core/themes/default.css";

const GET_LESSON_BY_SLUG_QUERY = gql`
  query GetLessonBySlug($slug: String) {
    lesson(where: { slug: $slug }) {
      title
      videoId
      description
      teacher {
        bio
        avatarURL
        name
      }
    }
  }
`;
interface IGetLessonBySlugResponse {
  lesson: {
    title: string;
    videoId: string;
    description: string;
    teacher: {
      bio: string;
      avatarURL: string;
      name: string;
    };
  };
}
interface IVideoProps {
  lessonSlug: string;
}
export function Video(props: IVideoProps) {
  const { data } = useQuery<IGetLessonBySlugResponse>(
    GET_LESSON_BY_SLUG_QUERY,
    {
      variables: {
        slug: props.lessonSlug,
      },
    }
  );

  if (!data || !data.lesson) {
    return (
      <div className="flex-1">
        <p>Carregando ...</p>
      </div>
    );
  }
  return (
    <div className="flex-1 ">
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player autoplay>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-xl font-bold">{data?.lesson.title}</h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {data?.lesson.description}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <img
                src={data?.lesson.teacher.avatarURL}
                alt=""
                className="h-14 w-14 rounded-full border-2 border-blue-500"
              />

              <div className="leading-relaxed">
                <strong className="font-bold text-2xl block">
                  {data?.lesson.teacher.name}
                </strong>
                <span className="text-gray-200 text-sm block">
                  {data?.lesson.teacher.bio}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="#"
              className="p-4 text-sm bg-green-500 flex items-center rounded  gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a
              href="#"
              className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded  gap-2 justify-center hover:bg-blue-900 transition-colors"
            >
              <Lightbulb size={24} />
              Acesse o desafio
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-400 transition-colors"
          >
            <div className="bg-green-700 h-full p-4 flex items-center">
              <FileArrowDown size={48} />
            </div>
            <div className="py-4 leading-relaxed">
              <strong className="text-xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                voluptates illo debitis! Soluta quaerat corrupti
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>

          <a
            href=""
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-400 transition-colors"
          >
            <div className="bg-green-700 h-full p-4 flex items-center">
              <FileArrowDown size={48} />
            </div>
            <div className="py-4 leading-relaxed">
              <strong className="text-xl">Wallpappers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                voluptates illo debitis! Soluta quaerat corrupti
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}