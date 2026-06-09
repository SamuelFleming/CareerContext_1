// client/src/features/landing/components/ProductThesisCard.jsx
import { useState } from "react";
import Card from "../../../components/ui/Card";

export default function ProductThesisCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <p className="eyebrow">Product thesis</p>
      <h2>Not merely a cover letter generator.</h2>
      <p>
        CareerContext is a light-weight career evidence system. It helps users structure the
        raw materials useful for entering the job market: such as describing projects, listing responsibilities,
        stashing achievements, skills, stories, and supporting user's specific professional context.
      </p>

      {/* Conditionally render the remaining paragraphs based on state */}
      {isExpanded && (
        <div className="expanded-content">
          <p>
            Built with developers in mind - but applicable to many professions and industries - in 2026, we know that
            everyone uses AI when applying, moreso, that employers utilise AI to evaluate applicants. There's no denying 
            it. CareerContext recognises that the difficulty now is now <i>maintaining applications are truthful, but also contain 
            information that best serves the application</i>. 
          </p>  
          <p>
            This is where the concept of 'career evidence system' targets. It is a service that assists in capturing and 
            organising this 'career context' for the applicant. CareerContext is not just a system, but also a workspace
            that faciliates this concepts with ease of use and AI empowerment. 
          </p>  
          <p>
            No need to search for ideation documentation of that MERN project you did a year ago, or try to describe what
            some of the tasks in your last job involved, and no need to dump this into ChatGPT everytime you want to
            evaluate your fit to a new role, or generate a cover letter.
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="read-more-btn"
        style={{ cursor: "pointer", background: "none", border: "none", padding: 0, color: "blue", textDecoration: "underline" }}
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </Card>
  );
}