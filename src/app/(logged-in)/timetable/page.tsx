import { getSession } from "@/actions/auth-actions";
import { getTimetable } from "@/actions/timetable-actions";
import { columns } from "@/components/timetable/columns";
import { DataTable } from "@/components/timetable/data-table";
import NoTimetablePage from "@/components/timetable/no-timetable-page";
import TimetableActions from "@/components/timetable/timetable-actions";
import { TimetableHeaderAnimation } from "@/components/ui/typewriter-effect";

export default async function TimetablePage() {
  const session = await getSession();
  if (!session) return;

  const timetable = await getTimetable();

  if (timetable.length == 0) {
    return <NoTimetablePage></NoTimetablePage>;
  }

  // TODO: Mobile page alternative
  return (
    <div className="mt-6 flex h-full w-full flex-col items-center">
      <TimetableHeaderAnimation />
      <div className="flex w-full flex-col items-center justify-center gap-4 px-1 md:w-5/6">
        <TimetableActions isAdmin={session.user.isAdmin} />
        <DataTable columns={columns} data={timetable} />
      </div>
    </div>
  );
}
