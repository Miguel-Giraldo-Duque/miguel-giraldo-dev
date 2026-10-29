# First funnel: ConvertFlow free plan vs a code-native form

Research note only. Nothing here is installed on the site.

Checked against ConvertFlow's public pricing page and help center on 29 October 2026. The free plan is described inconsistently across ConvertFlow's own pages, so the limits below are quoted rather than smoothed over. Confirm them in the dashboard before relying on the free tier.

## What the free plan includes

The pricing FAQ says you can use the platform for free to launch 5 funnel campaigns, invite teammates to preview and test them, and that connecting funnels to the rest of a tool stack requires a paid plan.

[ConvertFlow pricing](https://www.convertflow.com/pricing), FAQ "How does the free plan work?":

> You can use ConvertFlow's funnel platform for free to launch 5 funnel campaigns. Invite your team to your ConvertFlow account so they can also preview your ConvertFlow campaigns and test out funnels. To integrate your funnels with your stack of tools, upgrade to a paid plan.

The same page's plan comparison also says "Unlimited funnel previews. Upgrade to go live." That line sits next to the paid columns, and it is not obvious whether "launch" on the free plan means a campaign that real visitors see or only a preview. A third-party review dated 11 October 2026 (ToolsGavel) describes a permanent free tier of 5 campaigns and 10,000 monthly funnel views, with newsletter integrations only and no card required. That review is not ConvertFlow's own page.

The Shopify app listing is a different surface and should not be used as the website-plan price: it talks about 3 live campaigns and about 1,000 tracked views.

Paid plans, from the same pricing page, for context:

| Plan | Price shown | Funnel views | Campaigns | What changes |
| --- | --- | --- | --- | --- |
| Personal | from $29/month ($22/month per extra site on annual partner pricing) | up to 10k | up to 10 | AI remix of 400+ templates, custom domain, landing pages, lead forms, quizzes, popups, analytics. Newsletter integrations are listed on the per-site Personal card. |
| Prime | from $99/month | up to 30k | up to 25 | CRM and SMS, email/SMS validation, Zapier and custom webhooks, remove "powered by". |
| Pro | from $299/month | the page shows both 30k and 100k in different blocks | unlimited on the per-site card | Personalization, AI A/B tests, conditional logic. |

Billing is on funnel views (people who see the popup or quiz), not on all site traffic. Going over a paid limit can auto-raise the cap. That meter does not matter until a paid plan is on.

For a first funnel on this portfolio, the free plan is enough only if "launch" really means a live popup or quiz, and only if the lead can be read inside ConvertFlow. Pushing that lead into an inbox, a sheet, or the contact route on this site is the thing the FAQ says needs a paid plan.

## How it would be installed in Next.js

ConvertFlow's help article [Installing the ConvertFlow code](https://help.convertflow.com/article/171-installing-the-convertflow-code-on-your-website) says each site has its own script under Settings, Install Code, ideally in the document head. The URL is account-specific, in the shape `https://js.convertflow.co/production/websites/YOUR_ID.js`.

In the App Router that is `next/script` in `src/app/layout.jsx`, not a tag in `index.html` (this repo no longer has one):

```jsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script
          src="https://js.convertflow.co/production/websites/YOUR_ID.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

`afterInteractive` loads the script after hydration, which matches their async snippet.

This site is a client-side navigation between `/` and `/privacidad`. ConvertFlow's SPA note says a history change does not re-check targeting unless you call `convertflow.start()`. A small client effect on `usePathname()` would do that:

```js
useEffect(() => {
  window.convertflow?.start?.();
}, [pathname]);
```

Their help article suggests the same call from Google Tag Manager on a History Change trigger. One or the other is enough. Do not add both.

Embeds (a form painted into a specific block, rather than a popup) use a second snippet from the same install screen. A single embed per page is their own recommendation.

## Performance

ConvertFlow's help article [Does ConvertFlow slow down my website?](https://help.convertflow.com/article/313-does-convertflow-slow-down-my-website) says the tracking script is about 10–20 KB, async, and served from their CDN, so the HTML of the page is not blocked on it. The same article says the campaigns themselves are a different story: images, Google Fonts chosen in the builder, video backgrounds, and custom HTML/CSS/JS are loaded onto the page and are not free.

On this site that cost lands on top of Raleway (already loaded) and the yellow blur decorations. A popup that pulls a second font, a large image, or a video fights the "this page is fast" pitch. A text-only popup is the only variant that stays close to their 10–20 KB claim.

`strategy="afterInteractive"` keeps it off the critical path. It still competes with the main thread after load, and it runs on every page, including the privacy policy, unless targeting says otherwise.

## Privacy

The script exists to recognize visitors and decide which campaign to show. That is tracking, even when the campaign is a simple email field. ConvertFlow is a US company. If the script is added to miguelgd.com it becomes another encargado, and the privacy page would need a real update: what the script stores, for how long, and the international transfer under article 12 of Ley 25.326. The contact form already asks for consent before a message is kept. A third-party popup that sets its own cookies does not inherit that checkbox.

Their help center does not publish a short cookie list on the install page. Before turning the script on, the cookie and subprocessors list in the ConvertFlow account should be read and copied into `/privacidad`. Loading the script only after a consent banner is the safer default for an Argentine audience. That banner is itself a funnel, which is a poor reason to adopt the tool.

The free plan's weak integrations also mean a lead typed into a ConvertFlow popup may sit only in their UI. That is a second place where a name and email live, beside the route this repo already has.

## Code-native alternative

The contact section on the home page is the first funnel: one job, one form, server-side validation, a privacy checkbox, and a honeypot. It does not need a popup to start a conversation with a local business.

If a quiz is useful later ("¿qué tipo de landing necesitás?"), it can be a short client component that ends by posting to the same `/api/contact` route, with an extra field on the schema. No new vendor, same consent copy, same email sender. Analytics, if wanted, is a single event (`contact_submit`) sent to whatever is already on the site. There is no analytics snippet today, and this note does not add one.

Libraries are optional and not required for that quiz. A multi-step form in React is smaller than adopting a funnel SaaS for a site whose offer is a fast, inexpensive landing.

## Recommendation

Do not install ConvertFlow on miguelgd.com for the first funnel.

The in-house form already collects the lead, with validation and a privacy page that matches Ley 25.326. ConvertFlow's free plan might cover a live popup or quiz, but the public docs disagree on whether free campaigns go live, and they agree that connecting the lead to other tools is paid. The script adds a tracker and a second copy of people's data, which cuts against the speed and the privacy story used to sell the landings.

Revisit ConvertFlow Personal (from $29/month) only for a client project that wants a no-code popup or quiz without a deploy, and only after the campaign is a light one (no video, no extra font) and the client's privacy notice names ConvertFlow. For Miguel's own site, a second step on the existing form is the smaller path.
