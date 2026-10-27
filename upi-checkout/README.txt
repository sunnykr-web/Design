upGrad UPI checkout prototype, V9

index.html   V9: V8 with its scenario 2 as the design. The offer's countdown sits on a quiet
             grey band with a dotted line across the top of the coupon (offer page and
             details) and of the payment page's course card, in upGrad red. Step 1 and 2 are
             V5's offer page and details (with the OTP); step 3 is V8's payment page (V1's
             page, Figma 73:3744, with the payment-options tabs from 78:5054). The payment page
             is a desktop layout (1512px wide), like V1.

Open index.html in a browser. The "Scenario" menu at the top jumps to any state: logged in
or out, last hour, under 10 minutes left, an offer that ends while the page is open, the
payment page's review (and an offer that ends on the payment page), and the other link states. On the payment page, the upGrad logo
starts the flow again.

Text is set in upGrad's Circular, embedded in the page; Circular has no ₹ sign, so that
one glyph comes from Inter (online) or a system font (offline). Circular is licensed to
upGrad: keep this file internal. The UPI QR is a sample and cannot take a payment.

On the payment page, the switch in the bottom-left corner also has Restart (that page has no
Scenario bar), and the upGrad logo starts the flow again every time it is pressed.

Preview versions (switch with V5, V6 and V7 in the bottom-left corner, or add ?v=5, ?v=6 or ?v=7
to the link; it opens on V7):
V5           V9 with a trimmed coupon: no heading over it ("An offer from upGrad
             Marathahalli."), no "Your course" line, and the saving ("You save ₹10,000") on the
             price's line, at the coupon's right edge. On phones the details page shows the
             coupon first, then the details card.
             On the offer page the coupon prints out of a printer, as in the references: a
             light housing with a recessed window; the coupon comes out from under the window's
             back edge (the rollers), lies over the housing's front and hangs below. The print
             follows the Dribbble interaction: a coupon already out is pulled back in, then it
             creeps out a fifth of the way with a small jitter, then glides out and slows to
             rest (about 1.5s). The coupon gets a scalloped bottom edge; its top corners are
             near-square on the offer page and rounded on the details page. It prints on
             opening, on a scenario or Restart and on Replay (in the switch), not when coming
             back from the details; with reduced motion it is simply there.
             The offer page has no header (logo, "Secure checkout", Log in, progress bar); it
             comes in from the details page on.
             As the coupon lands, the price reveals itself one step at a time (about 1.6s): a
             line strikes through ₹1,00,000, shown as the price; it moves up into its place
             beside "Course fee"; ₹90,000 comes in where it stood, with the countdown under it
             at the same moment and with the same motion; then "You save ₹10,000" pops in.
             Only while the offer is live; not with reduced motion.
             The price is labelled "Course fee" (as on the payment page), beside the struck
             list price while the offer is live, and alone above the full price once it ends.
             The offer's countdown ("Offer ends in 17:44:12 · 9:00 PM today") sits under the
             final price, so it reads as the price's deadline: what it costs, what you save,
             until when. On the coupon (offer and details pages) and on the payment page's
             course card. Its clock ticks: the second hand steps on each second, a full turn in
             12 seconds (not with reduced motion).
             The time always shows seconds (08:05:42, not 8h 5m), a size up and bold, in every
             live state (logged out, logged in, the last hour, the last 10 minutes); in the last
             minute it goes a size up again with a soft beat each second (no beat with reduced
             motion). Also on the payment page.
             Once the offer ends, the coupon says "Offer ended at 9:00 PM" where the countdown
             was. The payment page's summary shows the Offer row as "INR -10,000" struck through
             (a brand-red line, tilted a little), with "Offer ended at 3:05 PM" under it; that is
             the only place the payment page says it (the course card does not repeat it).
             The offer page's button says "Claim now" (it was "Apply Offer").
             The details page's heading says "Almost there. Add your details." (it was "Almost
             there. Who is joining?").
             The payment page's course card has no "↓10%" before the struck list price.
             The coupon's course name is a little larger: 17px (16px on phones; 15px in the
             phone details summary).
             On phones, the details page shows the coupon as a short summary (the countdown, the
             course and the price; no centre, batch start or duration) so the name, email and
             mobile fields come into view.
             On the details page, Continue waits for the name, email and mobile to pass the
             page's checks; meanwhile the line under it says what to fill in. Every disabled
             button (Continue, Verify, "Verifying…", the payment page's Next) is #F15663 with its
             label in full white. It stays clickable: pressed before the details are in, it
             shows the errors under what is missing (with a small shake) and moves to the
             first. The OTP sheet's Verify gets the same until all six digits are in: pressed
             early, it says "Enter the 6-digit code we sent to your mobile." (or "Enter all 6
             digits of the code."), and the code boxes shake.
             A logged-out learner's billing code is filled in from their location: 560037,
             Marathahalli, Bengaluru (editable).

V6           V5, and the payment page's first step reads "1. Billing Postal Code / PIN Code" (most
             learners know it as a PIN code; its messages say PIN code too). Its field lines up
             with the payment cards' right column (the same left edge and width as the second
             card), and the place found for the code ("Bengaluru, Karnataka") sits under it,
             right-aligned to the same edge as the field and the cards.
             The code is filled in from the learner's location when they have none on file
             (logged out), as in V5.

V7           V6, and the offer does not run out on the payment page: a learner who gets there while
             the offer is live keeps the offer price (₹90,000) for that visit, however close to the
             end they came, through the options and the review. The payment page shows no timer: on
             desktop the course card shows the price and the saving; on phones the pinned strip
             shows the price, and "You save ₹10,000" where the countdown was. The offer and details pages keep their
             countdown, and a learner who reaches checkout after the offer has ended pays the full
             price, as before. (Try "Offer ends in 10 seconds" under Payment page.)

On phones (up to 860px wide), the payment page (V5 to V7) is upGrad's mobile checkout (Figma
94:6801): a "Payment Options" header with Back and the progress that also carries, pinned however
far the options are scrolled, the course (logo, name, and "Marathahalli, Bengaluru · Starts Oct 31 ·
4 months", one line down to 360px) and a thin strip with the offer's countdown and price (once the offer ends, when it
ended and the full price), then "Choose a payment option":
Reserve a Seat (pay at least INR 10,000 now by card, net banking or UPI), Recommended (Credit Card
EMI over 24 months; No Cost Cardless EMI over 6 months with Propelld, Fibe or Northernarc),
Pocket-Friendly (Standard EMI at 18%) and Other options (the full amount by card or net banking),
and Back to Top. The details page uses the same header on phones ("Your Details", with Back to
the offer) in place of its heading ("Almost there. Add your details.", kept for screen readers),
and in place of the coupon its header carries the course (logo and name) and a thin strip with
the offer's countdown and price ("Offer ends in 00:59:12" and "₹90,000 ₹1,00,000"), all pinned to the
top however far the form is scrolled. The amounts follow this course's price (INR 90,000 while the offer is live, INR
1,00,000 after), not the frame's sample course. Picking an option opens the page's review, as on
the desktop page (the review itself is the desktop page). From 861px the payment page is as
before.

The "Offer ends in 10 seconds" scenarios (offer page, payment page, review) end the offer 10 seconds
after they open, to see the end without a long wait (they were 30 seconds).
