// Make sure membersData is attached to the window object in order to make this data globally accessible throughout the application and work with the admin.js
window.membersData = [
    {
        "name": "Ishgard Fan",
        "button": "https://file.garden/Z9QftvoosGBApv5F/ishgardfan/ishgard_fan_88_01.gif",
        "url": "https://ishgard.fan/", // MAKE SURE YOU LEAVE THE TRAILING SLASH, this way the members can put their widget on any page and the script will still recognize them
        "description": "Canon x OC FFXIV fansite. I love Haurchefant & Fray! Mature content with ample warnings.",
        "game": "FFXIV, FFV"
    },
    {
        "name": "Snow Valley",
        "button": "https://snowvalley.online/assets/sitebuttons/snvl88.png",
        "url": "https://snowvalley.online", 
        "description": "Personal site run by an adult with some mature themes~",
        "game": "FFIX, FFXIV Online"
    },
    {
        "name": "permanently blurry",
        "button": "https://permanentlyblurry.neocities.org/button-88x31.png",
        "url": "http://permanentlyblurry.neocities.org", 
        "description": "A hub of websites about video games, Shakespeare, and storytelling.",
        "game": "FFIX"
    },
    {
        "name": "littlelum",
        "button": "https://littlelum.neocities.org/images/global/lumbutton.webp",
        "url": "http://littlelum.neocities.org", 
        "description": "A personal site where I talk about whatever. Topics range from gaming, my faith, the internet, life, and whatever else pops into my head.",
        "game": "FFVII, Tactics, FFV"
    },
    {
        "name": "dbnet18",
        "button": "",
        "url": "https://dbnet18.neocities.org/", 
        "description": "It's mostly a landing page for my music content plus some personal blogs and business related things",
        "game": "FFVI, FFX, FFXIV Online"
    },
    // ... (continue this pattern for other entries)
];

// Replace YourComponent with whatever you want your webring component to be named
class WOLRing extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Define default styles for the widget. If you change these classes, remember to change all instances of the script referencing them as well.
        this.defaultStyles = `
        .widget-container {     
            margin: 0.3em;           
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .button-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .prev-button,
        .next-button,
        .random-button {                
            border: none;                
            cursor: pointer; 
            background-color: transparent;
            padding: 0.2em;                                            
        }         

        .random-button {
            font-family: inherit;
            font-size: inherit;
            color: inherit;
        }

        .icon {
            padding: 0 0.5em;
        }
    `;                    
}
    connectedCallback() {
        const widgetContainer = document.createElement('div');
        widgetContainer.classList.add('widget-container');

        const fetchData = () => {
            const iconType = this.getAttribute('icon') || 'default';
            let currentIndex;

            // Use embedded JSON data directly
            const data = window.membersData;

            currentIndex = this.getIndexFromURL(data, window.location.href);

            if (currentIndex !== -1) {
                const member = data[currentIndex];

                // Creating the previous link
                const prevLink = document.createElement('a');
                prevLink.classList.add('prev-button');
                prevLink.href = data[currentIndex === 0 ? data.length - 1 : currentIndex - 1].url;
                const prevArrowImage = document.createElement('img');
                prevArrowImage.src = this.getArrowImageSrc('prev', iconType);
                prevLink.appendChild(prevArrowImage);

                // Creating the next link
                const nextLink = document.createElement('a');
                nextLink.classList.add('next-button');
                nextLink.href = data[(currentIndex + 1) % data.length].url;
                const nextArrowImage = document.createElement('img');
                nextArrowImage.src = this.getArrowImageSrc('next', iconType);
                nextLink.appendChild(nextArrowImage);

                // Create random button
                const randomLink = document.createElement('a');
                randomLink.classList.add('random-button');
                randomLink.textContent = 'Random';

                // Create and style icon
                const iconLink = document.createElement('a');
                iconLink.href = 'https://ishgard.fan/webring/'; // Add your webring homepage URL here
                iconLink.title = 'Webring of Light';
                const buttonImage = document.createElement('img');
                buttonImage.src = this.getIconSrc(iconType);
                buttonImage.classList.add('icon', `icon-${iconType}`);
                iconLink.appendChild(buttonImage);

                // Create a div for buttons (prev, next, icon)
                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-container');
                buttonDiv.appendChild(prevLink);
                buttonDiv.appendChild(iconLink);
                buttonDiv.appendChild(nextLink);

                // Handle the previous, next, and random link clicks
                prevLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = event.currentTarget.href;
                });

                nextLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = event.currentTarget.href;
                });

                randomLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const randomWebsite = data[randomIndex];
                    window.location.href = randomWebsite.url;
                });

                // Create a div for the random button
                const randomDiv = document.createElement('div');
                randomDiv.appendChild(randomLink);

                // Append placeholders to the widget container
                widgetContainer.appendChild(buttonDiv);
                widgetContainer.appendChild(randomDiv);
              
                this.shadowRoot.appendChild(widgetContainer);
              
                const style = document.createElement('style');
                style.textContent = this.defaultStyles;
                this.shadowRoot.appendChild(style);
            } else {
                const pendingMessage = document.createElement('p');
                pendingMessage.textContent = "This user's application is pending."; // Your pending message here
                this.shadowRoot.appendChild(pendingMessage);
            }
        };

        fetchData();
    }
    getIndexFromURL(data, currentURL) {
        return data.findIndex(member => currentURL.includes(member.url));
    }
    getIconSrc(iconType) {
        // Define mapping for different icon types
        const iconMap = {
            default: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/original.png', // Link to your default icon, should not be a relative link
            ffv: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/ffv.gif',
            ffv2: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/ffv.png',
            melodic: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/melodic.gif',
            melodic2: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/melodic.png',
            ffvii: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/cloud.gif',
            ffvii2: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/cloud.png',
            chocobo: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/chocobo.gif',
            chocobo2: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/chocobo2.gif',
            minfilia: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/minfilia.png',
            tataru: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/tataru.png',
            yshtola: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/yshtola.png',
            alisaie: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/alisaie.png',
            yugiri: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/yugiri.png',
            lyse: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/lyse.png',
            krile: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/krile.png',
            sadu: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/sadu.png',
            zero: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/zero.png',
        };
      
        return iconMap[iconType] || iconMap.default;
    }

    getArrowImageSrc(direction, iconType) {
        // Define arrow image sources
        const arrowImageMap = {
            prev: {
                default: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/left.png', // Your link here
            },
            next: {
                default: 'https://file.garden/Z9QftvoosGBApv5F/ishgardfan/WOLRING/right.png', // Your link here
            },
        };

        // Return the arrow image source based on the direction and iconType
        return arrowImageMap[direction][iconType] || arrowImageMap[direction]['default'];
    }
}

// Define your web component here, should match the name from earlier and semantically follow this naming convention
window.customElements.define('wol-ring', WOLRing);