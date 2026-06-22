import Input from "../../../components/ui/Input";
import TermChipInput from "../../../components/ui/TermChipInput";
import MarkdownEditor from "../../../components/editor/MarkdownEditor";
import { TERM_KIND } from "../../../utils/skillTechnologyChipUtils";

export function ActivityEditorFields({
  form,
  onChange,
  disabled = false,
  descriptionHelperText = "Stored as Markdown in rawDescription.",
  descriptionMinRows = 12,
}) {
  return (
    <>
      <Input
        label="Title"
        placeholder="OMS Joint Applicant Unlink Screen"
        value={form.title}
        onChange={(event) => onChange("title", event.target.value)}
        disabled={disabled}
        required
      />

      <TermChipInput
        label="Technologies"
        kind={TERM_KIND.TECHNOLOGY}
        values={form.technologies}
        onChange={(values) => onChange("technologies", values)}
        disabled={disabled}
        helperText="Tools, frameworks, and platforms used in this activity."
      />

      <TermChipInput
        label="Skills"
        kind={TERM_KIND.SKILL}
        values={form.skills}
        onChange={(values) => onChange("skills", values)}
        disabled={disabled}
        helperText="Capabilities and competencies demonstrated in this activity."
      />

      <MarkdownEditor
        label="Raw description"
        placeholder="What you did, technologies used, outcomes achieved…"
        helperText={descriptionHelperText}
        value={form.rawDescription}
        onChange={(value) => onChange("rawDescription", value)}
        disabled={disabled}
        minRows={descriptionMinRows}
      />
    </>
  );
}
