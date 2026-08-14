# Wedezy — functional booking with local persistence

**Date:** 2026-08-06
**Status:** Approved

## Goal

Turn the Wedezy venue site into a working guest-side product: accounts, real
bookings with availability rules, and saved venues — all persisted in
localStorage behind a `services/` layer, with an animation system that makes the
app feel responsive rather than decorated.

## Constraints

- No new runtime dependencies. Animation uses CSS, Radix Themes' built-ins and
  the browser View Transitions API (TanStack Router supports it natively).
- No component may touch `localStorage` directly. All persistence goes through
  `src/services/`.
- Every service is `async`, so replacing localStorage with an HTTP API is a
  change inside one file per domain and nothing else moves.
- All motion respects `prefers-reduced-motion`.

## Architecture

```
src/services/
├── storage/
│   ├── keys.ts            # namespaced key constants: wedezy:v1:<domain>
│   └── local-storage.ts   # typed read/write, JSON + quota safe, version stamp,
│                          # cross-tab subscribe
├── errors.ts              # typed domain errors
├── query-keys.ts          # centralised React Query keys
├── auth.service.ts
├── bookings.service.ts
├── favourites.service.ts
└── venues.service.ts      # catalogue reads (replaces src/api/venues.ts)
```

`src/api/` is removed. React Query is the only cache; services are the only
writers. Components consume feature hooks (`useSession`, `useBookings`,
`useFavourites`) that wrap queries and mutations.

### Layering rule

```
route/component → feature hook → service → storage adapter → localStorage
```

A violation of this order is a defect, not a style preference.

## Data model

```ts
type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

User      { id, name, email, passwordHash, createdAt }
Session   { userId, startedAt }
Booking   { id, userId, venueId, date, guests, eventType,
            contactName, contactPhone, estimate,
            status, createdAt, cancelledAt? }
Favourite { userId, venueId, savedAt }
```

- `date` is an ISO `YYYY-MM-DD` string — no time component, because a venue is
  booked for a day.
- `estimate` is an integer in rupees, computed by the service so the summary
  shown and the record stored can never disagree.
- `passwordHash` is a salted SHA-256 digest via WebCrypto. This is a local demo,
  but storing plaintext credentials is a pattern not worth teaching.

## Booking rules

Enforced in `bookings.service.ts`, never in a component:

1. **Conflict** — at most one non-cancelled booking per `venueId + date`.
   `getUnavailableDates(venueId)` feeds the date picker so taken days are
   disabled before they can be chosen; `create()` re-checks and throws
   `DateUnavailableError` if the state changed underneath (another tab).
2. **Capacity** — `1 ≤ guests ≤ venue.guests`, else `OverCapacityError`.
3. **Date window** — today or later, at most 18 months out, else `InvalidDateError`.
4. **Estimate** — `guests × perPlate`, derived from the venue record.
5. **Ownership** — cancel is only permitted for a booking whose `userId` matches
   the active session, else `NotOwnerError`.

## Routes

| Route                   | Purpose                              | Guard |
| ----------------------- | ------------------------------------ | ----- |
| `/venues/$venueId/book` | 2-step flow, `?step=details\|review` | auth  |
| `/account/bookings`     | list + status filter + cancel        | auth  |
| `/account/saved`        | saved venues grid                    | auth  |
| `/signin`, `/signup`    | real auth, `?redirect=` return-to    | —     |

Guards use `beforeLoad` with `redirect({ to: '/signin', search: { redirect } })`.
Step state lives in the URL so the browser back button moves between steps.

## Error handling

Typed errors carry a `field` where one applies, so the form renders them inline
rather than in an alert:

| Error                     | Surfaced as                         |
| ------------------------- | ----------------------------------- |
| `DateUnavailableError`    | inline under the date field + toast |
| `OverCapacityError`       | inline under the guests field       |
| `InvalidDateError`        | inline under the date field         |
| `EmailInUseError`         | inline under email on sign-up       |
| `InvalidCredentialsError` | form-level message on sign-in       |
| `StorageFullError`        | toast, mutation rolled back         |

Optimistic mutations (favourite toggle) roll back on failure and raise a toast.
Storage read failures return an empty collection instead of throwing, so a
corrupted key degrades one feature rather than white-screening the app.

## Animation system

| Moment             | Technique                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| Card → detail page | View Transitions; `view-transition-name: venue-<id>` shared by the card image and the detail hero |
| Route change       | `defaultViewTransition: true` on the router                                                       |
| Toasts             | `ToastProvider` + `useToast()`, Radix Themes components, CSS slide/fade                           |
| Favourite          | heart fills and pops immediately (optimistic), before the write resolves                          |
| Booking steps      | slide + fade between steps, progress bar animates its width                                       |
| Confirmation       | SVG checkmark drawn via `stroke-dashoffset`, then staggered detail reveal                         |
| Loading            | skeleton crossfades into content instead of a layout jump                                         |
| Lists              | existing staggered `card-in` entrance, reused for bookings                                        |

All of the above sit behind `@media (prefers-reduced-motion: reduce)`, which
disables transforms and shortens durations to zero.

## Cross-tab behaviour

`local-storage.ts` exposes `subscribe(key, cb)` over the `storage` event. A
`useStorageSync()` hook in the root layout invalidates the affected React Query
keys, so signing out in one tab signs out the other and a booking made in one
tab appears in the other.

## Verification

No test runner is installed, so verification is a headless-Chrome script driving
the production build:

1. Sign up → session persists across reload
2. Book a venue → appears in `/account/bookings`
3. Re-book the same venue and date → date disabled, service rejects
4. Guests over capacity → inline error
5. Cancel → status changes, date becomes bookable again
6. Favourite a venue → persists across reload, appears in `/account/saved`
7. Visiting `/account/bookings` signed out → redirects to `/signin?redirect=…`
   and returns after signing in
8. `lint`, `format:check` and `build` clean

Adding Vitest for the service layer is a reasonable follow-up but is out of
scope here; it would be the one new dev dependency.

## Out of scope

- Venue-owner side (creating listings, responding to bookings)
- Reviews and ratings submitted by users
- Any real network calls or backend
