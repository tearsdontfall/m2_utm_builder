// Конфигурация UTM-конструктора. Правится вручную.
window.UTM_CONFIG = {
    // Разрешённые e-mail. Пустой список [] = проверка отключена.
    allowedUsers: [
        "knolss",
        "litvinovpo",
        "petrovpd"
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
                { label: "Яндекс", macros: "yandex", utm_source: "digital_media_yandex", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "VK Ads", macros: "vk", utm_source: "digital_media_vk_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
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
                { label: "Яндекс Промостраницы", macros: "yandex_promopages", utm_source: "digital_media_yandex.promopages", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
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
                { label: "Яндекс", macros: "yandex", utm_source: "performance_yandex", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS Ads", utm_source: "performance_mts_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS Telegram", utm_source: "performance_mtsads_tg_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Avito", utm_source: "performance_avito", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "MTS sms", utm_source: "performance_mtsads_sms", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "VK Ads", macros: "vk", utm_source: "performance_vk_ads", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
                { label: "Яндекс Промостраницы", macros: "yandex_promopages", utm_source: "performance_yandex.promopages", utm_medium: ["cpc", "cpm", "cpt", "cpa"], fixed: {} },
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

    // Рекламные макросы для Медийной рекламы и Performance (option.macros -> ключ ниже).
    // Подставляются в ссылку вместо utm_campaign / utm_content / utm_term, остальное — стандартная сборка.
    macroTemplates: {
        vk: "&utm_campaign={{ad_plan_name}}:{{ad_plan_id}}&utm_content=grid:{{campaign_id}}:grname:{{campaign_name}}:adid:{{banner_id}}:region:{{geo}}&utm_term={{search_phrase}}",
        yandex: "&utm_campaign={campaign_name}:{campaign_id}&utm_content=campid:{campaign_id}:grid:{gbid}:adid:{ad_id}:phrasid:{phrase_id}:{creative_id}:source:{source}:region:{region_name}:yclid:{yclid}&utm_term={keyword}",
        yandex_promopages: "&utm_campaign={campaign_name}:{campaign_id}&utm_content=campid:{campaign_id}:pubtype:{publication_type}:pubid:{id}:interest:{interest}:{title}:region:{region_name}:logid:{logid}:idfa:{idfa}:gaid:{gaid}&utm_term={keyword}"
    },

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

    // Словарь сущностей utm_campaign: label — что видит пользователь, value — код в метке.
    // Источник: UTM-Таблица.xlsx (столбцы A–C; регионы — вкладка «Регионы»)
    dictionaries: {
        "agency": [
            { label: "MediaGuru", value: "mg" },
            { label: "inhouse", value: "inhouse" }
        ],
        "campaign_type": [
            { label: "Брендовая", value: "brand" },
            { label: "Небрендовая", value: "nobrand" },
            { label: "Конкурентная", value: "compet" }
        ],
        "funnel_stage": [
            { label: "Знание", value: "znanie" },
            { label: "Рассмотрение", value: "rassmotr" },
            { label: "Конверсия", value: "convers" },
            { label: "Доверие", value: "doverie" }
        ],
        "product": [
            { label: "Сделка", value: "sdelka" },
            { label: "Сделка Юрлиц", value: "sdelka-yurlic" },
            { label: "Сделка дистанционная", value: "sdelka-distant" },
            { label: "Защита сделки", value: "guaranteed-deal" },
            { label: "Проверка недвижимости (бесплатная)", value: "guaranteed-deal-free" },
            { label: "Ипотека", value: "ipoteka" },
            { label: "Новостройки", value: "novostroyki" },
            { label: "М2Про Новостройки", value: "m2-pro" },
            { label: "Личный кабинет", value: "lk" },
            { label: "Свой Дом", value: "svoy-dom" },
            { label: "Приложение", value: "app" },
            { label: "Электронная регистрация", value: "elreg" },
            { label: "Все сервисы B2B", value: "all-b2b" },
            { label: "СБР", value: "sbr" },
            { label: "ИЖС", value: "izhs" },
            { label: "Ивент", value: "event" },
            { label: "M2Media", value: "m2media" },
            { label: "Продвижение контента соц. сетей", value: "paid-post" },
            { label: "Продвижение пабликов", value: "paid-public" },
            { label: "Общий Бренд", value: "brand" },
            { label: "Юридическая консультация", value: "legal-advice" },
            { label: "M2 Подписка", value: "m2-subscription" },
            { label: "Клуб риелторов", value: "m2-rieltor-club" },
            { label: "Юридическая проверка недвижимости", value: "legal-check" },
            { label: "Экспресс проверка", value: "express-legal-check" },
            { label: "Сегментные РК", value: "scp" }
        ],
        "target_audience": [
            { label: "Физические лица", value: "b2c" },
            { label: "АНЧ", value: "b2b" },
            { label: "Банки", value: "b2b-bank" },
            { label: "Застройщики", value: "b2b-develop" },
            { label: "Юридические лица", value: "b2b-yurl" },
            { label: "Общая ЦА", value: "general" },
            { label: "ФЛ инициатор сделки", value: "b2c-fl-initiator" },
            { label: "ФЛ приглашенный продавец", value: "b2c-fl-seller" },
            { label: "ФЛ приглашенный покупатель", value: "b2c-fl-buyer" },
            { label: "ФЛ лид", value: "b2c-fl-lead" },
            { label: "ЧР", value: "b2b-chr" },
            { label: "ЧР лид", value: "b2b-chr-lead" },
            { label: "АН Сотрудник агентства", value: "b2b-an-worker" },
            { label: "АН Суперпользователь", value: "b2b-an-superuser" },
            { label: "АН лид", value: "b2b-an-lead" }
        ],
        "sub_type": [
            { label: "Поисковые", value: "search" },
            { label: "Кампании в РСЯ", value: "network" },
            { label: "Медийные", value: "media" },
            { label: "Мастер-кампании", value: "master" },
            { label: "Сети + Поиск", value: "epk-all" },
            { label: "Телеграмм Яндекса", value: "epk-tg" },
            { label: "Таргетированная", value: "target" },
            { label: "Внутренние коммуникации", value: "internal" },
            { label: "Внешние коммуникации", value: "external" },
            { label: "Лидформы", value: "leadforms" }
        ],
        "region": [
            { label: "Москва и МО", value: "msk" },
            { label: "Санкт-Петербург и ЛО", value: "spb" },
            { label: "Россия", value: "rus" },
            { label: "Республика Татарстан", value: "rt" },
            { label: "Новосибирская область", value: "nvsbo" },
            { label: "Тюменская область", value: "to" },
            { label: "Ростовская область", value: "ro" },
            { label: "Воронежская область", value: "vo" },
            { label: "Краснодарский Край", value: "kk" },
            { label: "Челябинская область", value: "che" },
            { label: "Республика Башкортостан", value: "rbash" },
            { label: "Иркутская область", value: "io" },
            { label: "Нижегородская область", value: "nino" },
            { label: "Красноярский Край", value: "krsnkr" },
            { label: "Свердловская область", value: "svrdo" },
            { label: "Самарская область", value: "smro" },
            { label: "Волгоградская область", value: "vlgo" },
            { label: "Республика Адыгея", value: "rady" },
            { label: "Республика Алтай", value: "ralt" },
            { label: "Республика Бурятия", value: "rbury" },
            { label: "Республика Дагестан", value: "rdag" },
            { label: "Республика Ингушетия", value: "ring" },
            { label: "Кабардино-Балкарская Республика", value: "rkabar" },
            { label: "Республика Калмыкия", value: "rkalmy" },
            { label: "Карачаево-Черкесская Республика", value: "rkarac" },
            { label: "Республика Карелия", value: "rkarel" },
            { label: "Республика Коми", value: "rkomi" },
            { label: "Республика Марий Эл", value: "rmariy" },
            { label: "Республика Мордовия", value: "rmord" },
            { label: "Республика Саха (Якутия)", value: "ryakut" },
            { label: "Республика Северная Осетия — Алания", value: "roset" },
            { label: "Республика Тыва", value: "rtyva" },
            { label: "Удмуртская Республика", value: "rudmur" },
            { label: "Республика Хакасия", value: "rhakas" },
            { label: "Чеченская Республика", value: "rchech" },
            { label: "Чувашская Республика — Чувашия", value: "rchuva" },
            { label: "Алтайский край", value: "altay" },
            { label: "Амурская область", value: "amurs" },
            { label: "Архангельская область", value: "arkha" },
            { label: "Астраханская область", value: "astra" },
            { label: "Белгородская область", value: "belgo" },
            { label: "Брянская область", value: "bryan" },
            { label: "Владимирская область", value: "vladi" },
            { label: "Вологодская область", value: "volog" },
            { label: "Ивановская область", value: "ivano" },
            { label: "Калининградская область", value: "kalin" },
            { label: "Калужская область", value: "kaluz" },
            { label: "Камчатский край", value: "kamch" },
            { label: "Кемеровская область — Кузбасс", value: "kemer" },
            { label: "Кировская область", value: "kirov" },
            { label: "Костромская область", value: "kostr" },
            { label: "Курганская область", value: "kurga" },
            { label: "Курская область", value: "kursk" },
            { label: "Липецкая область", value: "lipe" },
            { label: "Магаданская область", value: "magad" },
            { label: "Мурманская область", value: "murma" },
            { label: "Новгородская область", value: "novgo" },
            { label: "Омская область", value: "omska" },
            { label: "Оренбургская область", value: "orenb" },
            { label: "Орловская область", value: "orlov" },
            { label: "Пензенская область", value: "penze" },
            { label: "Пермский край", value: "perms" },
            { label: "Псковская область", value: "pskov" },
            { label: "Рязанская область", value: "ryaza" },
            { label: "Саратовская область", value: "sarat" },
            { label: "Сахалинская область", value: "sakha" },
            { label: "Смоленская область", value: "smole" },
            { label: "Тамбовская область", value: "tambo" },
            { label: "Тверская область", value: "tvers" },
            { label: "Томская область", value: "tomska" },
            { label: "Тульская область", value: "tulsk" },
            { label: "Ульяновская область", value: "ulyan" },
            { label: "Приморский край", value: "primo" },
            { label: "Ставропольский край", value: "stavr" },
            { label: "Хабаровский край", value: "habar" },
            { label: "Забайкальский край", value: "zabay" },
            { label: "Ханты-Мансийский автономный округ — Югра", value: "hanty" },
            { label: "Чукотский автономный округ", value: "chuko" },
            { label: "Ямало-Ненецкий автономный округ", value: "yamna" },
            { label: "Еврейская автономная область", value: "evrey" },
            { label: "Севастополь", value: "sevast" },
            { label: "Республика Крым", value: "crimea" },
            { label: "Донецкая Народная Республика (ДНР)", value: "dnr" },
            { label: "Луганская Народная Республика (ЛНР)", value: "lnr" },
            { label: "Запорожская область", value: "zaporzh" },
            { label: "Херсонская область", value: "herson" },
            { label: "Несколько регионов", value: "multireg" },
            { label: "Москва и МО + СПБ и ЛО", value: "capitals" },
            { label: "Вся РФ исключая МСК и СПБ", value: "non-capitals" }
        ],
        "event": [],
        "device": [
            { label: "Мобильные устройства", value: "mobile" },
            { label: "ПК", value: "desktop" }
        ],
        "placements": [
            { label: "Поисковый ретаргетинг (Яндекс)", value: "rlsa" },
            { label: "Ретаргетинг (Яндекс РСЯ, ВК)", value: "retarget" },
            { label: "Смартбаннеры (Яндекс)", value: "smb" },
            { label: "Баннер на поиске (Яндекс)", value: "mkb" },
            { label: "РМП (Яндекс)", value: "rmp" },
            { label: "Динамические объявления (Яндекс)", value: "dsa" },
            { label: "Интересы (ВК)", value: "interes" },
            { label: "Ключи (ВК)", value: "context" },
            { label: "Look-alike (ВК)", value: "lal" },
            { label: "Парсинг (ВК)", value: "parsing" },
            { label: "Группы (ВК)", value: "groups" },
            { label: "Каналы (Телеграм)", value: "channels" },
            { label: "База (ВК)", value: "baza" },
            { label: "Чатбот", value: "chatbot" }
        ],
        "ad_type": [
            { label: "Универсальное объявление", value: "banner" },
            { label: "Универсальное объявление с видео", value: "banner_video" },
            { label: "Видео", value: "video" },
            { label: "Карусель", value: "carusel" },
            { label: "(CRM) продуктовые коммуникации по CJM", value: "product_notifications" },
            { label: "(CRM) коммуникации по скидкам/акциям", value: "promo" },
            { label: "(CRM) коммуникации о положительных изменениях в продукте/ рынке", value: "news" },
            { label: "(CRM) коммуникации по информированию клиентов", value: "info" },
            { label: "(CRM) опросы", value: "survey" },
            { label: "(CRM) коммуникации по онбордингу после регистрации", value: "welcome" }
        ],
        "flight": [],
        "creative_pack": []
    }
};
