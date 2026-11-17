import type { UzPost } from "@/lib/blog-uz";

/** English versions of blog articles. Key = slug of the Russian article; slug list lives in blog-uz-slugs.ts. */
export const EN_POSTS: Record<string, UzPost> = {
  "vyzov-kompyuternogo-mastera-tashkent": {
    title: "Calling a computer technician to your office in Tashkent: when you need one and how to prepare",
    category: "IT Support",
    readTime: "6 min",
    excerpt: "What can be fixed remotely and when an on-site visit is needed. How to prepare before the technician arrives and which documents to get afterwards.",
    content: `
A computer won't turn on, the printer doesn't print, the office has lost its internet — for a business without an in-house IT specialist, situations like these stop work. Here is when you need a computer technician on site and when it is faster to solve the problem remotely.

## What can be solved remotely

An engineer can fix a large share of problems through a remote connection, without visiting:

- Setting up email, Microsoft 365, messengers and office software
- Installing and updating programs, drivers and antivirus
- Setting up E-IMZO and document signing in Didox, if the key is at hand and the computer starts
- Problems with shared folders and user accounts
- Slow performance and recurring error messages

Remote is usually faster: there is no waiting for someone to arrive, and you can watch the work on your screen.

## When you need a technician on site

A visit is needed when the problem is physical or remote access is impossible:

- A computer or laptop won't turn on or the system won't boot
- The internet is down across the whole office, Wi-Fi or the router is not working
- A cable needs to be run or checked, or a new workstation connected
- A printer or MFP can't see the network, paper is jammed, or the device reports a hardware error
- Replacing components: disk, memory, power supply
- Moving an office or connecting new equipment

## How to prepare for the technician's visit

To keep the visit short:

- Describe the problem: what happened, when it started, what was changed the day before
- Photograph the error on screen, if there is one
- Have the administrator passwords ready, or the person who can enter them
- Make sure the technician can reach the server room, the router and the equipment cabinet
- Save important files if the computer still works

## Which documents to get after the work

Work for a legal entity must be formalised. After the visit you should receive:

- An acceptance act listing what was done
- An invoice under the contract
- Recommendations, if risks were found: an old disk, no backup, a weak router password

If a technician comes "without paperwork", the expense is hard to book in accounting, and there is nobody to follow up with if the problem returns.

## One-off visit or subscription

If you need a visit once every few months, it is more convenient to pay per request. If problems come up every week, a subscription is more cost-effective: the engineer knows your office, and many problems are prevented in advance.

**Conclusion**: Try remote help first — it is faster. A visit is for physical problems with equipment and the network. ARKANA visits clients across Tashkent and documents every job with an act and an invoice. Leave a request — we will clarify the task and send a quote within one business day.
    `,
  },

  "e-imzo-ne-rabotaet": {
    title: "E-IMZO not working: common e-signature errors and how to fix them",
    category: "IT Support",
    readTime: "6 min",
    excerpt: "The key is not visible, Didox or my.soliq.uz won't accept the signature, the browser can't find E-IMZO. Common causes of e-signature problems and a checklist.",
    content: `
Businesses in Uzbekistan need an electronic signature every day: invoices in Didox, tax reports, government services. When E-IMZO stops working, accounting stops too. Here are the common causes and the order in which to check them.

## Step 1. Is E-IMZO running

A signature in the browser works only if the E-IMZO program is running on the computer. A common reason for the error "E-IMZO is not installed" or "module not found" is simply that the program is not running or closed itself after a restart.

Check whether the E-IMZO icon is in the notification area next to the clock. If not, start the program and refresh the page in the browser.

## Step 2. Is the key folder visible

E-IMZO keys are stored in the DSKEYS folder, in the root of a drive or USB stick. If the key does not appear in the list:

- Check that the USB stick is plugged in and visible in the system
- Make sure the folder is named exactly DSKEYS and sits in the root, not in a nested folder
- Check that the key file has not been deleted or renamed

## Step 3. Has the key expired

Every e-signature key has an expiry date. If it has passed, the signature will not work in any service. The date is visible when you select the key in E-IMZO. An expired key must be reissued — ahead of time, so you are not left without a signature on reporting day.

## Step 4. Browser and updates

If E-IMZO is running and the key is visible but the website does not accept the signature:

- Update E-IMZO to the latest version
- Try a different browser
- Disable extensions that block scripts on the page
- Check whether antivirus is blocking the program

## Step 5. Key password

After several wrong password attempts a key can become locked. If the password is lost it cannot be recovered — the key has to be reissued. Keep passwords somewhere safe, not on a sticky note on the monitor.

## How to avoid failures

- Keep a copy of the key in a protected place
- Track the expiry dates of keys for every employee who signs documents
- Do not install E-IMZO and keys on shared computers
- After reinstalling Windows, test the signature straight away, not on reporting day

**Conclusion**: Most E-IMZO problems are fixed in a few minutes: start the program, check the DSKEYS folder, the key's expiry date and the browser. If that doesn't help, ARKANA sets up E-IMZO and signing in Didox and my.soliq.uz remotely or on site in Tashkent. Leave a request and we will reply within one business day.
    `,
  },

  "sistemnyj-administrator-na-autsorse": {
    title: "Outsourced system administrator: what's included and who it suits",
    category: "IT Outsourcing",
    readTime: "7 min",
    excerpt: "How an outsourced system administrator differs from an in-house one, which tasks they take on and how to tell whether outsourcing suits your company.",
    content: `
A small company rarely needs a full-time system administrator, yet IT tasks keep coming up. An outsourced system administrator is an external specialist or team that runs your IT under a contract.

## What an outsourced system administrator does

Support usually covers:

- Supporting employees: computers, email, software, printers
- Setting up and maintaining the office network, Wi-Fi and internet
- User accounts: creating access for new employees and removing it for leavers
- Backing up important data and checking that it can be restored
- Updates and antivirus protection
- Connecting new workstations and equipment
- Tracking equipment and licences

The exact scope is written into the contract — that is the first thing to check before signing.

## How it differs from an in-house sysadmin

An in-house specialist is always in the office, but there is only one of them: holiday, illness or resignation leaves the company without IT. Besides, one person is rarely equally strong in networks, servers, security and office software.

Outsourcing is a contract with a company, not with a person. Knowledge of your infrastructure is documented, requests are logged, and work goes on even when a particular engineer is unavailable.

## Who outsourcing suits

- Companies with no IT specialist, where problems are solved by "whoever understands computers"
- Offices where IT tasks do not justify a full-time post
- Companies with an in-house sysadmin who needs support on complex projects
- Businesses that want transparency: requests, acts and a record of the work done

## How to choose a provider

- Ask to see the contract: what is included, what is paid separately, response times
- Find out how requests are submitted: phone, Telegram, a ticketing system
- Ask whether every job is documented with an act and an invoice
- Ask who will keep the passwords and documentation for your network

## Ways of working

- Subscription — a fixed monthly payment for office support
- Pay per request — you pay only for the work done
- Projects — one-off tasks: cabling, an office move, server setup

**Conclusion**: An outsourced system administrator suits companies that need reliable IT without the cost of a staff position. ARKANA works by subscription, per request and on projects, and documents every job with a contract, an act and an invoice. Leave a request — we will send a quote for your company within one business day.
    `,
  },
};
