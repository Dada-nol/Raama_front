import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Delete from "./Delete";
import Update from "./Update";
import SharedLink from "./SharedLink";

function SouvenirSetting() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <h2 className="text-xl font-bold">Create shared link</h2>
          <div className="flex flex-col items-center justify-between border border-primary p-4 my-4">
            <SharedLink />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">Update Souvenir infos</h2>
          <div className="flex flex-col items-center justify-between border border-primary p-4 my-4">
            <Update />
          </div>
        </section>
      </div>

      <section className="flex flex-row items-center justify-between border border-danger p-4 my-4">
        <div className="flex justify-center items-center">
          <ExclamationTriangleIcon className="h-10 w-10 text-red-600 pr-2" />
          <p>This action is irreversible !</p>
        </div>
        <Delete></Delete>
      </section>
    </>
  );
}

export default SouvenirSetting;
