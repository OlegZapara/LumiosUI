import { CardBody } from "@/components/ui/3d-card";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import CreateQueuePopover from "../../../components/queues/create-popover";
import { getSession } from "@/actions/auth-actions";
import { getQueues } from "@/actions/queues-actions";
import Filter from "@/components/general/filter";
import QueuesList from "@/components/queues/queues-list";

export default async function Queues() {
  const session = await getSession();

  if (!session) return;

  const queues = await getQueues();

  return (
    <div className="mt-6 md:container">
      <Card className="h-auto w-full shadow-md lg:shadow-lg">
        <CardHeader>
          <CardTitle>
            <div className="flex w-full flex-col justify-between gap-6 md:flex-row">
              <span className="ml-2 mt-3">List of group queues</span>
              <div className="flex flex-row flex-wrap gap-4 md:flex-nowrap">
                <CreateQueuePopover></CreateQueuePopover>
                <Filter placeholder="Search for queues" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardBody className="grid h-auto w-full grid-cols-6 justify-center gap-6 rounded-lg p-4 md:p-8">
          <QueuesList queues={queues} isAdmin={session.user.isAdmin} />
        </CardBody>
      </Card>
    </div>
  );
}
