import {
    EnrollmentStatus,
    computeAverage
} from "./gradeUtils"

import getStatus from "./gradeUtils"

interface Enrollee {
    name: string;
    prelim: number;
    midterm: number;
    final: number;
}

interface EligibilityReport {
    name: string;
    average: number;
    status: EnrollmentStatus;
    remarks?: string;
}

const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 }
];

let batchId: string | number = "IT313-001";

if (typeof batchId === "string") {
    console.log(`Batch ID: $(batchId)`);
} else {
    console.log(`Batch ID: $(batchId)`);
}

function getEnrollees(): Promise<Enrollee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(enrollees);
        }, 500);
    });
}

function groupBy<T>(
    items: T[],
    keyFn: (item: T) => string
): Record<string, T[]> {
    return items.reduce((groups, item) => {
        const key = keyFn(item);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(item);

        return groups;
    }, {} as Record<string, T[]>);
} 

async function main(): Promise<void> {
    try {
        const students = await getEnrollees();

        const reports: EligibilityReport[] = students.map((student) => {
            const average = computeAverage(
                student.prelim,
                student.midterm,
                student.final
            );

            const status = getStatus(average);

            return{
                name: student.name,
                average,
                status,
                ...(status === EnrollmentStatus.Probation
                    ? { remarks: "Needs Consulation" }
                    : {})
            };
        });

        const classAverage =
            reports.reduce((sum, report) => sum + report.average, 0) /
            reports.length;
        
        const groupedReports = groupBy(
            reports,
            (report) => EnrollmentStatus[report.status] 
        );

        console.log("=== IT313 Enrollment Eligibility Report (Typescript) ===");

        reports.forEach((report) => {
            const statusText = EnrollmentStatus[report.status];

            const remarks = report.remarks
                ? ` - ${report.remarks}`
                : "";

            
            console.log(
                `${report.name} - Average: ${report.average.toFixed(2)} -${statusText.toUpperCase()}${remarks}` 
            );
        });

        console.log(`Class Average: ${classAverage.toFixed(2)}`);
        console.log(
            `Passing: ${groupedReports[EnrollmentStatus[EnrollmentStatus.Passing]]?.length ?? 0} / ${reports.length}`
        );
    } catch (error) {
        console.error("Failed to retrieve Enrollee data:", error);
    }
}

main();