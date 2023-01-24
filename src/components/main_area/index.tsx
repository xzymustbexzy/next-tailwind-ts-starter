import {useActivePageContext} from "@/context/active_page";
import {OnlineStreamPanel} from "@/components/online_stream";
import {DataStoragePanel} from "@/components/data_storage";
import {ModelsPanel} from "@/components/models";
import {DocumentsPanel} from "@/components/documents";

export const MainArea = () => {
  const { page, setPage } = useActivePageContext();
  return (
    <div className="w-full flex-1 overflow-y-hidden">
      {
        page === "online_stream" &&
        <OnlineStreamPanel></OnlineStreamPanel>
      }
      {
        page === "data_storage" &&
        <DataStoragePanel></DataStoragePanel>
      }
      {
        page === "models" &&
        <ModelsPanel></ModelsPanel>
      }
      {
        page === "documents" &&
        <DocumentsPanel></DocumentsPanel>
      }
    </div>
  )
}
