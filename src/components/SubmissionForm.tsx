// Authors: Alana Sendlakowski and Vanessa Rose

import { useState } from 'react';

export default function SubmissionForm() {
    // States for form input 
    const [title, setTitle] = useState("");
    const [issue, setIssue] = useState("");
    const [type, setType] = useState("");

    // Printing the results of the form to the console log
    const handleSubmit = (event : any) => {
        event.preventDefault();
        console.log('title: ' + title);
        console.log("issue: " + issue);
        console.log("type: " + type);
    }

    // Handles change of issue drop down element
    const handleIssueChange = (event : any) => {
        setIssue(event.target.value)
    }

    // Handles change of type drop down element
    const handleTypeChange = (event : any) => {
        setType(event.target.value)
    }

    return (
      // Creates a form to retrieve title, issue, and name information
        <form onSubmit={handleSubmit}>
            <label>Title: 
                {/* text input element for title */}
                <input
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>

            {/* drop down element for issue selection */}
            <select value={issue} onChange={handleIssueChange}>
                <option value="Issue1">Issue 1</option>
                <option value="Issue2">Issue 2</option>
                <option value="Issue3">Issue 3</option>
            </select>

            {/* drop down element for type selection */}
            <select value={type} onChange={handleTypeChange}>
                <option value="Nonfiction">Nonfiction</option>
                <option value="Fiction">Fiction</option>
                <option value="Poetry">Poetry</option>
                <option value="Visual">Visual Art</option>
                <option value="other">Other</option>
            </select>

            {/* submission button */}
            <input type="submit" />
        </form>
    )
}