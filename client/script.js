const chatButton = document.querySelector(".chat-button");
const chatBox = document.querySelector(".chat-box");
const closeButton = document.querySelector(".close-chat");

const sendButton = document.querySelector(".chat-input button");
const input = document.querySelector(".chat-input input");
const messages = document.querySelector(".messages");

const languageSelector =
    document.getElementById("language-selector");


// ========================================
// INITIAL STATE
// ========================================

if (chatBox) {
    chatBox.style.display = "none";
}


// ========================================
// OPEN / CLOSE CHAT
// ========================================

if (chatButton) {

    chatButton.addEventListener("click", () => {

        if (chatBox.style.display === "flex") {

            chatBox.style.display = "none";

        } else {

            chatBox.style.display = "flex";

            if (input) {
                input.focus();
            }

        }

    });

}


if (closeButton) {

    closeButton.addEventListener("click", () => {

        chatBox.style.display = "none";

    });

}


// ========================================
// WELCOME CHAT BUTTON
// ========================================

function openConcierge() {

    if (!chatBox) {
        return;
    }

    chatBox.style.display = "flex";

    if (input) {
        input.focus();
    }

}


// ========================================
// ADD USER MESSAGE
// ========================================

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "user-message";

    const bubble =
        document.createElement("p");

    bubble.textContent = text;

    message.appendChild(bubble);

    messages.appendChild(message);

    scrollToBottom();

}


// ========================================
// ADD BOT MESSAGE
// ========================================

function addBotMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "bot-message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "message-avatar";

    avatar.textContent =
        "🌴";


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    const name =
        document.createElement("span");

    name.className =
        "message-name";

    name.textContent =
        getCurrentTranslation().chatbotName;


    const bubble =
        document.createElement("p");

    bubble.textContent =
        text;


    content.appendChild(name);
    content.appendChild(bubble);

    message.appendChild(avatar);
    message.appendChild(content);

    messages.appendChild(message);

    scrollToBottom();

}


// ========================================
// SCROLL TO BOTTOM
// ========================================

function scrollToBottom() {

    if (!messages) {
        return;
    }

    messages.scrollTop =
        messages.scrollHeight;

}


// ========================================
// SEND MESSAGE
// ========================================

async function sendMessage() {

    if (!input) {
        return;
    }


    const userMessage =
        input.value.trim();


    if (userMessage === "") {
        return;
    }


    // Display guest message
    addUserMessage(userMessage);


    // Clear input
    input.value = "";

    input.focus();


    try {

        const selectedLanguage =
            languageSelector?.value || "English";


const response = await fetch(
    "/api/chat",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: userMessage,
            language: selectedLanguage
        })
    }
);


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        if (data.answer) {

            addBotMessage(
                data.answer
            );

        } else {

            addBotMessage(
                "Sorry, I couldn't get an answer right now."
            );

        }


    } catch (error) {

        console.error(
            "Chat error:",
            error
        );


        addBotMessage(
            "Sorry, I'm having trouble connecting right now."
        );

    }

}


// ========================================
// SEND BUTTON
// ========================================

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );

}


// ========================================
// ENTER KEY
// ========================================

if (input) {

    input.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();

            }

        }
    );

}


// ==========================================================
// SAHARA BEACH WELCOME BACKGROUND
// ==========================================================

const welcomeBackground =
    document.getElementById(
        "welcome-background"
    );


if (welcomeBackground) {

    let currentImage = 1;

    const totalImages = 30;


    function changeBackground() {

        const image =
            document.createElement("div");

        image.className =
            "welcome-bg-image";


        image.style.backgroundImage =
            `url("/images/sahara%20beach%20%20(${currentImage}).jpg")`;


        welcomeBackground.appendChild(
            image
        );


        setTimeout(() => {

            image.classList.add(
                "active"
            );

        }, 50);


        const oldImages =
            welcomeBackground.querySelectorAll(
                ".welcome-bg-image"
            );


        if (oldImages.length > 2) {

            oldImages[0].remove();

        }


        currentImage++;


        if (currentImage > totalImages) {

            currentImage = 1;

        }

    }


    // First image
    changeBackground();


    // Next image every 10 seconds
    setInterval(
        changeBackground,
        10000
    );

}


// ==========================================================
// LANGUAGE TRANSLATIONS
// ==========================================================

const translations = {

    English: {

        welcomeLabel:
            "WELCOME TO SAHARA BEACH",

        titleLine1:
            "Your Mediterranean",

        titleLine2:
            "Escape",

        description:
            "Relax, discover and enjoy an unforgettable stay by the Mediterranean Sea.",

        chatButton:
            "Chat with our Concierge",

        navHome:
            "Home",

        navAbout:
            "About",

        navContact:
            "Contact",

        locationLabel:
            "LOCATION",

        locationValue:
            "Monastir, Tunisia",

        experienceLabel:
            "EXPERIENCE",

        experienceValue:
            "Beach · Relaxation · Hospitality",

        conciergeLabel:
            "CONCIERGE",

        conciergeValue:
            "Available to assist you",

        chatbotName:
            "Sahara Beach Concierge",

        online:
            "● Online",

        welcomeMessage:
            "👋 Welcome to Sahara Beach!<br><br>I'm your AI concierge.<br>How can I help you?",

        placeholder:
            "Ask me anything...",

        poweredBy:
            "AI Concierge"

    },


    French: {

        welcomeLabel:
            "BIENVENUE À SAHARA BEACH",

        titleLine1:
            "Votre escapade",

        titleLine2:
            "méditerranéenne",

        description:
            "Détendez-vous, découvrez et profitez d'un séjour inoubliable au bord de la Méditerranée.",

        chatButton:
            "Parler à notre concierge",

        navHome:
            "Accueil",

        navAbout:
            "À propos",

        navContact:
            "Contact",

        locationLabel:
            "EMPLACEMENT",

        locationValue:
            "Monastir, Tunisie",

        experienceLabel:
            "EXPÉRIENCE",

        experienceValue:
            "Plage · Détente · Hospitalité",

        conciergeLabel:
            "CONCIERGERIE",

        conciergeValue:
            "Disponible pour vous aider",

        chatbotName:
            "Concierge Sahara Beach",

        online:
            "● En ligne",

        welcomeMessage:
            "👋 Bienvenue à Sahara Beach !<br><br>Je suis votre concierge IA.<br>Comment puis-je vous aider ?",

        placeholder:
            "Posez-moi une question...",

        poweredBy:
            "Concierge IA"

    },


    German: {

        welcomeLabel:
            "WILLKOMMEN IM SAHARA BEACH",

        titleLine1:
            "Ihre mediterrane",

        titleLine2:
            "Auszeit",

        description:
            "Entspannen, entdecken und genießen Sie einen unvergesslichen Aufenthalt am Mittelmeer.",

        chatButton:
            "Mit unserem Concierge chatten",

        navHome:
            "Startseite",

        navAbout:
            "Über uns",

        navContact:
            "Kontakt",

        locationLabel:
            "STANDORT",

        locationValue:
            "Monastir, Tunesien",

        experienceLabel:
            "ERLEBNIS",

        experienceValue:
            "Strand · Entspannung · Gastfreundschaft",

        conciergeLabel:
            "CONCIERGE",

        conciergeValue:
            "Wir helfen Ihnen gerne",

        chatbotName:
            "Sahara Beach Concierge",

        online:
            "● Online",

        welcomeMessage:
            "👋 Willkommen im Sahara Beach!<br><br>Ich bin Ihr KI-Concierge.<br>Wie kann ich Ihnen helfen?",

        placeholder:
            "Fragen Sie mich etwas...",

        poweredBy:
            "KI-Concierge"

    },


    Arabic: {

        welcomeLabel:
            "مرحباً بكم في ساحارا بيتش",

        titleLine1:
            "عطلتكم",

        titleLine2:
            "المتوسطية",

        description:
            "استمتعوا بالاسترخاء واكتشفوا جمال البحر الأبيض المتوسط واقضوا إقامة لا تُنسى.",

        chatButton:
            "تحدثوا مع خدمة الكونسيرج",

        navHome:
            "الرئيسية",

        navAbout:
            "من نحن",

        navContact:
            "اتصل بنا",

        locationLabel:
            "الموقع",

        locationValue:
            "المنستير، تونس",

        experienceLabel:
            "التجربة",

        experienceValue:
            "الشاطئ · الاسترخاء · الضيافة",

        conciergeLabel:
            "الكونسيرج",

        conciergeValue:
            "متاح لمساعدتكم",

        chatbotName:
            "كونسيرج ساحارا بيتش",

        online:
            "● متصل",

        welcomeMessage:
            "👋 مرحباً بكم في ساحارا بيتش!<br><br>أنا مساعدكم الذكي.<br>كيف يمكنني مساعدتكم؟",

        placeholder:
            "اسألني أي شيء...",

        poweredBy:
            "الكونسيرج الذكي"

    }

};


// ==========================================================
// GET CURRENT LANGUAGE
// ==========================================================

function getCurrentTranslation() {

    const language =
        languageSelector?.value || "English";

    return (
        translations[language] ||
        translations.English
    );

}


// ==========================================================
// CHANGE PAGE LANGUAGE
// ==========================================================

function changePageLanguage(language) {

    const t =
        translations[language];


    if (!t) {
        return;
    }


    const welcomeLabel =
        document.getElementById(
            "welcome-label"
        );

    const welcomeTitle =
        document.getElementById(
            "welcome-title"
        );

    const welcomeDescription =
        document.getElementById(
            "welcome-description"
        );

    const welcomeChatText =
        document.getElementById(
            "welcome-chat-text"
        );


    if (welcomeLabel) {

        welcomeLabel.textContent =
            t.welcomeLabel;

    }


    if (welcomeTitle) {

        welcomeTitle.innerHTML =
            `${t.titleLine1}<br>${t.titleLine2}`;

    }


    if (welcomeDescription) {

        welcomeDescription.textContent =
            t.description;

    }


    if (welcomeChatText) {

        welcomeChatText.textContent =
            t.chatButton;

    }


    const locationLabel =
        document.getElementById(
            "location-label"
        );

    const locationValue =
        document.getElementById(
            "location-value"
        );


    if (locationLabel) {

        locationLabel.textContent =
            t.locationLabel;

    }


    if (locationValue) {

        locationValue.textContent =
            t.locationValue;

    }


    const experienceLabel =
        document.getElementById(
            "experience-label"
        );

    const experienceValue =
        document.getElementById(
            "experience-value"
        );


    if (experienceLabel) {

        experienceLabel.textContent =
            t.experienceLabel;

    }


    if (experienceValue) {

        experienceValue.textContent =
            t.experienceValue;

    }


    const conciergeLabel =
        document.getElementById(
            "concierge-label"
        );

    const conciergeValue =
        document.getElementById(
            "concierge-value"
        );


    if (conciergeLabel) {

        conciergeLabel.textContent =
            t.conciergeLabel;

    }


    if (conciergeValue) {

        conciergeValue.textContent =
            t.conciergeValue;

    }


    const chatbotName =
        document.getElementById(
            "chatbot-name"
        );

    const messageName =
        document.getElementById(
            "message-name"
        );

    const chatbotStatus =
        document.getElementById(
            "chatbot-status"
        );

    const welcomeMessage =
        document.getElementById(
            "welcome-message"
        );

    const chatInput =
        document.getElementById(
            "chat-input"
        );

    const poweredBy =
        document.getElementById(
            "powered-by"
        );


    if (chatbotName) {

        chatbotName.textContent =
            t.chatbotName;

    }


    if (messageName) {

        messageName.textContent =
            t.chatbotName;

    }


    if (chatbotStatus) {

        chatbotStatus.textContent =
            t.online;

    }


    if (welcomeMessage) {

        welcomeMessage.innerHTML =
            t.welcomeMessage;

    }


    if (chatInput) {

        chatInput.placeholder =
            t.placeholder;

    }


    if (poweredBy) {

        poweredBy.textContent =
            t.poweredBy;

    }


    const navHome =
        document.querySelector(
            '[data-i18n="navHome"]'
        );

    const navAbout =
        document.querySelector(
            '[data-i18n="navAbout"]'
        );

    const navContact =
        document.querySelector(
            '[data-i18n="navContact"]'
        );


    if (navHome) {

        navHome.textContent =
            t.navHome;

    }


    if (navAbout) {

        navAbout.textContent =
            t.navAbout;

    }


    if (navContact) {

        navContact.textContent =
            t.navContact;

    }


    // Arabic direction
    if (language === "Arabic") {

        document.documentElement.dir =
            "rtl";

        document.documentElement.lang =
            "ar";

    } else {

        document.documentElement.dir =
            "ltr";

        document.documentElement.lang =
            language === "French"
                ? "fr"
                : language === "German"
                    ? "de"
                    : "en";

    }

}


// ==========================================================
// LANGUAGE SELECTOR
// ==========================================================

if (languageSelector) {

    languageSelector.addEventListener(
        "change",
        () => {

            changePageLanguage(
                languageSelector.value
            );

        }
    );

}