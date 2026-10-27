upGrad UPI checkout prototype, V9

index.html   V9: V8 with its scenario 2 as the design. The offer's countdown sits on a quiet
             grey band with a dotted line across the top of the coupon (offer page and
             details) and of the payment page's course card, in upGrad red. Step 1 and 2 are
             V5's offer page and details (with the OTP); step 3 is V8's payment page (V1's
             page, Figma 73:3744, with the payment-options tabs from 78:5054). The payment page
             is a desktop layout (1512px wide), like V1.

Open index.html in a browser. The "Scenario" menu at the top jumps to any state: logged in
or out, last hour, under 10 minutes left, an offer that ends while the page is open, each
payment option, the review, and the other link states. On the payment page, the upGrad logo
starts the flow again.

Text is set in upGrad's Circular, embedded in the page; Circular has no ₹ sign, so that
one glyph comes from Inter (online) or a system font (offline). Circular is licensed to
upGrad: keep this file internal. The UPI QR is a sample and cannot take a payment.

On the payment page, the switch in the bottom-left corner also has Restart (that page has no
Scenario bar), and the upGrad logo starts the flow again every time it is pressed.

Preview versions (switch with V1 to V7 in the bottom-left corner, or add ?v=1 to ?v=7 to the link):
V1           V9 without the heading over the coupon ("An offer from upGrad Marathahalli."), on
             every offer state, including an offer that ends while the page is open (the
             coupon's band says it ended).
             On phones the details page shows the coupon first, then the details card.
V2           V1 with the binary-code image behind the offer page (25% opacity) and the
             details page (12.5%) only; no image from the payment page on. Between the two, only the image fades (0.4s); the page itself
             switches as in V1.
V3           V1 (no background image) with a trimmed coupon: no "Your course" line (its icon and label), and the
             saving ("You save ₹10,000") on the price's line, at the coupon's right edge.
V4           V3, and on the offer page the coupon prints out of a printer, as in the references:
             a light housing with a recessed window and a cable; the coupon comes out from under
             the window's back edge (the rollers), lies over the housing's front and hangs below.
             The print follows the Dribbble interaction: a coupon already out is pulled back in,
             then it creeps out a fifth of the way with a small jitter, then glides out and slows
             to rest (about 1.5s). The coupon gets a scalloped bottom edge; its top
             corners are near-square on the offer page and rounded on the details page. It prints on opening, on a scenario or Restart and on Replay
             (in the switch), not when coming back from the details; with reduced motion it is
             simply there.
             The countdown's clock ticks: its second hand steps on each second, a full turn in
             12 seconds (not with reduced motion).
             As the coupon lands, the price reveals itself one step at a time (about 1.6s): a
             line strikes through ₹1,00,000, shown as the price; it moves up into its place
             beside "Course fee"; ₹90,000 comes in where it stood; then "You save ₹10,000" pops
             in. Only while the offer is live; not with reduced motion.
             The price is labelled "Course fee" (as on the payment page), beside the struck
             list price while the offer is live, and alone above the full price once it ends.
             The offer page's button says "Claim now" (V1 to V3 keep "Apply Offer").
             The details page's heading says "Almost there. Add your details." (V1 to V3 keep
             "Almost there. Who is joining?").
             The payment page's course card has no "↓10%" before the struck list price.
             The coupon's course name is a little larger: 17px (16px on phones; 15px in the
             phone details summary).
             On phones, the details page shows the coupon as a short summary (the countdown, the
             course and the price; no centre, batch start or duration) so the name, email and
             mobile fields come into view.
             On the details page, Continue stays off until the name, email and mobile pass the
             page's checks; meanwhile the line under it says what to fill in.
V5           V4, with the offer's countdown ("Offer ends in 17h 44m · 9:00 PM today") under the
             final price instead of on a band above the course, so it reads as the price's
             deadline: what it costs, what you save, until when. On the coupon (offer and
             details pages) and on the payment page's course card. In the price reveal it
             comes in with ₹90,000, at the same moment and with the same motion; once the offer ends it says "Offer ended at
             9:00 PM" in the same place.
             The time always shows seconds (08:05:42, not 8h 5m), a size up and bold, in every
             live state (logged out, logged in, the last hour, the last 10 minutes); in the last
             minute it goes a size up again with a soft beat each second (no beat with reduced
             motion). Also on the payment page.
             Once the offer has ended, the payment page's summary shows the Offer row as
             "INR -10,000" struck through (a brand-red line, tilted a little), with "Offer
             ended at 3:05 PM" under it. That is the only place the payment page says it: the
             course card no longer repeats it under the price (the coupon keeps its line).
             The offer page has no header (logo, "Secure checkout", Log in, progress bar); it
             comes in from the details page on. The printer has no cable.
             On the details page, Continue stays red while it waits for the details (V4 greys
             it out). Every disabled button in V5 and V6 (Continue, Verify, "Verifying…", the
             payment page's Next) is #F15663 with its label in full white. It stays clickable: pressed before the
             details are in, it shows the errors under what is missing (with a small shake) and
             moves to the first. The OTP sheet's Verify gets the same until all six digits are in:
             pressed early, it says "Enter the 6-digit code we sent to your mobile." (or "Enter
             all 6 digits of the code."), and the code boxes shake.

V6           V5, and the payment page's first step reads "1. Billing postal / PIN code" (most
             learners know it as a PIN code; its messages say PIN code too). Its field lines up
             with the payment cards' right column (the same left edge and width as the second
             card), and the place found for the code ("Bengaluru, Karnataka") sits under it,
             right-aligned to the same edge as the field and the cards.
             The code is filled in from the learner's location when they have none on file
             (logged out): 560037, Marathahalli, Bengaluru. It stays editable. (V5 does this too.)

V7           V6, and once the offer ends with the page open, the coupon (offer and details
             pages) and the payment page's course card show what was missed: "You save
             ₹10,000", grey, struck through with a tilted brand-red line (as in the summary).
             As in V5, "Offer ended at 4:30 PM" stays under the coupon's price and, on the
             payment page, is only in the summary. The full price beside the tag is a size down
             (36px, 32px on phones), so the two keep one line.

The "Offer ends in 10 seconds" scenarios (offer page, payment page, review) end the offer 10 seconds
after they open, to see the end without a long wait (they were 30 seconds).
