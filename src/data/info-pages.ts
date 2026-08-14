export interface InfoPage {
  title: string
  tagline: string
  sections: { heading: string; body: string }[]
}

/** Content-driven marketing pages served by the `/info/$slug` route. */
export const INFO_PAGES: Record<string, InfoPage> = {
  about: {
    title: 'About us',
    tagline: 'We help people find the room where the memory happens.',
    sections: [
      {
        heading: 'What we do',
        body: 'Wedezy lists verified wedding, birthday, corporate and party venues with real photos, transparent per-plate pricing and honest capacity numbers.',
      },
      {
        heading: 'How we started',
        body: 'After planning one wedding between four spreadsheets and thirty phone calls, we decided venue discovery deserved a better tool.',
      },
    ],
  },
  careers: {
    title: 'Careers',
    tagline: 'Small team, large calendars.',
    sections: [
      {
        heading: 'Open roles',
        body: 'We hire for supply operations in Mumbai, Delhi NCR and Bengaluru, and for product engineering across the stack.',
      },
      {
        heading: 'How we work',
        body: 'Ship weekly, talk to venue owners often, and keep the listing quality bar high.',
      },
    ],
  },
  blog: {
    title: 'Blog',
    tagline: 'Notes on planning, budgets and booking season.',
    sections: [
      {
        heading: 'Latest',
        body: 'Guides on negotiating per-plate rates, choosing between banquet and outdoor venues, and picking dates outside peak season.',
      },
    ],
  },
  contact: {
    title: 'Contact',
    tagline: 'We answer within one business day.',
    sections: [
      {
        heading: 'Support',
        body: 'help@wedezy.example — booking questions and listing corrections.',
      },
      {
        heading: 'Partnerships',
        body: 'partners@wedezy.example — venue onboarding and co-marketing.',
      },
    ],
  },
  'partner-portal': {
    title: 'Partner portal',
    tagline: 'Manage your listing, availability and enquiries.',
    sections: [
      {
        heading: 'For listed venues',
        body: 'Update photos, per-plate pricing and capacity, and respond to booking enquiries in one place.',
      },
      {
        heading: 'Not listed yet?',
        body: 'Add your venue first — approval usually takes two working days.',
      },
    ],
  },
  'help-center': {
    title: 'Help center',
    tagline: 'Answers to the questions we get most.',
    sections: [
      {
        heading: 'Booking',
        body: 'Enquiries are free. You pay the venue directly; Wedezy never holds your deposit.',
      },
      {
        heading: 'Pricing',
        body: 'Prices shown are indicative per-plate rates for the venue and change with menu, season and headcount.',
      },
    ],
  },
  privacy: {
    title: 'Privacy',
    tagline: 'What we collect, and why.',
    sections: [
      {
        heading: 'Your data',
        body: 'We store the details you submit with an enquiry so the venue can respond, and nothing more.',
      },
      {
        heading: 'Cookies',
        body: 'Only what is needed to keep you signed in and remember your city.',
      },
    ],
  },
}
