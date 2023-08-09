export const sessionPricing = [
  {
    license: 'Single Session',
    stripeName: 'single-session',
    price: '245',
    commons: ['90 min initial consultation', 'Personalised trance session audios', 'After session notes', 'Online or in person'],
    options: [
      { title: 'Return consultation sessions - $175', disabled: false },
      { title: 'Important to reinforce previous session', disabled: false },
    ],
  },
  {
    license: '3-Session Bundle',
    stripeName: 'multi-session',
    price: '640',
    commons: ['60-90 min Session Durations', '4 x Personalised trance Session Audios', 'Ideal to treat most conditions', 'Online or in person sessions'],
    options: [
      { title: '$160 per session, weekly or monthly schedule', disabled: false },
      { title: 'Save $130 (17% discount) on full price', disabled: false },
    ],
  },
  // {
  //   license: 'TRANCEformd Program',
  //   stripeName: 'tranceformd',
  //   price: '995',
  //   commons: ['Are you ready to Quit!', 'Single 90 minute session', 'Personalised to improve effectiveness', 'Online or in person'],
  //   options: [
  //     { title: 'Set yourself free forever', disabled: false },
  //     { title: 'Group Support for 3 months', disabled: false },
  //   ],
  // },
  {
    license: 'Quit Smoking',
    price: '425',
    commons: ['Are you ready to Quit!', 'Single 90 minute session', 'Personalised to improve effectiveness', 'Online or in person'],
    options: [
      { title: 'Set yourself free forever', disabled: false },
      { title: 'Group Support for 3 months', disabled: false },
    ],
  },
];
