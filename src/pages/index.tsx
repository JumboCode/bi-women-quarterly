// default "nothing" home page
// export default function Home() {
//     return (
//         <div>
//             Hello
//         </div>
//     )
// }

// submission edit testing
import Submission from "@/types/Submission";

export default function Home() {
    const test = async () => {
        const randomNumber = Math.random();

        // Create an initial document to add
        const original: Submission = {
            id: "fooAuthor|barTitle|" + randomNumber,
            author: "fooAuthor",
            title: "barTitle",
            issue: "quxIssue",
            date: "bazDate",
            image: "corgeImage",
            wordDoc: "graultDoc",
        }

        // Add it
        await fetch("http://localhost:3000/api/submissions/add", {
            method: "POST",
            body: JSON.stringify(original),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log("Successfully added submission.");
                    console.log(res.data);
                } else {
                    console.log("Add failed.")
                }
            });

        // Create an edited version
        const edit: Submission = {
            id: "fooAuthor|barTitle|" + randomNumber,
            author: "EDITED!",
            title: "barTitle",
            issue: "quxIssue",
            date: "bazDate",
            image: "corgeImage",
            wordDoc: "graultDoc",
        }

        await fetch('http://localhost:3000/api/submissions/edit', {
            method: 'PATCH',
            body: JSON.stringify(edit),
        })
            // convert promise to JSON
            .then(res => res.json())
            // print out results
            .then(res => {
                if (res.success) {
                    console.log("Successfully edited submission.");
                    console.log(res.data);
                } else {
                    console.log("Edit failed");
                }
            });
    };

    test();
}