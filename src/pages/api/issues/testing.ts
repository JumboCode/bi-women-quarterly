// Testing the add endpoint for the Issues collection
import Issues from "@/types/Issues";

// export default function TestAddEndpoint() {
//     const test = async () => {
//         // Create an issue to add
//         const issueToAdd = {
//             status: Issues.Current,
//             title: "Your Issue Title",
//         };

//         // Add the issue
//         try {
//             const response = await fetch("http://localhost:3000/api/add", {
//                 method: "POST",
//                 body: JSON.stringify(issueToAdd),
//             });

//             if (response.ok) {
//                 const res = await response.json();

//                 // Check if 'success' property exists in the response
//                 if (res && res.success) {
//                     console.log("Successfully added issue.");
//                     console.log(res.data);
//                 } else {
//                     console.log("Add failed. Response:", res);
//                 }
//             } else {
//                 console.log("Add failed. HTTP status:", response.status);
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//         }
//     };

//     test();
// }

// export default function TestGetEndpoint() {
//     const test = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/api/issues/get", {
//                 method: "GET",
//             });

//             if (response.ok) {
//                 const res = await response.json();

//                 // Check if 'success' property exists in the response
//                 if (res && res.success) {
//                     console.log("Successfully retrieved issues.");
//                     console.log(res.data);
//                 } else {
//                     console.log("Get failed. Response:", res);
//                 }
//             } else {
//                 console.log("Get failed. HTTP status:", response.status);
//             }
//         } catch (error) {
//             console.error("An error occurred:", error);
//         }
//     };

//     test();
// }

export default function TestEditEndpoint() {
    const test = async () => {
        // Create an edited issue
        const editedIssue = {
            updates: {
                title: "Updated Issue Title",
                status: Issues.Next, // New status if needed
            },
        };

        // Edit the issue
        try {
            const response = await fetch("http://localhost:3000/api/issues/edit/", {
                method: "PATCH",
                body: JSON.stringify(editedIssue),
            });

            if (response.ok) {
                const res = await response.json();

                // Check if 'success' property exists in the response
                if (res && res.success) {
                    console.log("Successfully edited issue.");
                    console.log(res.data);
                } else {
                    console.log("Edit failed. Response:", res);
                }
            } else {
                console.log("Edit failed. HTTP status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    test();
}
