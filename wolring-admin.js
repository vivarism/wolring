// Check for dead links using allOrigins API (https://allorigins.win/) to bypass CORS restrictions 
function checkDeadLinks(data) {
  data.forEach((member, index) => {
    setTimeout(() => {
      fetch(`https://corsfix.com/?url=${encodeURIComponent(member.url)}`)
        .then(response => {
          if (!response.ok || !response.url.includes(new URL(member.url).hostname)) {
            handleDeadLink(member.url);
          }
        })
        .catch(error => {
          console.error('Error checking link:', error.message);
          handleDeadLink(member.url);
        });
    }, index * 300); // 300ms between each request
  });
}

function handleDeadLink(deadURL) {
  console.log(`Dead link detected: ${deadURL}`);
}

// Start checking dead links using the provided JSON data
checkDeadLinks(window.membersData);

// Add members to list from JSON file
const data = window.membersData;
const totalEntries = data.length; // Total entries from JSON

// Update the HTML element to display the member count. Include <div id="memberCount"></div> wherever you want this to show up.
const memberCountElement = document.querySelector('#memberCount');
if (memberCountElement) {
  memberCountElement.innerHTML = `${totalEntries}`;
}

// Create member entries in HTML. Use <div class="member-box"></div> wherever you want this to show up. You only need to list it once.
function createMemberBox(member) {
  const memberBox = document.createElement('div');
  memberBox.classList.add('member-box');

  function getFieldValue(field) {
    const fieldValue = member[field];

    switch (field) {
      case 'name':
        return fieldValue ? `${fieldValue}` : 'Name'; // Default placeholder text
        case 'button':
          return fieldValue ? `${fieldValue}` : 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/nobanner.png';
      default:
        const formattedFieldName = field.replace(/([A-Z])/g, ' $1').trim();
        return fieldValue ? `${fieldValue}` : formattedFieldName.charAt(0).toUpperCase() + formattedFieldName.slice(1);
    }
  }

  memberBox.innerHTML = `
    <div class="field field--name">${getFieldValue('name')}</div>        
    <div class="field field--button"><a href="${getFieldValue('url')}"><img src="${getFieldValue('button')}" /></a></div>
    <div class="field field--description">${getFieldValue('description')}</div>
    <div class="field field--game"><u>Favourite Game</u>: <span>${getFieldValue('game')}</span></div>
  `;

  return memberBox;
}