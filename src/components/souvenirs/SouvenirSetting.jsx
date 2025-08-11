import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Delete from "./Delete";
import SharedLink from "./SharedLink";
import Update from "./Update";

function SouvenirSetting() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create shared link */}
        <section className="bg-secondary rounded-xl shadow-md p-6 border border-primary">
          <h2 className="text-xl font-semibold mb-4 text-text">
            Create shared link
          </h2>
          <div className="flex flex-col items-center gap-4">
            <SharedLink />
          </div>
        </section>

        {/* Update souvenir */}
        <section className="bg-secondary rounded-xl shadow-md p-6 border border-primary">
          <h2 className="text-xl font-semibold mb-4 text-text">
            Update Souvenir infos
          </h2>
          <div className="flex flex-col items-center gap-4">
            <Update />
          </div>
        </section>
      </div>

      {/* Danger zone */}
      <section className="mt-6 bg-secondary rounded-xl shadow-md border border-red-500 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center text-red-500">
          <ExclamationTriangleIcon className="h-10 w-10 mr-2" />
          <p className="font-medium">This action is irreversible!</p>
        </div>
        <Delete />
      </section>
    </>
  );
}

export default SouvenirSetting;
