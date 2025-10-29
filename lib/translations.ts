// Comprehensive translation system for emergency response app

export type LanguageCode = "en" | "hi" | "es" | "fr" | "pt" | "de" | "ja" | "zh" | "ar" | "ru"

export interface LanguageConfig {
  code: LanguageCode
  name: string
  nativeName: string
  direction: "ltr" | "rtl"
  region?: string
}

export const SUPPORTED_LANGUAGES: Record<LanguageCode, LanguageConfig> = {
  en: { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  hi: { code: "hi", name: "Hindi", nativeName: "हिंदी", direction: "ltr" },
  es: { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  fr: { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  pt: { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr" },
  de: { code: "de", name: "German", nativeName: "Deutsch", direction: "ltr" },
  ja: { code: "ja", name: "Japanese", nativeName: "日本語", direction: "ltr" },
  zh: { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" },
  ar: { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  ru: { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr" },
}

export interface Translations {
  // Header
  appTitle: string
  appSubtitle: string

  // Emergency Reporter
  describeEmergency: string
  recordingInstructions: string
  startRecording: string
  stopRecording: string
  processing: string
  detectingLocation: string
  locationDetected: string
  locationUnavailable: string
  enableGPS: string
  accuracy: string

  // Map
  emergencyResponseMap: string
  yourLocation: string
  dispatchedUnit: string
  nearbyUnits: string
  eta: string
  zoomIn: string
  zoomOut: string
  centerOnLocation: string

  // Results
  emergencyAnalysis: string
  dispatchedUnitInfo: string
  unitID: string
  unitType: string
  distance: string
  analysisConfidence: string
  riskFactors: string
  recommendations: string
  requiredUnits: string
  responseMetrics: string
  estimatedCasualties: string
  manualReviewRequired: string
  dispatcherWillContact: string

  // Status Messages
  waitingForLocation: string
  reportEmergency: string
  processingEmergency: string
  emergencySubmitted: string
  errorOccurred: string
  tryAgain: string

  // Common
  cancel: string
  submit: string
  close: string
  loading: string
  error: string
  success: string
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    appTitle: "Emergency Response",
    appSubtitle: "Voice-Powered Emergency Dispatch",
    describeEmergency: "Describe your emergency in English",
    recordingInstructions:
      "Press the button above and clearly describe your emergency. Include details about the type of emergency, number of people affected, and any injuries.",
    startRecording: "Start Emergency Report",
    stopRecording: "Stop Recording",
    processing: "Processing...",
    detectingLocation: "Detecting location...",
    locationDetected: "Location detected",
    locationUnavailable: "Location unavailable",
    enableGPS: "Please enable GPS",
    accuracy: "Accuracy",
    emergencyResponseMap: "Emergency Response Map",
    yourLocation: "Your Location",
    dispatchedUnit: "Dispatched Unit",
    nearbyUnits: "Nearby Units",
    eta: "ETA",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    centerOnLocation: "Center on location",
    emergencyAnalysis: "Emergency Analysis",
    dispatchedUnitInfo: "Dispatched Unit",
    unitID: "Unit ID",
    unitType: "Type",
    distance: "Distance",
    analysisConfidence: "Analysis Confidence",
    riskFactors: "Risk Factors",
    recommendations: "Recommendations",
    requiredUnits: "Required Units",
    responseMetrics: "Response Metrics",
    estimatedCasualties: "Est. Casualties",
    manualReviewRequired: "Manual Review Required",
    dispatcherWillContact: "This emergency requires manual operator attention. A dispatcher will contact you shortly.",
    waitingForLocation: "Waiting for location data...",
    reportEmergency: "Report an emergency to see dispatch details",
    processingEmergency: "Processing your emergency report...",
    emergencySubmitted: "Emergency report submitted successfully",
    errorOccurred: "An error occurred",
    tryAgain: "Try again",
    cancel: "Cancel",
    submit: "Submit",
    close: "Close",
    loading: "Loading",
    error: "Error",
    success: "Success",
  },
  hi: {
    appTitle: "आपातकालीन प्रतिक्रिया",
    appSubtitle: "वॉयस-संचालित आपातकालीन प्रेषण",
    describeEmergency: "अपनी आपातकाल का वर्णन करें",
    recordingInstructions:
      "ऊपर दिए गए बटन को दबाएं और अपनी आपातकाल का स्पष्ट रूप से वर्णन करें। आपातकाल के प्रकार, प्रभावित लोगों की संख्या और किसी भी चोट के बारे में विवरण शामिल करें।",
    startRecording: "आपातकालीन रिपोर्ट शुरू करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    processing: "प्रसंस्करण...",
    detectingLocation: "स्थान का पता लगा रहे हैं...",
    locationDetected: "स्थान का पता चल गया",
    locationUnavailable: "स्थान उपलब्ध नहीं है",
    enableGPS: "कृपया GPS सक्षम करें",
    accuracy: "सटीकता",
    emergencyResponseMap: "आपातकालीन प्रतिक्रिया मानचित्र",
    yourLocation: "आपका स्थान",
    dispatchedUnit: "प्रेषित इकाई",
    nearbyUnits: "पास की इकाइयां",
    eta: "अनुमानित समय",
    zoomIn: "ज़ूम इन करें",
    zoomOut: "ज़ूम आउट करें",
    centerOnLocation: "स्थान पर केंद्रित करें",
    emergencyAnalysis: "आपातकालीन विश्लेषण",
    dispatchedUnitInfo: "प्रेषित इकाई",
    unitID: "इकाई ID",
    unitType: "प्रकार",
    distance: "दूरी",
    analysisConfidence: "विश्लेषण आत्मविश्वास",
    riskFactors: "जोखिम कारक",
    recommendations: "सिफारिशें",
    requiredUnits: "आवश्यक इकाइयां",
    responseMetrics: "प्रतिक्रिया मेट्रिक्स",
    estimatedCasualties: "अनुमानित हताहत",
    manualReviewRequired: "मैनुअल समीक्षा आवश्यक",
    dispatcherWillContact: "इस आपातकाल को मैनुअल ऑपरेटर ध्यान की आवश्यकता है। एक डिस्पैचर जल्द ही आपसे संपर्क करेगा।",
    waitingForLocation: "स्थान डेटा की प्रतीक्षा कर रहे हैं...",
    reportEmergency: "प्रेषण विवरण देखने के लिए एक आपातकाल की रिपोर्ट करें",
    processingEmergency: "आपकी आपातकालीन रिपोर्ट को संसाधित किया जा रहा है...",
    emergencySubmitted: "आपातकालीन रिपोर्ट सफलतापूर्वक जमा की गई",
    errorOccurred: "एक त्रुटि हुई",
    tryAgain: "फिर से कोशिश करें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    close: "बंद करें",
    loading: "लोड हो रहा है",
    error: "त्रुटि",
    success: "सफलता",
  },
  es: {
    appTitle: "Respuesta de Emergencia",
    appSubtitle: "Despacho de Emergencia Impulsado por Voz",
    describeEmergency: "Describe su emergencia en español",
    recordingInstructions:
      "Presione el botón anterior y describa claramente su emergencia. Incluya detalles sobre el tipo de emergencia, número de personas afectadas y cualquier lesión.",
    startRecording: "Iniciar Informe de Emergencia",
    stopRecording: "Detener Grabación",
    processing: "Procesando...",
    detectingLocation: "Detectando ubicación...",
    locationDetected: "Ubicación detectada",
    locationUnavailable: "Ubicación no disponible",
    enableGPS: "Por favor, habilite GPS",
    accuracy: "Precisión",
    emergencyResponseMap: "Mapa de Respuesta de Emergencia",
    yourLocation: "Su Ubicación",
    dispatchedUnit: "Unidad Despachada",
    nearbyUnits: "Unidades Cercanas",
    eta: "ETA",
    zoomIn: "Acercar",
    zoomOut: "Alejar",
    centerOnLocation: "Centrar en ubicación",
    emergencyAnalysis: "Análisis de Emergencia",
    dispatchedUnitInfo: "Unidad Despachada",
    unitID: "ID de Unidad",
    unitType: "Tipo",
    distance: "Distancia",
    analysisConfidence: "Confianza del Análisis",
    riskFactors: "Factores de Riesgo",
    recommendations: "Recomendaciones",
    requiredUnits: "Unidades Requeridas",
    responseMetrics: "Métricas de Respuesta",
    estimatedCasualties: "Bajas Estimadas",
    manualReviewRequired: "Revisión Manual Requerida",
    dispatcherWillContact:
      "Esta emergencia requiere atención del operador manual. Un despachador se comunicará con usted pronto.",
    waitingForLocation: "Esperando datos de ubicación...",
    reportEmergency: "Reportar una emergencia para ver detalles de despacho",
    processingEmergency: "Procesando su informe de emergencia...",
    emergencySubmitted: "Informe de emergencia enviado exitosamente",
    errorOccurred: "Ocurrió un error",
    tryAgain: "Intentar de nuevo",
    cancel: "Cancelar",
    submit: "Enviar",
    close: "Cerrar",
    loading: "Cargando",
    error: "Error",
    success: "Éxito",
  },
  fr: {
    appTitle: "Réponse d'Urgence",
    appSubtitle: "Dépêche d'Urgence Alimentée par la Voix",
    describeEmergency: "Décrivez votre urgence en français",
    recordingInstructions:
      "Appuyez sur le bouton ci-dessus et décrivez clairement votre urgence. Incluez des détails sur le type d'urgence, le nombre de personnes affectées et les blessures.",
    startRecording: "Démarrer le Rapport d'Urgence",
    stopRecording: "Arrêter l'Enregistrement",
    processing: "Traitement...",
    detectingLocation: "Détection de la localisation...",
    locationDetected: "Localisation détectée",
    locationUnavailable: "Localisation indisponible",
    enableGPS: "Veuillez activer le GPS",
    accuracy: "Précision",
    emergencyResponseMap: "Carte de Réponse d'Urgence",
    yourLocation: "Votre Localisation",
    dispatchedUnit: "Unité Dépêchée",
    nearbyUnits: "Unités Proches",
    eta: "ETA",
    zoomIn: "Zoomer",
    zoomOut: "Dézoomer",
    centerOnLocation: "Centrer sur la localisation",
    emergencyAnalysis: "Analyse d'Urgence",
    dispatchedUnitInfo: "Unité Dépêchée",
    unitID: "ID d'Unité",
    unitType: "Type",
    distance: "Distance",
    analysisConfidence: "Confiance de l'Analyse",
    riskFactors: "Facteurs de Risque",
    recommendations: "Recommandations",
    requiredUnits: "Unités Requises",
    responseMetrics: "Métriques de Réponse",
    estimatedCasualties: "Pertes Estimées",
    manualReviewRequired: "Examen Manuel Requis",
    dispatcherWillContact:
      "Cette urgence nécessite l'attention d'un opérateur manuel. Un dépêcheur vous contactera bientôt.",
    waitingForLocation: "En attente des données de localisation...",
    reportEmergency: "Signaler une urgence pour voir les détails de dépêche",
    processingEmergency: "Traitement de votre rapport d'urgence...",
    emergencySubmitted: "Rapport d'urgence soumis avec succès",
    errorOccurred: "Une erreur s'est produite",
    tryAgain: "Réessayer",
    cancel: "Annuler",
    submit: "Soumettre",
    close: "Fermer",
    loading: "Chargement",
    error: "Erreur",
    success: "Succès",
  },
  pt: {
    appTitle: "Resposta de Emergência",
    appSubtitle: "Despacho de Emergência Alimentado por Voz",
    describeEmergency: "Descreva sua emergência em português",
    recordingInstructions:
      "Pressione o botão acima e descreva claramente sua emergência. Inclua detalhes sobre o tipo de emergência, número de pessoas afetadas e quaisquer ferimentos.",
    startRecording: "Iniciar Relatório de Emergência",
    stopRecording: "Parar Gravação",
    processing: "Processando...",
    detectingLocation: "Detectando localização...",
    locationDetected: "Localização detectada",
    locationUnavailable: "Localização indisponível",
    enableGPS: "Por favor, ative o GPS",
    accuracy: "Precisão",
    emergencyResponseMap: "Mapa de Resposta de Emergência",
    yourLocation: "Sua Localização",
    dispatchedUnit: "Unidade Despachada",
    nearbyUnits: "Unidades Próximas",
    eta: "ETA",
    zoomIn: "Ampliar",
    zoomOut: "Reduzir",
    centerOnLocation: "Centralizar na localização",
    emergencyAnalysis: "Análise de Emergência",
    dispatchedUnitInfo: "Unidade Despachada",
    unitID: "ID da Unidade",
    unitType: "Tipo",
    distance: "Distância",
    analysisConfidence: "Confiança da Análise",
    riskFactors: "Fatores de Risco",
    recommendations: "Recomendações",
    requiredUnits: "Unidades Necessárias",
    responseMetrics: "Métricas de Resposta",
    estimatedCasualties: "Vítimas Estimadas",
    manualReviewRequired: "Revisão Manual Necessária",
    dispatcherWillContact:
      "Esta emergência requer atenção do operador manual. Um despachante entrará em contato com você em breve.",
    waitingForLocation: "Aguardando dados de localização...",
    reportEmergency: "Relatar uma emergência para ver detalhes de despacho",
    processingEmergency: "Processando seu relatório de emergência...",
    emergencySubmitted: "Relatório de emergência enviado com sucesso",
    errorOccurred: "Ocorreu um erro",
    tryAgain: "Tentar novamente",
    cancel: "Cancelar",
    submit: "Enviar",
    close: "Fechar",
    loading: "Carregando",
    error: "Erro",
    success: "Sucesso",
  },
  de: {
    appTitle: "Notfallreaktion",
    appSubtitle: "Sprachgesteuerte Notfalleinsatzleitung",
    describeEmergency: "Beschreiben Sie Ihren Notfall auf Deutsch",
    recordingInstructions:
      "Drücken Sie die obige Schaltfläche und beschreiben Sie Ihren Notfall deutlich. Geben Sie Details zur Art des Notfalls, zur Anzahl der betroffenen Personen und zu Verletzungen an.",
    startRecording: "Notfallbericht starten",
    stopRecording: "Aufnahme beenden",
    processing: "Wird verarbeitet...",
    detectingLocation: "Standort wird erkannt...",
    locationDetected: "Standort erkannt",
    locationUnavailable: "Standort nicht verfügbar",
    enableGPS: "Bitte aktivieren Sie GPS",
    accuracy: "Genauigkeit",
    emergencyResponseMap: "Notfallreaktionskarte",
    yourLocation: "Ihr Standort",
    dispatchedUnit: "Entsendete Einheit",
    nearbyUnits: "Nahegelegene Einheiten",
    eta: "ETA",
    zoomIn: "Vergrößern",
    zoomOut: "Verkleinern",
    centerOnLocation: "Auf Standort zentrieren",
    emergencyAnalysis: "Notfallanalyse",
    dispatchedUnitInfo: "Entsendete Einheit",
    unitID: "Einheits-ID",
    unitType: "Typ",
    distance: "Entfernung",
    analysisConfidence: "Analysevertrauen",
    riskFactors: "Risikofaktoren",
    recommendations: "Empfehlungen",
    requiredUnits: "Erforderliche Einheiten",
    responseMetrics: "Reaktionsmetriken",
    estimatedCasualties: "Geschätzte Opfer",
    manualReviewRequired: "Manuelle Überprüfung erforderlich",
    dispatcherWillContact:
      "Dieser Notfall erfordert manuelle Bedienereingabe. Ein Dispatcher wird sich bald mit Ihnen in Verbindung setzen.",
    waitingForLocation: "Warten auf Standortdaten...",
    reportEmergency: "Melden Sie einen Notfall, um Einsatzleiterdetails anzuzeigen",
    processingEmergency: "Ihr Notfallbericht wird verarbeitet...",
    emergencySubmitted: "Notfallbericht erfolgreich eingereicht",
    errorOccurred: "Ein Fehler ist aufgetreten",
    tryAgain: "Erneut versuchen",
    cancel: "Abbrechen",
    submit: "Absenden",
    close: "Schließen",
    loading: "Wird geladen",
    error: "Fehler",
    success: "Erfolg",
  },
  ja: {
    appTitle: "緊急対応",
    appSubtitle: "音声駆動型緊急派遣",
    describeEmergency: "日本語で緊急事態を説明してください",
    recordingInstructions:
      "上のボタンを押して、緊急事態を明確に説明してください。緊急事態の種類、影響を受けた人数、および負傷に関する詳細を含めてください。",
    startRecording: "緊急報告を開始",
    stopRecording: "録音を停止",
    processing: "処理中...",
    detectingLocation: "位置情報を検出中...",
    locationDetected: "位置情報が検出されました",
    locationUnavailable: "位置情報が利用できません",
    enableGPS: "GPSを有効にしてください",
    accuracy: "精度",
    emergencyResponseMap: "緊急対応マップ",
    yourLocation: "あなたの位置",
    dispatchedUnit: "派遣ユニット",
    nearbyUnits: "近くのユニット",
    eta: "到着予定時刻",
    zoomIn: "ズームイン",
    zoomOut: "ズームアウト",
    centerOnLocation: "位置を中心に",
    emergencyAnalysis: "緊急分析",
    dispatchedUnitInfo: "派遣ユニット",
    unitID: "ユニットID",
    unitType: "タイプ",
    distance: "距離",
    analysisConfidence: "分析信頼度",
    riskFactors: "リスク要因",
    recommendations: "推奨事項",
    requiredUnits: "必要なユニット",
    responseMetrics: "応答メトリクス",
    estimatedCasualties: "推定死傷者",
    manualReviewRequired: "手動レビューが必要",
    dispatcherWillContact:
      "この緊急事態には手動オペレーターの注意が必要です。ディスパッチャーがまもなくお客様に連絡します。",
    waitingForLocation: "位置情報データを待機中...",
    reportEmergency: "緊急事態を報告して派遣の詳細を表示",
    processingEmergency: "緊急報告を処理中...",
    emergencySubmitted: "緊急報告が正常に送信されました",
    errorOccurred: "エラーが発生しました",
    tryAgain: "もう一度試す",
    cancel: "キャンセル",
    submit: "送信",
    close: "閉じる",
    loading: "読み込み中",
    error: "エラー",
    success: "成功",
  },
  zh: {
    appTitle: "紧急响应",
    appSubtitle: "语音驱动的紧急调度",
    describeEmergency: "用中文描述您的紧急情况",
    recordingInstructions:
      "按上面的按钮，清楚地描述您的紧急情况。包括有关紧急情况类型、受影响人数和任何伤害的详细信息。",
    startRecording: "开始紧急报告",
    stopRecording: "停止录音",
    processing: "处理中...",
    detectingLocation: "正在检测位置...",
    locationDetected: "已检测到位置",
    locationUnavailable: "位置不可用",
    enableGPS: "请启用GPS",
    accuracy: "精度",
    emergencyResponseMap: "紧急响应地图",
    yourLocation: "您的位置",
    dispatchedUnit: "派遣单位",
    nearbyUnits: "附近单位",
    eta: "预计到达时间",
    zoomIn: "放大",
    zoomOut: "缩小",
    centerOnLocation: "以位置为中心",
    emergencyAnalysis: "紧急分析",
    dispatchedUnitInfo: "派遣单位",
    unitID: "单位ID",
    unitType: "类型",
    distance: "距离",
    analysisConfidence: "分析置信度",
    riskFactors: "风险因素",
    recommendations: "建议",
    requiredUnits: "所需单位",
    responseMetrics: "响应指标",
    estimatedCasualties: "估计伤亡",
    manualReviewRequired: "需要手动审查",
    dispatcherWillContact: "此紧急情况需要手动操作员注意。调度员将很快与您联系。",
    waitingForLocation: "等待位置数据...",
    reportEmergency: "报告紧急情况以查看调度详情",
    processingEmergency: "正在处理您的紧急报告...",
    emergencySubmitted: "紧急报告已成功提交",
    errorOccurred: "发生错误",
    tryAgain: "重试",
    cancel: "取消",
    submit: "提交",
    close: "关闭",
    loading: "加载中",
    error: "错误",
    success: "成功",
  },
  ar: {
    appTitle: "الاستجابة للطوارئ",
    appSubtitle: "إرسال الطوارئ المدفوع بالصوت",
    describeEmergency: "صف حالتك الطارئة باللغة العربية",
    recordingInstructions:
      "اضغط على الزر أعلاه واشرح حالتك الطارئة بوضوح. قم بتضمين تفاصيل حول نوع الطوارئ وعدد الأشخاص المتأثرين وأي إصابات.",
    startRecording: "بدء تقرير الطوارئ",
    stopRecording: "إيقاف التسجيل",
    processing: "جاري المعالجة...",
    detectingLocation: "جاري الكشف عن الموقع...",
    locationDetected: "تم الكشف عن الموقع",
    locationUnavailable: "الموقع غير متاح",
    enableGPS: "يرجى تفعيل GPS",
    accuracy: "الدقة",
    emergencyResponseMap: "خريطة الاستجابة للطوارئ",
    yourLocation: "موقعك",
    dispatchedUnit: "الوحدة المرسلة",
    nearbyUnits: "الوحدات القريبة",
    eta: "الوقت المتوقع للوصول",
    zoomIn: "تكبير",
    zoomOut: "تصغير",
    centerOnLocation: "التمركز على الموقع",
    emergencyAnalysis: "تحليل الطوارئ",
    dispatchedUnitInfo: "الوحدة المرسلة",
    unitID: "معرف الوحدة",
    unitType: "النوع",
    distance: "المسافة",
    analysisConfidence: "ثقة التحليل",
    riskFactors: "عوامل الخطر",
    recommendations: "التوصيات",
    requiredUnits: "الوحدات المطلوبة",
    responseMetrics: "مقاييس الاستجابة",
    estimatedCasualties: "الخسائر المتوقعة",
    manualReviewRequired: "مراجعة يدوية مطلوبة",
    dispatcherWillContact: "تتطلب هذه الحالة الطارئة انتباه المشغل اليدوي. سيتصل بك المرسل قريباً.",
    waitingForLocation: "في انتظار بيانات الموقع...",
    reportEmergency: "الإبلاغ عن حالة طارئة لرؤية تفاصيل الإرسال",
    processingEmergency: "جاري معالجة تقرير الطوارئ الخاص بك...",
    emergencySubmitted: "تم تقديم تقرير الطوارئ بنجاح",
    errorOccurred: "حدث خطأ",
    tryAgain: "حاول مرة أخرى",
    cancel: "إلغاء",
    submit: "إرسال",
    close: "إغلاق",
    loading: "جاري التحميل",
    error: "خطأ",
    success: "نجاح",
  },
  ru: {
    appTitle: "Реагирование на чрезвычайные ситуации",
    appSubtitle: "Голосовая система экстренной диспетчеризации",
    describeEmergency: "Опишите вашу чрезвычайную ситуацию на русском языке",
    recordingInstructions:
      "Нажмите кнопку выше и четко опишите вашу чрезвычайную ситуацию. Включите детали о типе чрезвычайной ситуации, количестве пострадавших и любых травмах.",
    startRecording: "Начать отчет о чрезвычайной ситуации",
    stopRecording: "Остановить запись",
    processing: "Обработка...",
    detectingLocation: "Определение местоположения...",
    locationDetected: "Местоположение определено",
    locationUnavailable: "Местоположение недоступно",
    enableGPS: "Пожалуйста, включите GPS",
    accuracy: "Точность",
    emergencyResponseMap: "Карта реагирования на чрезвычайные ситуации",
    yourLocation: "Ваше местоположение",
    dispatchedUnit: "Отправленная единица",
    nearbyUnits: "Ближайшие единицы",
    eta: "Время прибытия",
    zoomIn: "Увеличить",
    zoomOut: "Уменьшить",
    centerOnLocation: "Центрировать на местоположение",
    emergencyAnalysis: "Анализ чрезвычайной ситуации",
    dispatchedUnitInfo: "Отправленная единица",
    unitID: "ID единицы",
    unitType: "Тип",
    distance: "Расстояние",
    analysisConfidence: "Уверенность анализа",
    riskFactors: "Факторы риска",
    recommendations: "Рекомендации",
    requiredUnits: "Требуемые единицы",
    responseMetrics: "Метрики ответа",
    estimatedCasualties: "Предполагаемые потери",
    manualReviewRequired: "Требуется ручная проверка",
    dispatcherWillContact:
      "Эта чрезвычайная ситуация требует внимания оператора. Диспетчер свяжется с вами в ближайшее время.",
    waitingForLocation: "Ожидание данных о местоположении...",
    reportEmergency: "Сообщить о чрезвычайной ситуации для просмотра деталей диспетчеризации",
    processingEmergency: "Обработка вашего отчета о чрезвычайной ситуации...",
    emergencySubmitted: "Отчет о чрезвычайной ситуации успешно отправлен",
    errorOccurred: "Произошла ошибка",
    tryAgain: "Попробовать снова",
    cancel: "Отмена",
    submit: "Отправить",
    close: "Закрыть",
    loading: "Загрузка",
    error: "Ошибка",
    success: "Успех",
  },
}

/**
 * Get translations for a specific language
 */
export function getTranslations(language: LanguageCode): Translations {
  return TRANSLATIONS[language] || TRANSLATIONS.en
}

/**
 * Get language configuration
 */
export function getLanguageConfig(language: LanguageCode): LanguageConfig {
  return SUPPORTED_LANGUAGES[language] || SUPPORTED_LANGUAGES.en
}

/**
 * Detect browser language
 */
export function detectBrowserLanguage(): LanguageCode {
  if (typeof navigator === "undefined") return "en"

  const browserLang = navigator.language.split("-")[0]
  const supportedLangs = Object.keys(SUPPORTED_LANGUAGES) as LanguageCode[]

  if (supportedLangs.includes(browserLang as LanguageCode)) {
    return browserLang as LanguageCode
  }

  return "en"
}
