import FutsalDetail from "@/components/project/futsal/FutsalDetail";
import { futsalService } from "@/domain/services/futsalService";
import { timeSlotService } from "@/domain/services/timeSlotService";


export default async function page() {
  return (
    <FutsalDetail/>
  )
}