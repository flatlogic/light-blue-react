import {
  TOGGLE_STAR_STATUS,
  SET_READ_STATUS,
  SET_SELECT_STATUS,
  DELETE_MAIL,
  TOGGLE_ALL_CHECKED,
  CHANGE_FILTERED_MAILS,
} from '../constants';

const defaultState = {
  mailsList: [
    {
      id: 1,
      sender: 'Philip Horbacheuski',
      senderMail: 'philip.horbacheuski@example.com',
      subject: 'Hi, Welcome to Google Mail',
      date: '18:31',
      paperclip: true,
      attachment: true,
      unread: true,
      starred: true,
      folderId: 1,
      selected: false,
      attachments: ['i1', '2'],
      body: '<p>Projecting surrounded literature ' +
      'yet delightful alteration but bed men. Open are' +
      ' from long why cold. If must snug by upon sang ' +
      'loud left. As me do preference entreaties compliment ' +
      'motionless ye literature. Day behaviour explained law' +
      ' remainder.</p>    <p><strong>On then sake' +
      ' home</strong> is am leaf. Of suspicion do' +
      ' departure at extremely he believing. Do know ' +
      'said mind do rent they oh hope of. General enquire' +
      ' picture letters garrets on offices of no on.</p>' +
      ' <p>All the best,</p> <p>Vitaut the Great, CEO,' +
      ' <br>Fooby Inc.</p>',
    },
    {
      id: 2,
      sender: 'StackExchange',
      subject: 'New Python questions for this week!',
      date: 'Aug 14',
      paperclip: true,
      unread: true,
      starred: false,
      attachment: true,
      timestamp: 1376508566000,
      folderId: 1,
      selected: false,
      attachments: ['assets/img/jpeg/3.jpg'],
      body: '<h1>THIS IS HTML!!!!</h1>',
    },
    {
      id: 3,
      sender: 'notifications@facebook.com',
      senderMail: 'notifications@facebook.com',
      subject: 'Someone just commented on your photo!',
      date: 'Aug 7',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1375877213000,
      folderId: 1,
    },
    {
      id: 4,
      sender: 'Twitter',
      subject: '@hackernews is now following you on Twitter',
      date: 'Jul 31',
      starred: true,
      unread: true,
      selected: false,
      timestamp: 1375261974000,
      folderId: 1,
    },
    {
      id: 5,
      sender: 'LinkedIn',
      subject: 'Jobs you may be interested in',
      date: 'May 12',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1373634231000,
      folderId: 1,
    },
    {
      id: 6,
      sender: 'Naevius Victorsson',
      subject: 'Front no party young abode state up',
      date: 'May 1',
      starred: true,
      unread: false,
      selected: false,
      timestamp: 1373516566000,
      folderId: 1,
    },
    {
      id: 7,
      sender: 'Nikola Foley',
      subject: 'Quiet led own cause three him',
      date: 'Apr 23',
      paperclip: true,
      attachment: true,
      attachments: ['assets/img/jpeg/5.jpg', 'assets/img/jpeg/4.jpg'],
      unread: false,
      starred: false,
      selected: false,
      timestamp: 1374508566000,
      folderId: 1,
    },
    {
      id: 8,
      sender: 'Ernst Hardy',
      subject: 'Raising say express had chiefly detract demands she',
      date: 'Apr 20',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1373877213000,
      folderId: 1,
    },
    {
      id: 9,
      sender: 'Lubbert Fuller',
      subject: 'Civility vicinity graceful is it at',
      date: 'Jul 3',
      starred: true,
      selected: false,
      unread: false,
      timestamp: 1376516566000,
      folderId: 2,
    },
    {
      id: 10,
      sender: 'Tatenda Guerra',
      subject: 'Improve up at to on mention perhaps raising',
      date: 'Jul 13',
      attachment: true,
      attachments: ['assets/img/jpeg/6.jpg'],
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1376508566000,
      folderId: 3,
    },
    {
      id: 12,
      sender: 'Ladislao Roche',
      subject: 'Way building not get formerly her peculiar',
      date: 'Jul 18',
      selected: false,
      unread: true,
      starred: false,
      timestamp: 1375877213000,
      folderId: 2,
    },
    {
      id: 13,
      sender: 'Areli.Tanzi@gmail.com',
      senderMail: 'Areli.Tanzi@gmail.com',
      subject: 'Up uncommonly prosperous sentiments simplicity',
      date: 'Jul 24',
      starred: true,
      attachment: true,
      attachments: ['assets/img/jpeg/9.jpg'],
      selected: false,
      unread: false,
      timestamp: 1375261974000,
      folderId: 2,
    },
    {
      id: 14,
      sender: 'Oluwaseyi Tremble',
      subject: 'Reasonable appearance companions oh',
      date: 'Jul 28',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1373634231000,
      folderId: 3,
    },
  ],
  filteredMailsList: [
    {
      id: 1,
      sender: 'Philip Horbacheuski',
      senderMail: 'philip.horbacheuski@example.com',
      subject: 'Hi, Welcome to Google Mail',
      date: '18:31',
      paperclip: true,
      attachment: true,
      unread: true,
      starred: true,
      folderId: 1,
      selected: false,
      attachments: ['assets/img/jpeg/1.jpg', 'assets/img/jpeg/2.jpg'],
      body: '<p>Projecting surrounded literature ' +
      'yet delightful alteration but bed men. Open are' +
      ' from long why cold. If must snug by upon sang ' +
      'loud left. As me do preference entreaties compliment ' +
      'motionless ye literature. Day behaviour explained law' +
      ' remainder.</p>    <p><strong>On then sake' +
      ' home</strong> is am leaf. Of suspicion do' +
      ' departure at extremely he believing. Do know ' +
      'said mind do rent they oh hope of. General enquire' +
      ' picture letters garrets on offices of no on.</p>' +
      ' <p>All the best,</p> <p>Vitaut the Great, CEO,' +
      ' <br>Fooby Inc.</p>',
    },
    {
      id: 2,
      sender: 'StackExchange',
      subject: 'New Python questions for this week!',
      date: 'Aug 14',
      paperclip: true,
      unread: true,
      starred: false,
      attachment: true,
      timestamp: 1376508566000,
      folderId: 1,
      selected: false,
      attachments: ['assets/img/jpeg/3.jpg'],
      body: '<h1>THIS IS HTML!!!!</h1>',
    },
    {
      id: 3,
      sender: 'notifications@facebook.com',
      senderMail: 'notifications@facebook.com',
      subject: 'Someone just commented on your photo!',
      date: 'Aug 7',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1375877213000,
      folderId: 1,
    },
    {
      id: 4,
      sender: 'Twitter',
      subject: '@hackernews is now following you on Twitter',
      date: 'Jul 31',
      starred: true,
      unread: true,
      selected: false,
      timestamp: 1375261974000,
      folderId: 1,
    },
    {
      id: 5,
      sender: 'LinkedIn',
      subject: 'Jobs you may be interested in',
      date: 'May 12',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1373634231000,
      folderId: 1,
    },
    {
      id: 6,
      sender: 'Naevius Victorsson',
      subject: 'Front no party young abode state up',
      date: 'May 1',
      starred: true,
      unread: false,
      selected: false,
      timestamp: 1373516566000,
      folderId: 1,
    },
    {
      id: 7,
      sender: 'Nikola Foley',
      subject: 'Quiet led own cause three him',
      date: 'Apr 23',
      paperclip: true,
      attachment: true,
      attachments: ['assets/img/jpeg/5.jpg', 'assets/img/jpeg/4.jpg'],
      unread: false,
      starred: false,
      selected: false,
      timestamp: 1374508566000,
      folderId: 1,
    },
    {
      id: 8,
      sender: 'Ernst Hardy',
      subject: 'Raising say express had chiefly detract demands she',
      date: 'Apr 20',
      selected: false,
      unread: false,
      starred: false,
      timestamp: 1373877213000,
      folderId: 1,
    },
  ],
  folders: [
    { name: 'Inbox', order: 0, id: 1, unread: 2 },
    { name: 'Sent Mail', order: 6, id: 2, unread: 0 },
    { name: 'Draft', order: 7, id: 3, unread: 3 },
    { name: 'Trash', order: 8, id: 4, unread: 0 },
  ],
  checkAll: false,
  selectedFolder: 'Inbox',
};

export default function mailsReducer(state = defaultState, action) {
  let index;
  let mail;

  if (action.id) {
    state.filteredMailsList.forEach((val, i) => {
      if (val.id === action.id) {
        index = i;
      }
    });

    mail = state.filteredMailsList[index];
  }
  switch (action.type) {
    case CHANGE_FILTERED_MAILS: {
      let mails = Object.assign([], state.mailsList, {});
      mails = mails.filter((val) => {
        if (action.folderName === 'Starred') {
          return val.starred;
        }
        const selectedFolder = state.folders.filter(
          folder => folder.name === action.folderName,
        );
        return selectedFolder[0].id === val.folderId;
      });

      return Object.assign({}, state, {
        filteredMailsList: mails,
        checkAll: false,
        selectedFolder: action.folderName,
      });
    }
    case TOGGLE_STAR_STATUS: {
      return Object.assign({}, state, {
        filteredMailsList: [
          ...state.filteredMailsList.slice(0, index),
          Object.assign({}, mail, { starred: !mail.starred }),
          ...state.filteredMailsList.slice(index + 1),
        ],
      });
    }
    case SET_READ_STATUS: {
      return Object.assign({}, state, {
        filteredMailsList: [
          ...state.filteredMailsList.slice(0, index),
          Object.assign({}, mail, { unread: action.state }),
          ...state.filteredMailsList.slice(index + 1),
        ],
      });
    }
    case SET_SELECT_STATUS: {
      return Object.assign({}, state, {
        filteredMailsList: [
          ...state.filteredMailsList.slice(0, index),
          Object.assign({}, mail, { selected: action.state }),
          ...state.filteredMailsList.slice(index + 1),
        ],
        checkAll: action.state === false ? false : state.checkAll,
      });
    }
    case DELETE_MAIL: {
      return Object.assign({}, state, {
        filteredMailsList: [
          ...state.filteredMailsList.slice(0, index),
          ...state.filteredMailsList.slice(index + 1),
        ],
      });
    }
    case TOGGLE_ALL_CHECKED: {
      const mails = Object.assign([], state.filteredMailsList, {});
      mails.map(val => (val.selected = action.state)); // eslint-disable-line

      return Object.assign({}, state, {
        filteredMailsList: mails,
        checkAll: action.state,
      });
    }
    default:
      return state;
  }
}
