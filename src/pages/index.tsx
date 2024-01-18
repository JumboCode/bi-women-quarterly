// import HomePage from "@/components/HomePage";

// export default function Home() {
//     return (
//         <div>
//             <HomePage></HomePage>
//         </div>
//     );
// }

import Issues from "@/types/Issues";

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
