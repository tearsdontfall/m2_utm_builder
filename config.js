// Конфигурация UTM-конструктора. Правится вручную.
window.UTM_CONFIG = {
    // Разрешённые e-mail. Пустой список [] = проверка отключена.
    allowedUsers: [
        "knolss"
    ],

    // ───────────── Потоки разметки (вкладка new_entities) ─────────────
    // Пользователь выбирает direction -> затем option (вопрос задаётся в question).
    // У option:
    //   label       — что видит пользователь в списке
    //   utm_source  — строка (подставится автоматом) или массив (пользователь выберет)
    //   utm_medium  — строка (подставится автоматом) или массив (пользователь выберет)
    //   fixed       — фиксированные сущности utm_campaign: предзаполняются и блокируются
    //                 (ключи: agency, campaign_type, sub_type и любые другие из campaignParts)
    // mediumLabel — подпись выбора utm_medium, если medium выбирается списком (по умолчанию "utm_medium")
    flows: [
        {
            direction: "Медийная реклама",
            question: "Площадка",
            options: [
                { label: "Яндекс", utm_source: "digital_media_yandex", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "VK Ads", utm_source: "digital_media_vk_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Redlama", utm_source: "digital_media_redlama", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Onetarget", utm_source: "digital_media_onetarget", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Telegram Ads", utm_source: "digital_media_tg-ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS DSP", utm_source: "digital_media_mts-dsp", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Avito", utm_source: "digital_media_avito", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "OTM", utm_source: "digital_media_otm", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Get Ads", utm_source: "digital_media_getads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "T-J", utm_source: "digital_media_t-j", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Astralab", utm_source: "digital_media_astralab", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "IVI", utm_source: "digital_media_ivi", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Яндекс Промостраницы", utm_source: "digital_media_yandex.promopages", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Urban Ads", utm_source: "digital_media_urban-ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Adspector", utm_source: "digital_media_adspector", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Rutube", utm_source: "digital_media_rutube", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Soloway", utm_source: "digital_media_soloway", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Hybrid", utm_source: "digital_media_hybrid", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Т-Банк сеть", utm_source: "digital_media_tbank-network", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Т-Банк", utm_source: "digital_media_tbank", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MediaSniper", utm_source: "digital_media_mediasniper", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
            ]
        },
        {
            direction: "Performance",
            question: "Площадка",
            options: [
                { label: "Яндекс", utm_source: "performance_yandex", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS Ads", utm_source: "performance_mts_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS Telegram", utm_source: "performance_mtsads_tg_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Avito", utm_source: "performance_avito", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS sms", utm_source: "performance_mtsads_sms", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "VK Ads", utm_source: "performance_vk_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Яндекс Промостраницы", utm_source: "performance_yandex.promopages", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Telegram Ads", utm_source: "performance_tg_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Astralab", utm_source: "performance_astralab", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
            ]
        },
        {
            direction: "SMM",
            question: "Площадка",
            options: [
                { label: "VK", utm_source: "vkontakte", utm_medium: "social", fixed: {} },
                { label: "OK", utm_source: "ok", utm_medium: "social", fixed: {} },
                { label: "Дзен", utm_source: "dzen", utm_medium: "social", fixed: {} },
                { label: "MAX", utm_source: "max", utm_medium: "social", fixed: {} },
                { label: "Telegram", utm_source: "telegram", utm_medium: "social", fixed: {} },
            ]
        },
        {
            direction: "Ивенты",
            question: "Где размещается",
            options: [
                { label: "Презентация", utm_source: "event", utm_medium: "presentation", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "Раздатка", utm_source: "event", utm_medium: "listovka", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "VTB",
            question: "Где размещается",
            options: [
                { label: "Email", utm_source: "vtb", utm_medium: "email", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "SMS", utm_source: "vtb", utm_medium: "sms", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "Раздатка", utm_source: "vtb", utm_medium: "listovka", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "PR",
            question: "Где размещается",
            options: [
                { label: "Статья", utm_source: "pr", utm_medium: "article", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "Печатка",
            question: "Где размещается",
            options: [
                { label: "Раздатка", utm_source: "print", utm_medium: "listovka", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "Продажи",
            question: "Где размещается",
            options: [
                { label: "Презентация", utm_source: "sales", utm_medium: "presentation", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "Сообщение", utm_source: "sales", utm_medium: "message", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "Отзывы",
            question: "Где размещается",
            options: [
                { label: "Сайты", utm_source: "reviews", utm_medium: "site", fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
        {
            direction: "CRM",
            question: "Тип рассылки",
            mediumLabel: "Где размещается",
            options: [
                { label: "Массовая", utm_source: "m2_crm_manual", utm_medium: ["email", "sms", "push"], fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "Триггер", utm_source: "m2_crm_trigger", utm_medium: ["email", "sms", "push"], fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
                { label: "Промо", utm_source: "m2_crm_promo", utm_medium: ["email", "sms", "push"], fixed: {"agency": "inhouse", "campaign_type": "brand", "sub_type": "internal"} },
            ]
        },
    ],

    // Порядок полей в utm_campaign (обязательные идут первыми, затем необязательные)
    campaignParts: [
        "agency", "campaign_type", "funnel_stage", "product",
        "target_audience", "sub_type", "region",
        "event", "device", "placements", "ad_type",
        "flight", "creative_pack", "free_text"
    ],

    // Обязательные сущности utm_campaign. Остальные из campaignParts — необязательные
    required: [
        "agency", "campaign_type", "funnel_stage", "product",
        "target_audience", "sub_type"
    ],

    // Названия сущностей utm_campaign в форме
    labels: {
        agency: "Агенство",
        campaign_type: "Тип рекламной кампании",
        funnel_stage: "Этап воронки",
        product: "Продукт",
        target_audience: "ЦА",
        sub_type: "Подтип рекламной кампании",
        region: "Регион",
        event: "Мероприятие",
        device: "Тип устройства",
        placements: "Плейсмент",
        ad_type: "Тип креатива",
        flight: "Флайт",
        creative_pack: "Пак креативов",
        free_text: "Свободная приписка"
    },

    // Необязательные utm-метки (отдельный раскрывающийся блок)
    extraUtms: ["utm_content", "utm_term"],

    // Поля со свободным вводом (без выпадающего списка)
    freeText: ["utm_term", "utm_content", "flight", "creative_pack", "free_text"],

    // Префиксы в utm_campaign
    prefixes: {
        region: "region",
        flight: "flight",
        event: "event",
        creative_pack: "pack"
    },

    // Словарь сущностей utm_campaign (вкладка «словарь сущностей»)
    dictionaries: {
        "agency": [
                "artox",
                "mg",
                "icom",
                "inhouse"
        ],
        "campaign_type": [
                "brand",
                "nobrand",
                "compet"
        ],
        "funnel_stage": [
                "znanie",
                "rassmotr",
                "convers",
                "doverie"
        ],
        "product": [
                "sdelka",
                "sdelka-yurlic",
                "sdelka-distant",
                "guaranteed-deal",
                "guaranteed-deal-free",
                "ipoteka",
                "classified",
                "novostroyki",
                "m2-pro",
                "lk",
                "svoy-dom",
                "app",
                "elreg",
                "all-b2b",
                "sbr",
                "izhs",
                "event",
                "post",
                "public",
                "brand",
                "m2media",
                "legal-advice",
                "m2-rieltor-club",
                "m2-subscription",
                "legal-check",
                "express-legal-check",
                "scp"
        ],
        "target_audience": [
                "b2c",
                "b2b",
                "b2b-bank",
                "b2b-develop",
                "b2b-yurl",
                "general",
                "b2c-fl-initiator",
                "b2c-fl-seller",
                "b2c-fl-buyer",
                "b2c-fl-lead",
                "b2b-chr",
                "b2b-chr-lead",
                "b2b-an-worker",
                "b2b-an-superuser",
                "b2b-an-lead"
        ],
        "sub_type": [
                "search",
                "network",
                "media",
                "internal",
                "external",
                "master",
                "epk-all",
                "epk-tg",
                "target",
                "leadforms",
                "dooh"
        ],
        "region": [
                "msk",
                "spb",
                "rus",
                "rt",
                "nvsbo",
                "to",
                "ro",
                "vo",
                "kk",
                "che",
                "rbash",
                "io",
                "nino",
                "krsnkr",
                "svrdo",
                "smro",
                "vlgo",
                "rady",
                "ralt",
                "rbury",
                "rdag",
                "ring",
                "rkabar",
                "rkalmy",
                "rkarac",
                "rkarel",
                "rkomi",
                "rmariy",
                "rmord",
                "ryakut",
                "roset",
                "rtyva",
                "rudmur",
                "rhakas",
                "rchech",
                "rchuva",
                "altay",
                "amurs",
                "arkha",
                "astra",
                "belgo",
                "bryan",
                "vladi",
                "volog",
                "ivano",
                "kalin",
                "kaluz",
                "kamch",
                "kemer",
                "kirov",
                "kostr",
                "kurga",
                "kursk",
                "lipe",
                "magad",
                "murma",
                "novgo",
                "omska",
                "orenb",
                "orlov",
                "penze",
                "perms",
                "pskov",
                "ryaza",
                "sarat",
                "sakha",
                "smole",
                "tambo",
                "tvers",
                "tomska",
                "tulsk",
                "ulyan",
                "primo",
                "stavr",
                "habar",
                "zabay",
                "hanty",
                "chuko",
                "yamna",
                "evrey",
                "sevast",
                "crimea",
                "dnr",
                "lnr",
                "zaporzh",
                "herson",
                "multireg",
                "capitals",
                "non-capitals"
        ],
        "event": [
                "mzhk",
                "vkvadrate",
                "vzhk",
                "other",
                "forum_stroit"
        ],
        "device": [
                "mobile",
                "desktop"
        ],
        "placements": [
                "rlsa",
                "retarget",
                "smb",
                "mkb",
                "rmp",
                "dsa",
                "interes",
                "context",
                "lal",
                "parsing",
                "groups",
                "baza",
                "channels",
                "chatbot",
                "tg_message",
                "wa_message"
        ],
        "ad_type": [
                "banner",
                "banner_video",
                "video",
                "carusel",
                "product_notifications",
                "promo",
                "news",
                "info",
                "survey",
                "welcome"
        ],
        "flight": [],
        "creative_pack": []
    }
};
