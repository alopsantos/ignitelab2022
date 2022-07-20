import { Lesson } from "./Lesson";
import { gql, useQuery } from "@apollo/client";

const GET_LESSONS_QUERE = gql`
  query {
    lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
      id
      title
      lessonType
      availableAt
      slug
    }
  }
`;

interface IGetLessonsQueryResponse {
  lessons: {
    id: string;
    title: string;
    lessonTyp: "live" | "class";
    slug: string;
    availableAt: string;
  }[];
}
export function Sidebar() {
  const { data } = useQuery<IGetLessonsQueryResponse>(GET_LESSONS_QUERE);

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map((lesson) => {
          return (
            <Lesson
              key={lesson.id}
              title={lesson.title}
              slug={lesson.slug}
              availableAt={new Date(lesson.availableAt)}
              type={lesson.lessonTyp}
            />
          );
        })}
      </div>
    </aside>
  );
}
