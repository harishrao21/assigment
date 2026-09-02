# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”, but the first row is the oldest expense and the newest one appears lower down.

**What is wrong:** The list is being sorted from oldest to newest, even though the label says newest should be first.

**What I changed:** I fixed the date sorting so the most recent expense appears at the top and kept the list tied to each expense’s real ID so the correct item is shown and updated.

---

## Bug 2

**How to reproduce:** Add a bill that is split equally or by percentages and does not divide evenly, such as 100 divided by 3 or a percentage split that totals 100.

**What is wrong:** The app can lose or create a few cents when splitting the bill. That means the shares do not add up to the original amount, which breaks the trip totals.

**What I changed:** I fixed the split logic so the leftover cents are distributed properly and the total of all shares matches the bill amount exactly.

---

## Bug 3

**How to reproduce:** Look at the Balances panel after the trip has expenses logged. Some people are shown as owing money even when they are actually owed money.

**What is wrong:** The labels are reversed. The app is showing who owes and who is owed in the wrong direction.

**What I changed:** I corrected the balance labels so a person who is owed money is shown as being owed money, and a person who owes money is shown as owing money.

---

## Bug 4

**How to reproduce:** Apply a filter, then delete or edit an expense in the filtered list.

**What is wrong:** The app is using the position in the filtered list instead of the actual expense record. When the list is filtered, the wrong expense can be edited or removed.

**What I changed:** I changed the delete and update actions to use each expense’s real ID instead of the visible list position, so the correct expense is changed.

---

## Bug 5

**How to reproduce:** Add a bill where one person pays for others but is not included in the split.

**What is wrong:** The app still subtracts that payer’s share from their balance even though they were not supposed to pay for that bill.

**What I changed:** I fixed the balance calculation so only the people actually included in the split are charged, while the payer is still counted as having paid the full amount out.

---

## Bug 6

**How to reproduce:** Create a scenario where one person owes exactly the same amount another person is owed.

**What is wrong:** The settlement logic misses this case and skips the transfer, leaving the balances unsettled even though they should be cleared.

**What I changed:** I added the missing exact-match transfer handling so all balances are settled correctly.

---
