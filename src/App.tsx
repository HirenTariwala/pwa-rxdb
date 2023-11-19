import { useEffect, useState } from "react";
import { RxDatabase, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { taskSchema } from "./App";
import { addRxPlugin } from "rxdb";
import Home from "./components/pages/Home";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

/**
 * Enable this only while development mode , for getting the errors
 */
// import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
// addRxPlugin(RxDBDevModePlugin);

addRxPlugin(RxDBUpdatePlugin);

const App = () => {
  const [db, setDb] = useState<RxDatabase | null>(null);

  useEffect(() => {
    if (!db) {
      const initDatabase = async () => {
        const database = await createRxDatabase({
          name: "taskdb",
          storage: getRxStorageDexie(),
          ignoreDuplicate: true,
        });
        await database.addCollections({
          tasks: { schema: taskSchema },
        });
        setDb(database);
      };
      initDatabase();
    }
  }, [db]);

  return (
    <>
      <Home db={db} />
    </>
  );
};

export default App;
