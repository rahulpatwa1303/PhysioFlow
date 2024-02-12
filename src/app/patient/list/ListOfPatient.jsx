import clientPromise from "@/utils/mongodb";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const client = await clientPromise;
const db = client.db("visit_tasker");

export async function List() {
  const allPosts = await db.collection("patient").find({}).toArray();
  return allPosts;
}

export async function ListOfPatient() {
  let allPatients = await List();

  return (
    <>
      {allPatients.map((patient, index) => (
        <Link
          href={`${patient._id.toHexString()}`}
          key={`${patient.backgroundColor}-${index}`}
        >
          <div className="flex items-center justify-between gap-4 bg-white px-4 py-4 rounded-lg shadow-lg cursor-pointer mb-4">
            <div
              className="flex flex-row items-center gap-4"
            >
              <div
                className="uppercase rounded-full p-4 h-full w-14 flex justify-center items-center font-extrabold "
                style={{
                  background: patient.backgroundColor,
                  color: patient.textColor,
                }}
              >
                {patient.name[0]}
              </div>
              <div>
                <p className="text-xl font-bold">{patient.name}</p>
                <div className="text-xs font-semibold text-gray-500 flex flex-row gap-2">
                  <p className="text-gray-600">Contact number - </p>
                  <p>{patient.phone_number}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <ChevronRight color="#9ca3af" />
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
