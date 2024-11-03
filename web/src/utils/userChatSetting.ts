const defaultUserChatSettingConfig = {
  chatSettingConfigured: [
    {
      modelType: 'openAI',
      apiKey: '',
      apiBase: '',
      apiModelName: '',
      apiContextLength: 8192,
      maxToken: 512,
      chunkSize: 800,
      context: 0,
      temperature: 0.5,
      top_P: 1,
      top_K: 30,
      capabilities: ['mixedSearch'],
      active: true,
    },
    {
      modelType: 'ollama',
      apiKey: 'ollama',
      apiBase: '',
      apiModelName: '',
      apiContextLength: 2048,
      maxToken: 512,
      chunkSize: 800,
      context: 0,
      temperature: 0.5,
      top_P: 1,
      top_K: 30,
      capabilities: ['mixedSearch'],
      active: false,
    },
    {
      modelType: '自定义模型配置',
      apiKey: '',
      apiBase: '',
      apiModelName: '',
      apiContextLength: 8192,
      maxToken: 512,
      chunkSize: 800,
      context: 0,
      temperature: 0.5,
      top_P: 1,
      top_K: 30,
      capabilities: ['mixedSearch'],
      active: false,
      modelName: '',
      customId: 0,
    },
  ],
};

export const getUserChatSetting = (): any => {
  const str = localStorage.getItem('UserChatSetting');
  if (str) {
    return JSON.parse(str);
  } else {
    localStorage.setItem('UserChatSetting', JSON.stringify(defaultUserChatSettingConfig));
    return getUserChatSetting();
  }
};

export const saveChatSettingConfigured = (data: any) => {
  const userChatSetting = getUserChatSetting();
  const chatSettingConfigured = userChatSetting.chatSettingConfigured;
  chatSettingConfigured.push(data);
  localStorage.setItem('UserChatSetting', JSON.stringify(userChatSetting));
};

export const activeChatSettingConfigured = (data: any) => {
  const userChatSetting = getUserChatSetting();
  const chatSettingConfigured = userChatSetting.chatSettingConfigured;
  chatSettingConfigured.forEach((x: any) => (x.active = false));
  const hasItem = chatSettingConfigured.find((x: any) => x.modelType === data.modelType);
  if (hasItem.modelType == '自定义模型配置') {
    const _newItem = { ...data };
    _newItem.modelType = _newItem.modelName;
    _newItem.active = true;
    chatSettingConfigured.push(_newItem);
  } else {
    for (const key in data) {
      hasItem[key] = data[key];
    }
  }
  localStorage.setItem('UserChatSetting', JSON.stringify(userChatSetting));
};
