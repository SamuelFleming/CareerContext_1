# 201 — Experience and Activity Models

## Status

**Planned**

## Phase

Phase 2 — Experience Evidence

## Depends On

- **200** — Phase 2 planning and data contract review

## Related Docs

- `docs/core-scope/05_data_model.md` — Experience, Activity entities
- `docs/core-scope/08_api_contract.md` — API-009 through API-020 field names

## Objective

Create Mongoose models for `Experience` and `Activity` with the Phase 2 MVP field set confirmed in **200**.

## Scope

Add database persistence for the core Phase 2 evidence entities. No routes, controllers, or frontend changes in this ticket.

## Files

```
server/src/models/Experience.js
server/src/models/Activity.js
```

## Experience Schema Fields

| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Required; ownership |
| `type` | String enum | `job`, `project`, `course`, `certification`, `personal_project`, `other` |
| `title` | String | Required |
| `organisation` | String | Optional |
| `role` | String | Default `''` |
| `dateStart` | Date | Optional |
| `dateEnd` | Date | Optional |
| `isCurrent` | Boolean | Default `false` |
| `overviewRaw` | String | Default `''` |
| `overviewPolished` | String | Optional; default `''` |
| `technologies` | [String] | Default `[]` |
| `skills` | [String] | Default `[]` |
| `isArchived` | Boolean | Default `false` |
| `archivedAt` | Date | Default `null` |
| `createdAt` / `updatedAt` | Date | Via `timestamps: true` |

Deferred: `sourceDocumentIds` (not Phase 2 CRUD).

## Activity Schema Fields

| Field | Type | Notes |
|-------|------|-------|
| `userId` | ObjectId → User | Required; ownership |
| `experienceId` | ObjectId → Experience | Required |
| `title` | String | Required |
| `rawDescription` | String | Default `''` |
| `polishedSummary` | String | Optional; default `''` |
| `technologies` | [String] | Default `[]` |
| `skills` | [String] | Default `[]` |
| `outcomes` | String | Optional; default `''` |
| `evidenceStrength` | String enum | Optional: `low`, `medium`, `high` |
| `linkedJournalEntryIds` | [ObjectId] | Default `[]` |
| `isArchived` | Boolean | Default `false` |
| `archivedAt` | Date | Default `null` |
| `createdAt` / `updatedAt` | Date | Via `timestamps: true` |

## Field Naming Note

Use **`overviewRaw` / `overviewPolished`** and **`rawDescription` / `polishedSummary`** — not `rawOverviewMd`, `polishedOverviewMd`, `rawContentMd`, or `polishedContentMd`. These match `05_data_model.md` and `08_api_contract.md`.

## Indexes

```js
// Experience
userId
userId + type
{ userId: 1, isArchived: 1 }

// Activity
userId
experienceId
{ userId: 1, isArchived: 1 }
```

## Model Conventions

Follow existing `User.js` / `CoreContext.js` patterns:

- `timestamps: true`
- `toJSON` transform exposing `id` (string) and omitting `_id`, `__v`, and internal refs where appropriate
- Enum validation on `type` and `evidenceStrength`

## Technical Tasks

- [ ] Create `Experience` schema with fields above
- [ ] Create `Activity` schema with fields above
- [ ] Add indexes listed above
- [ ] Export models cleanly
- [ ] Verify server starts without model compilation errors

## Acceptance Criteria

- [ ] `Experience` model exists and compiles
- [ ] `Activity` model exists and compiles
- [ ] Each record is owned via `userId`
- [ ] Activity requires both `userId` and `experienceId`
- [ ] Archive fields exist for soft-delete support in **202** / **203**
- [ ] No frontend changes required
