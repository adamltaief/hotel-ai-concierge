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
// Smooth preloaded slideshow
// ==========================================================

const welcomeBackground =
    document.getElementById("welcome-background");

if (welcomeBackground) {

    let currentImage = 1;
    const totalImages = 30;
    const transitionTime = 2000;
    const displayTime = 10000;

    // Create two background layers
    const layer1 = document.createElement("div");
    const layer2 = document.createElement("div");

    layer1.className = "welcome-bg-image active";
    layer2.className = "welcome-bg-image";

    welcomeBackground.appendChild(layer1);
    welcomeBackground.appendChild(layer2);

    let activeLayer = layer1;
    let inactiveLayer = layer2;

    // Get correct filename
    function getImageUrl(number) {

        // Images 1-14 use .jpg
        if (number <= 14) {
            return `/images/sahara%20beach%20%20(${number}).jpg`;
        }

        // Images 15-30 use .JPG
        return `/images/sahara%20beach%20%20(${number}).JPG`;
    }

    // Preload image
    function preloadImage(number) {

        return new Promise((resolve, reject) => {

            const image = new Image();

            image.onload = () => {
                resolve(image.src);
            };

            image.onerror = () => {
                reject(
                    new Error(
                        `Could not load image ${number}`
                    )
                );
            };

            image.src = getImageUrl(number);

        });

    }

    // Change background
    async function changeBackground() {

        let nextImage = currentImage + 1;

        if (nextImage > totalImages) {
            nextImage = 1;
        }

        try {

            // Wait until next image is completely loaded
            const imageUrl =
                await preloadImage(nextImage);

            // Put image on inactive layer
            inactiveLayer.style.backgroundImage =
                `url("${imageUrl}")`;

            // Fade it in
            inactiveLayer.classList.add("active");

            // Wait for transition
            setTimeout(() => {

                activeLayer.classList.remove("active");

                // Swap layers
                const temp = activeLayer;

                activeLayer = inactiveLayer;
                inactiveLayer = temp;

                currentImage = nextImage;

            }, transitionTime);

        } catch (error) {

            console.error(
                "Background image error:",
                error
            );

            // Try the next image later
            currentImage = nextImage;
        }

    }

    // Load first image
    preloadImage(currentImage)
        .then((imageUrl) => {

            activeLayer.style.backgroundImage =
                `url("${imageUrl}")`;

        })
        .catch((error) => {

            console.error(
                "First background image failed:",
                error
            );

        });

    // Change every 10 seconds
    setInterval(
        changeBackground,
        displayTime
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
            "AI Concierge",

        aboutLabel: "ABOUT SAHARA BEACH",

        aboutTitle:
            "A Mediterranean Escape for Families and Friends",

        aboutText1:
            "Sahara Beach AquaPark Resort is located in Monastir, Tunisia, directly on a beautiful sandy beach overlooking the Mediterranean Sea.",

        aboutText2:
            "Enjoy swimming pools, an AquaPark, restaurants, entertainment, sports activities and relaxing moments for the whole family.",

        featureBeach: "Beach",

        featureAquaPark: "AquaPark",

        featureAllInclusive: "All Inclusive",

        featureEntertainment: "Entertainment",    

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
            "Concierge IA" ,

        aboutLabel: "À PROPOS DE SAHARA BEACH",

        aboutTitle:
            "Une escapade méditerranéenne pour les familles et les amis",

        aboutText1:
            "Le Sahara Beach AquaPark Resort est situé à Monastir, en Tunisie, directement sur une magnifique plage de sable donnant sur la mer Méditerranée.",

        aboutText2:
            "Profitez des piscines, de l'AquaPark, des restaurants, des animations, des activités sportives et de moments de détente pour toute la famille.",

        featureBeach: "Plage",

        featureAquaPark: "AquaPark",

        featureAllInclusive: "Tout compris",

        featureEntertainment: "Animations",            

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
            "KI-Concierge",
     
            aboutLabel: "ÜBER SAHARA BEACH",

            aboutTitle:
                "Eine mediterrane Auszeit für Familien und Freunde",

            aboutText1:
                "Das Sahara Beach AquaPark Resort befindet sich in Monastir, Tunesien, direkt an einem wunderschönen Sandstrand mit Blick auf das Mittelmeer.",

            aboutText2:
                "Genießen Sie Swimmingpools, den AquaPark, Restaurants, Unterhaltung, sportliche Aktivitäten und entspannte Momente für die ganze Familie.",

            featureBeach: "Strand",

            featureAquaPark: "AquaPark",

            featureAllInclusive: "All Inclusive",

            featureEntertainment: "Unterhaltung",

    },


    Arabic: {

        welcomeLabel:
            "مرحباً بكم في صحراء الشاطئ",

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
            "كونسيرج صحراء الشاطئ",

        online:
            "● متصل",

        welcomeMessage:
            "👋 مرحباً بكم في صحراء الشاطئ<br><br>أنا مساعدكم الذكي.<br>كيف يمكنني مساعدتك",

        placeholder:
            "اسألني أي شيء...",

        poweredBy:
            "الكونسيرج الذكي"   ,
        
        aboutLabel: "حول صحارى بيتش",

        aboutTitle:
            "ملاذ متوسطي للعائلات والأصدقاء",

        aboutText1:
            "يقع منتجع صحارى بيتش أكوابارك في المنستير، تونس، مباشرة على شاطئ رملي جميل يطل على البحر الأبيض المتوسط.",

        aboutText2:
            "استمتعوا بمسابح السباحة، والأكوا بارك، والمطاعم، والأنشطة الترفيهية والرياضية، ولحظات من الاسترخاء لجميع أفراد العائلة.",

        featureBeach: "الشاطئ",

        featureAquaPark: "الأكوا بارك",

        featureAllInclusive: "شامل الإقامة",

        featureEntertainment: "الترفيه",

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
        // ==========================================================
// ABOUT SECTION TRANSLATION
// ==========================================================

const aboutLabel =
    document.querySelector('[data-i18n="aboutLabel"]');

const aboutTitle =
    document.querySelector('[data-i18n="aboutTitle"]');

const aboutText1 =
    document.querySelector('[data-i18n="aboutText1"]');

const aboutText2 =
    document.querySelector('[data-i18n="aboutText2"]');

const featureBeach =
    document.querySelector('[data-i18n="featureBeach"]');

const featureAquaPark =
    document.querySelector('[data-i18n="featureAquaPark"]');

const featureAllInclusive =
    document.querySelector('[data-i18n="featureAllInclusive"]');

const featureEntertainment =
    document.querySelector('[data-i18n="featureEntertainment"]');


    if (aboutLabel) {
        aboutLabel.textContent = t.aboutLabel;
    }

    if (aboutTitle) {
        aboutTitle.textContent = t.aboutTitle;
    }

    if (aboutText1) {
        aboutText1.textContent = t.aboutText1;
    }

    if (aboutText2) {
        aboutText2.textContent = t.aboutText2;
    }

    if (featureBeach) {
        featureBeach.textContent = t.featureBeach;
    }

    if (featureAquaPark) {
        featureAquaPark.textContent = t.featureAquaPark;
    }

    if (featureAllInclusive) {
        featureAllInclusive.textContent = t.featureAllInclusive;
    }

    if (featureEntertainment) {
        featureEntertainment.textContent = t.featureEntertainment;
    }


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