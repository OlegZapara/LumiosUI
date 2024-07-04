import { TimetableHeaderAnimation } from "@/components/ui/typewriter-effect";
import NoTimetablePage from "@/components/timetable/no-timetable-page";
import { getSession } from "@/actions/auth-actions";
import { getTimetable } from "@/actions/timetable-actions";
import TimetableActions from "@/components/timetable/timetable-actions";
import { DataTable } from "@/components/timetable/data-table";
import { columns } from "@/components/timetable/columns";

export default async function TimetablePage() {
  const session = await getSession();
  const timetable = await getTimetable();

  if (timetable.length == 0) {
    return <NoTimetablePage></NoTimetablePage>;
  }

  // TODO: Mobile page alternative
  return (
    <div className="mt-6 flex h-full w-full flex-col items-center">
      <TimetableHeaderAnimation />
      <div className="flex w-full flex-col items-center justify-center gap-4 px-1 md:w-5/6">
        <TimetableActions isAdmin={session!.user.isAdmin} />
        <DataTable columns={columns} data={timetable} />
      </div>
    </div>
  );
}
